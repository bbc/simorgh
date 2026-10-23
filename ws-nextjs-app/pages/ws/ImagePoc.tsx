import ImagePocComparison from './ImagePocComparison';

const ImagePoc = () => (
  <main
    style={{
      backgroundColor: '#f6f6f6',
      color: '#141414',
      fontFamily: 'ReithSans, Helvetica, Arial, freesans, sans-serif',
      minHeight: '60vh',
      padding: '32px 16px 48px',
    }}
  >
    <div style={{ margin: '0 auto', maxWidth: 1200 }}>
      <header
        style={{
          borderBottom: '1px solid #d8d8d8',
          marginBottom: 32,
          paddingBottom: 24,
        }}
      >
        <p
          style={{
            color: '#4a4a4a',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            margin: '0 0 12px',
            textTransform: 'uppercase',
          }}
        >
          Image platform / technical spike
        </p>
        <h1
          style={{
            borderInlineStart: '4px solid #b80000',
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.05,
            margin: 0,
            paddingInlineStart: 16,
          }}
        >
          Next.js Image suitability
        </h1>
        <p
          style={{
            color: '#4a4a4a',
            fontSize: 18,
            lineHeight: 1.45,
            margin: '16px 0 0',
            maxWidth: 680,
          }}
        >
          A focused comparison of responsive image delivery, iChef URL templates
          and format fallbacks. This is an isolated proof of concept, not a
          production migration.
        </p>
      </header>

      <ImagePocComparison />
    </div>
  </main>
);

export default ImagePoc;
