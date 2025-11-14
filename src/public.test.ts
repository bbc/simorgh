import fs from 'fs';
import SERVICES from '#app/lib/config/services';
import path, { resolve } from 'path';
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

const iconNames = [
  'icon-72x72.png',
  'icon-96x96.png',
  'icon-128x128.png',
  'icon-144x144.png',
  'icon-152x152.png',
  'icon-180x180.png',
  'icon-192x192.png',
  'icon-384x384.png',
  'icon-512x512.png',
];

const maskableIconNames = [
  'maskable-icon-192x192.png',
  'maskable-icon-384x384.png',
  'maskable-icon-512x512.png',
];

const servicesWithMaskableIcons = ['magyarul', 'romania'];

describe('public directory', () => {
  describe.each(SERVICES.filter(service => !['ws'].includes(service)))(
    'public/%s',
    service => {
      it(`should exist`, async () => {
        const fileList = await listFiles({ service });

        expect(fileList).not.toBeNull();
        expect(fileList.length).toBeGreaterThan(0);
      });

      describe('manifest.json', () => {
        if (!PUBLIC_SERVICES.includes(service)) {
          it(`should exist`, async () => {
            const fileList = await listFiles({ service });

            expect(fileList).toContain('manifest.json');
          });

          it(`should contain correct icons`, async () => {
            const { default: manifest } = await import(
              path.resolve(`./public/${service}/manifest.json`)
            );

            const { icons } = manifest;

            const iconSrc = icons.map(({ src }) => src);

            const expectedIconNames = servicesWithMaskableIcons.includes(
              service,
            )
              ? [...iconNames, ...maskableIconNames]
              : iconNames;

            expect(iconSrc).toHaveLength(expectedIconNames.length);

            const version = ['magyarul'].includes(service) ? 2 : 1;

            const expectedIconSrc = expectedIconNames.map(
              iconName =>
                `https://static.files.bbci.co.uk/ws/simorgh-assets/public/${service}/images/icons/${iconName}?v=${version}`,
            );

            expect(iconSrc).toStrictEqual(
              expect.arrayContaining(expectedIconSrc),
            );
          });
        }
      });

      it(`public/${service}/images should exist`, async () => {
        const fileList = await listFiles({ service });

        expect(fileList).toContain('images');
      });

      describe(`public/${service}/images/icons`, () => {
        it(`should exist`, async () => {
          const fileList = await listFiles({
            service,
            suffix: '/images/icons',
          });

          expect(fileList).not.toBeNull();
          expect(fileList.length).toBeGreaterThan(0);
        });

        it.each(iconNames)(`should contain %s`, async () => {
          const fileList = await listFiles({
            service,
            suffix: '/images/icons',
          });

          expect(fileList).toStrictEqual(
            expect.arrayContaining(iconNames.map(iconName => iconName)),
          );
        });
      });

      describe(`public/${service}/images/syndication`, () => {
        if (![...PUBLIC_SERVICES, 'ukchina'].includes(service)) {
          it('should exist', async () => {
            const fileList = await listFiles({
              service,
              suffix: '/images/syndication',
            });

            expect(fileList).not.toBeNull();
            expect(fileList.length).toBeGreaterThan(0);
          });

          it('should contain brand-40xn.png', async () => {
            const fileList = await listFiles({
              service,
              suffix: '/images/syndication',
            });

            expect(fileList).toStrictEqual(['brand-40xn.png']);
          });
        }
      });
    },
  );
});
