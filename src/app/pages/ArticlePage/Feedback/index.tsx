/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import { RequestContext } from '#app/contexts/RequestContext';
import React, { use, useState } from 'react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './index.styles';

const Like = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M17.1 31h.9c5.8 0 10.4-1.4 10.4-5.3 0-1.3-.6-2.4-2-2.5l.4.5c1.5-.5 2.3-1.6 2.3-3.1s-.8-2.7-2-3v.8c1.1-.2 2-1.5 2-3.3s-.9-3.6-3.9-3.6h-4.9c.5-1.8.7-3.4.7-5.2 0-1.5-.2-3.2-.6-5.5h-5.2C12.7 8 10.8 11.3 7.4 14.6H2.8V29h4.7c2.7 1.2 5.7 2 9.6 2m0-2.5c-3.1 0-5.8-.7-8.2-1.9v-9.8C12.8 13 14.7 9.9 17 3.5h1.3c.2.8.2 1.9.2 2.9 0 2-.5 3.7-1.9 7.5h8c1.4 0 2 .6 2 1.7s-.7 1.6-2.3 1.6l-.3 2.1c2 0 2.5.6 2.5 1.6s-.7 1.7-2.3 1.7l-.2 2.1c1.5 0 1.8.6 1.8 1.3 0 1.8-2.7 2.5-8 2.5z" />
  </svg>
);

const Dislike = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M14.9 1H14C8.3 1 3.7 2.3 3.7 6.2c0 1.3.6 2.4 2 2.5l-.5-.5c-1.5.5-2.3 1.6-2.3 3.1s.8 2.7 2 3v-.8c-1.1.2-2 1.5-2 3.3s.9 3.6 3.9 3.6h4.9c-.5 1.8-.7 3.4-.7 5.2 0 1.5.2 3.2.6 5.5h5.2c2.6-7.1 4.5-10.3 7.9-13.6h4.6V3h-4.7c-2.8-1.2-5.8-2-9.7-2m0 2.5c3.1 0 5.8.7 8.2 1.9v9.8C19.2 19 17.3 22 15 28.5h-1.3c-.2-.8-.2-1.9-.2-2.9 0-2 .5-3.7 1.9-7.5h-8c-1.4 0-2-.6-2-1.7s.7-1.6 2.3-1.6l.3-2.1c-2 0-2.5-.6-2.5-1.6s.7-1.7 2.3-1.7L8 7.3c-1.5 0-1.8-.6-1.8-1.3 0-1.8 2.7-2.5 8-2.5z" />
  </svg>
);

const Feedback = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { id } = use(RequestContext);

  return (
    <section css={styles.feedbackWrapper}>
      {!formOpen && (
        <>
          <div>
            <Heading level={2} size="pica">
              Tell us what you think
            </Heading>
          </div>
          <div css={styles.feedbackButtons}>
            <a
              title="Like"
              css={styles.feedbackButton}
              href={`http://localhost:7081/mundo/send/u50853489?reaction=like&assetId=${id}`}
            >
              <Like />
              <VisuallyHiddenText>Like</VisuallyHiddenText>
            </a>
            <button
              title="Dislike"
              onClick={() => setFormOpen(!formOpen)}
              css={styles.feedbackButton}
              type="button"
            >
              <Dislike />
              <VisuallyHiddenText>Dislike</VisuallyHiddenText>
            </button>
          </div>
        </>
      )}
      {formOpen && (
        <div css={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Text as="p" fontVariant="sansBold" css={{ display: 'block' }}>
            Please tell us what we can do better.
          </Text>
          <iframe src="/mundo/send/u50853489.app" css={styles.iframe} />
          {/* <div>
            <form css={{ display: 'block', flexDirection: 'column' }}>
              <textarea css={{ display: 'block', width: '100%' }} />
              <button type="submit" css={{ margin: '12px 0' }}>
                Submit
              </button>
            </form>
          </div> */}
        </div>
      )}
    </section>
  );
};

export default Feedback;
