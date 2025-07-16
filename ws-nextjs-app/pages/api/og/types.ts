export type LayoutProps = {
  image: string;
  headline?: string;
  fonts?: { name: string; data: ArrayBuffer }[];
  badges?: React.ReactNode[];
};
