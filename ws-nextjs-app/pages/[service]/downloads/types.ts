import { Services, Variants } from '#app/models/types/global';

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

export type PageProps = {
  service: Services;
  variant?: Variants;
  pageData: {
    title: string;
    description: string;
    downloadData?: DownloadData[];
  };
};