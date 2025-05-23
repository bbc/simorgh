import { Services, Variants } from '#app/models/types/global';
import { servicesWithVariants } from '../variantHandler';

interface BrandPath {
  service: Services;
  variant?: Variants;
}

type ServicesWithVariantsType = {
  [_key in 'serbian' | 'ukchina' | 'uzbek' | 'zhongwen']: Variants[];
};

export default (service: Services, variant?: Variants | null): BrandPath => {
  if (service === 'ws') {
    return {
      service: 'ws/languages' as Services,
    };
  }

  if (
    variant &&
    (servicesWithVariants as ServicesWithVariantsType)[
      service as keyof ServicesWithVariantsType
    ]?.includes(variant)
  ) {
    return { service, variant };
  }

  return { service };
};
