import PortraitVideoCarousel from '#app/components/PortraitVideoCarousel';
import styles from './styles';

const testingPageLayout = ({ pageData }: any) => {
  return (
    <main>
      <PortraitVideoCarousel
        title="My Portrait Video Carousel"
        blocks={pageData.data.blocks}
        eventTrackingData={{
          componentName: 'testing-page-portrait-video-carousel',
        }}
        css={styles.pvCarousel}
      />
    </main>
  );
};

export default testingPageLayout;
