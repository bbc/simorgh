const checkExternalIdOverrides = externalId =>
  externalId === 'bbc_oromo_radio' ? `bbc_afaanoromoo_radio` : externalId;

export default checkExternalIdOverrides;
