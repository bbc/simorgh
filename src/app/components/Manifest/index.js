import serviceConfig from '../../lib/config/services';

const Manifest = (service = 'news') => {
  const config = serviceConfig[service];

  const template = {
    name: config.brandName,
    short_name: config.brandName,
    Scope: `/${service}/`,
    background_color: config.site_colour,
    display: 'standalone',
    start_url: config.start_url,
    theme_color: config.site_colour,
    icons: [],
    splash_pages: null,
  };

  Object.keys(config.icons).forEach(size => {
    template.icons.push({
      src: config.icons[size],
      sizes: size,
      type: 'image/png',
    });
  });

  return template;
};

export default Manifest;
