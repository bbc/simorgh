import { Services, Variants } from '#app/models/types/global';
import { ATIData } from '#app/components/ATIAnalytics/types';

export type DownloadData = {
  fileCreated: string;
  files: DownloadDataFile[];
};

export type DownloadDataFile = {
  fileCreatedDate: string;
  fileName: string;
  fileLink: string;
  lastModified: string;
  fileSize: number;
};

export type Metadata = {
  atiAnalytics: ATIData;
  type: string;
  pageTitle: string;
};

export type PageProps = {
  service: Services;
  variant?: Variants;
  pageData: {
    title: string;
    description: string;
    downloadData?: DownloadData[];
    metadata?: Metadata;
  };
};
