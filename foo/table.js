const table = services => {
  const capitalizeFirstLetter = string =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const generateLinks = (service, env) => {
    const output = [];

    Object.keys(services[service]).forEach(pageType => {
      Object.keys(services[service][pageType]).forEach(enviroment => {
        if (enviroment === env) {
          output.push(
            `[${pageType}](${services[service][pageType][enviroment]})`,
          );
        }
      });
    });

    return output.join(' - ');
  };

  console.log(`| Service | Local | Test | Stage | Live |`);
  console.log(`|---------|-------|------|-------|------|`);

  Object.keys(services).forEach(service => {
    const items = [
      capitalizeFirstLetter(service),
      generateLinks(service, 'local'),
      generateLinks(service, 'test'),
      generateLinks(service, 'stage'),
      generateLinks(service, 'live'),
    ];

    console.log(`| ${items.join(' | ')} |`);
  });
};

module.exports = table;
