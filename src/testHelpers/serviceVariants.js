import services from '#utilities/serviceConfigs';

const getContextVariant = ({ service, configVariant }) =>
  service === 'ukrainian' && configVariant === 'ru-UA'
    ? 'default'
    : configVariant;

const getPageLang = ({ service, configVariant }) =>
  service === 'ukrainian' && configVariant === 'ru-UA' ? 'ru' : undefined;

const serviceVariants = Object.entries(services).flatMap(
  ([service, serviceConfigs]) =>
    Object.keys(serviceConfigs)
      .filter(
        configVariant => !(service === 'uzbek' && configVariant === 'default'),
      )
      .map(configVariant => ({
        service,
        variant: getContextVariant({ service, configVariant }),
        pageLang: getPageLang({ service, configVariant }),
        configVariant,
        label:
          configVariant === 'default'
            ? service
            : `${service} (${configVariant})`,
      })),
);

export default serviceVariants;
