import fs from 'fs';
import { services } from '#app/lib/config/services/loadableConfig';
import { resolve } from 'path';
import { promisify } from 'util';
import { Services } from '#app/models/types/global';

const readdir = promisify(fs.readdir);

const listFiles = async ({
  service,
  suffix = '/',
}: {
  service: Services;
  suffix?: string;
}) => readdir(resolve(`./public/${service}${suffix}`));

const PUBLIC_SERVICES = [
  'archive',
  'cymrufyw',
  'news',
  'newsround',
  'naidheachdan',
  'scotland',
  'sport',
];

describe('public directory', () => {
  describe.each(services.filter(service => !['ws'].includes(service)))(
    'public/%s',
    service => {
      it(`should exist`, async () => {
        const fileList = await listFiles({ service });

        expect(fileList).not.toBeNull();
        expect(fileList.length).toBeGreaterThan(0);
      });

      it(`should contain a manifest file`, async () => {
        if (!PUBLIC_SERVICES.includes(service)) {
          const fileList = await listFiles({ service });

          expect(fileList).toContain('manifest.json');
        }
      });

      it(`public/${service}/images should exist`, async () => {
        const fileList = await listFiles({ service });

        expect(fileList).toContain('images');
      });

      it(`public/${service}/images/icons should exist`, async () => {
        const fileList = await listFiles({ service, suffix: '/images/icons' });

        expect(fileList).not.toBeNull();
        expect(fileList.length).toBeGreaterThan(0);
      });

      it(`public/${service}/images/syndication should exist`, async () => {
        if (![...PUBLIC_SERVICES, 'ukchina'].includes(service)) {
          const fileList = await listFiles({
            service,
            suffix: '/images/syndication',
          });

          expect(fileList).not.toBeNull();
          expect(fileList.length).toBeGreaterThan(0);
        }
      });
    },
  );
});
