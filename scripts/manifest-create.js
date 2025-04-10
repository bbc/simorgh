const fs = require('fs');
const services = [
  'afaanoromoo',
  'afrique',
  'amharic',
  'arabic',
  'azeri',
  'bengali',
  'burmese',
  'gahuza',
  'gujarati',
  'hausa',
  'hindi',
  'igbo',
  'indonesia',
  'japanese',
  'korean',
  'kyrgyz',
  'marathi',
  'mundo',
  'nepali',
  'pashto',
  'persian',
  'pidgin',
  'polska',
  'portuguese',
  'punjabi',
  'russian',
  'serbian',
  'sinhala',
  'somali',
  'swahili',
  'tamil',
  'telugu',
  'thai',
  'tigrinya',
  'turkce',
  'ukchina',
  'ukrainian',
  'urdu',
  'uzbek',
  'vietnamese',
  'yoruba',
  'zhongwen',
];

const IMAGE_VERSION = '1';
const COPY_IMAGES_ACROSS = false;
const NEW_IMAGES_FOLDER_LOCATION = '/absolute/path/to/your/new/images';

services.forEach(service => {
  const manifestPath = `../public/${service}/manifest.json`;
  const currentManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  currentManifest.start_url = `/${service}`;
  currentManifest.scope = `/${service}`;
  currentManifest.id = currentManifest.start_url;
  currentManifest.short_name = currentManifest.short_name.replace(' News', '');
  currentManifest.display = 'standalone';
  currentManifest.icons = currentManifest.icons.map(icon => {
    icon.src = `${icon.src.split('?')[0]}?v=${IMAGE_VERSION}`;
    return icon;
  });
  currentManifest.shortcuts = [
    {
      name: 'Lite Site',
      short_name: 'Lite',
      url: `${currentManifest.start_url}.lite?at_medium=PWA&at_campaign=PWA`,
      icons: currentManifest.icons.filter(({ sizes }) => sizes === '96x96'),
    },
  ];
  currentManifest.start_url = `/${service}?at_medium=PWA&at_campaign=PWA`;

  if (COPY_IMAGES_ACROSS) {
    const iconsPathStem = `../public/${service}/images/icons/`;
    const newIconsPathStem = `${NEW_IMAGES_FOLDER_LOCATION}/${service}/`;
    currentManifest.icons.forEach((icon, i) => {
      const imagename = icon.src.split('/').at(-1).split('?')[0];
      fs.renameSync(newIconsPathStem + imagename, iconsPathStem + imagename);
    });
  }
  newManifest = JSON.stringify(currentManifest, null, 2);
  fs.writeFileSync(manifestPath, newManifest);
});
