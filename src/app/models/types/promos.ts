export interface MessageBanner {
  summaries: {
    imageUrl?: string;
    link: string;
    imageAlt?: string;
    description?: string;
    title: string;
    id: string;
  }[];
  title: string;
  position: number;
}
