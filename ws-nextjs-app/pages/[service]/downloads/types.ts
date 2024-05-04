import { Services, Variants } from '#app/models/types/global';

export type PageProps = {
  service: Services;
  variant?: Variants;
  pageData: {
    title: string;
    description: string;
    sections: Section[];
  };
};
