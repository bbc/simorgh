import { execFileSync } from 'node:child_process';
import { access, chmod, mkdtemp, rm } from 'node:fs/promises';
import { constants } from 'node:fs';
import { tmpdir, userInfo } from 'node:os';
import { join } from 'node:path';
import { password } from '@inquirer/prompts';

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const certificatePath = args[0];

  if (args.length !== 1 || !certificatePath) {
    throw new Error('Usage: yarn dev-cert /path/to/certificate.p12');
  }

  await access(certificatePath, constants.R_OK);

  const certificatePassword = await password({
    message: 'Certificate import password:',
    mask: '*',
  });

  if (/[\r\n]/.test(certificatePassword)) {
    throw new Error(
      'Certificate passwords containing newlines are not supported.',
    );
  }

  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'dev-cert-'));
  const certificateOutput = join(temporaryDirectory, 'client.crt');
  const keyOutput = join(temporaryDirectory, 'client.key');

  try {
    await Promise.all(
      [
        { output: certificateOutput, flags: ['-clcerts', '-nokeys'] },
        { output: keyOutput, flags: ['-nocerts', '-nodes'] },
      ].map(async ({ output, flags }) => {
        execFileSync(
          'openssl',
          [
            'pkcs12',
            '-in',
            certificatePath,
            '-out',
            output,
            '-passin',
            'stdin',
            ...flags,
          ],
          {
            input: `${certificatePassword}\n`,
            stdio: ['pipe', 'inherit', 'inherit'],
          },
        );

        await chmod(output, 0o600);
      }),
    );

    const { uid, gid } = userInfo();

    execFileSync(
      'sudo',
      ['install', '-d', '/etc/pki/tls/certs', '/etc/pki/tls/private'],
      { stdio: 'inherit' },
    );

    [
      [certificateOutput, '/etc/pki/tls/certs/client.crt'],
      [keyOutput, '/etc/pki/tls/private/client.key'],
    ].forEach(([source, destination]) => {
      execFileSync(
        'sudo',
        [
          'install',
          '-m',
          '600',
          '-o',
          String(uid),
          '-g',
          String(gid),
          source,
          destination,
        ],
        { stdio: 'inherit' },
      );
    });

    console.log('Developer certificate installed. Restart processes using it.');
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
