import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

// const AmpHead = () => (
//   <Helmet>
//     <script
//       async
//       custom-element="amp-iframe"
//       src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
//     />
//     <style amp-custom>

//     </style>
//   </Helmet>
// );

// const PocketTapArea = styled.div`
//   background: linear-gradient(
//     0deg,
//     #fff 0%,
//     rgba(255, 255, 255, 0.816947) 66%,
//     rgba(255, 255, 255, 0.0718488) 100%
//   );
//   border-bottom: 2px solid #1380a1;
//   display: block;
//   margin-bottom: -1.75rem;
//   top: -3rem;
//   width: 100%;
//   z-index: 1000000;
//   align-self: end;
// `;

// STARTING POINT using before pseudo element:
// const PocketButton = styled.button`
//   background: #1380a1;
//   border: 0;
//   color: #fff;
//   display: block;
//   font-size: 1rem;
//   margin: 0 auto;
//   padding: 1rem 2rem;
//   position: relative;
//   top: 1.75rem;
//   &:before {
//     background: linear-gradient(
//       0deg,
//       #fff 0%,
//       rgba(255, 255, 255, 0.816947) 66%,
//       rgba(255, 255, 255, 0.0718488) 100%
//     );
//     border-bottom: 2px solid #1380a1;
//     display: block;
//     margin-bottom: -1.75rem;
//     position: relative;
//     top: -3rem;
//     width: 100%;
//     z-index: 1000000;
//   }
// `;

// with not showing properly background fade:
// const PocketButton = styled.button`
//   background: #1380a1;
//   border: 0;
//   color: #fff;
//   display: block;
//   font-size: 1rem;
//   left: 50%;
//   margin: 0 auto;
//   padding: 1rem 2rem;
//   position: relative;
//   transform: translateX(-50%);
//   width: 160px;
//   &:before {
//     content: '';
//     background: linear-gradient(
//       0deg,
//       #fff 0%,
//       rgba(255, 255, 255, 0.816947) 66%,
//       rgba(255, 255, 255, 0.0718488) 100%
//     );
//     border-bottom: 2px solid #1380a1;
//     display: block;
//     height: 52px;
//     left: calc(-50vw + 50%);
//     margin-bottom: -1.75rem;
//     position: relative;
//     width: 100vw;
//     z-index: -1;
//   }
// `;

// set grid on amp-iframe????, span across, absolute postioning of pseudo element or flex with width (eg300%) and height

// For setting width of pseudo element to overflow button width:
// https://stackoverflow.com/questions/5581034/is-there-are-way-to-make-a-child-divs-width-wider-than-the-parent-div-using-css
// update px values - width of button should change depending on text
// to get pseudo element behind parent, need to give pseudo el negative z-index and remove z-index from
// parent - but amp sets z-index of 2..
const PocketButton = styled.button`
  background: #1380a1;
  border: 0;
  color: #fff;
  display: block;
  font-size: 1rem;
  left: 50%;
  margin: 0 auto;
  padding-top: 1rem;
  position: relative;
  transform: translateX(-50%);
  width: 160px;
  z-index: 10000;
  &:after {
    background: linear-gradient(
      0deg,
      #fff 0%,
      rgba(255, 255, 255, 0.816947) 66%,
      rgba(255, 255, 255, 0.0718488) 100%
    );
    content: '';
    border-bottom: 2px solid #1380a1;
    display: block;
    left: calc(-50vw + 50%);
    position: relative;
    transform: translateY(-110%);
    width: 100vw;
    height: 1rem;
  }
`;

// const AmpHead = () => (
//   <Helmet>
//     <script>
//       async custom-element="amp-instagram"
//       src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
//     </script>
//     <style jsx amp-custom>

//       </style>

//   </Helmet>
// );

const VjAmp = ({ ampMetadata: { imageWidth, imageHeight, image, src } }) => {
  return (
    <IncludeGrid>
      <amp-iframe
        width={imageWidth}
        height={imageHeight}
        layout="responsive"
        sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
        resizable
        src={src}
        // style={{
        //   border: 'solid 5px red',
        //   display: 'flex',
        //   justifyContent: 'stretch',
        // }}
        // style={{ zIndex: '1' }}
      >
        <PocketButton overflow="true" type="button" aria-label="Read more">
          Show more
          {/* <span>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32px"
              height="30px"
              viewBox="0 0 32 32"
              enableBackground="new 0 0 32 32"
              xmlSpace="preserve"
              className="amp-show-more__icon"
            >
              <g id="Grid" />
              <g id="Layer_2">
                <polygon points="16,29 32,3 24.8,3 16,18.3 7.2,3 0,3" />
              </g>
            </svg>
          </span> */}
        </PocketButton>
        <amp-img layout="fill" src={image} placeholder />
      </amp-iframe>
    </IncludeGrid>
  );
};

VjAmp.propTypes = {
  ampMetadata: shape({
    imageWidth: string,
    imageHeight: string,
    image: string,
    src: string,
  }).isRequired,
};

export default VjAmp;
