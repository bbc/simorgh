// biome-ignore-all lint/security/noDangerouslySetInnerHtml: this is fine
const AmpComscoreAnalytics = () => (
  <amp-analytics type="comscore">
    <script
      type="application/json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          vars: {
            c2: '17986528',
          },
          extraUrlParams: {
            comscorekw: 'amp',
          },
        }),
      }}
    />
  </amp-analytics>
);

export default AmpComscoreAnalytics;
