import _styled from "@emotion/styled/base";
import React from 'react';
import { string } from 'prop-types';

var Wrapper = _styled("div", process.env.NODE_ENV === "production" ? {
  target: "eoc8x1d0"
} : {
  target: "eoc8x1d0",
  label: "Wrapper"
})("display:inline-block;width:", function (props) {
  return props.size;
}, ";height:", function (props) {
  return props.size;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZWRpYUluZGljYXRvci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSTBCIiwiZmlsZSI6Ii4uL3NyYy9NZWRpYUluZGljYXRvci5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgc3RyaW5nIH0gZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiAke3Byb3BzID0+IHByb3BzLnNpemV9O1xuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMuc2l6ZX07XG5gO1xuXG5jb25zdCBNZWRpYUluZGljYXRvciA9ICh7IHNpemUgfSkgPT4gKFxuICA8V3JhcHBlclxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgc2l6ZT17c2l6ZX1cbiAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xuICAgICAgX19odG1sOiBgXG4gICAgICA8c3ZnIGNsYXNzPVwicm91bmRlZC1wbGF5LWJ1dHRvblwiIGZvY3VzYWJsZT1cImZhbHNlXCIgd2lkdGg9JHtzaXplfSB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0MCA0MFwiPlxuICAgICAgICA8cGF0aCBjbGFzcz1cInJvdW5kZWQtcGxheS1idXR0b25fX2lubmVyXCIgZmlsbD1cInRyYW5zcGFyZW50XCIgZD1cIk0yMCwwQzguOTcxLDAsMCw4Ljk3MiwwLDIwYzAsMTEuMDI4LDguOTcyLDIwLDIwLDIwYzExLjAyOSwwLDIwLjAwMi04Ljk3MiwyMC4wMDItMjBDNDAuMDAyLDguOTcyLDMxLjAyOCwwLDIwLDB6XG4gICAgICAgIE0xNS43OTksMjYuOTM5VjEzLjA3OGwxMS4yNjQsNi45M0wxNS43OTksMjYuOTM5elwiLz5cbiAgICAgICAgPHBhdGggY2xhc3M9XCJyb3VuZGVkLXBsYXktYnV0dG9uX19yaW5nXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjAsNDBDOC45NzEsNDAsMCwzMS4wMjgsMCwyMEMwLDguOTcyLDguOTcxLDAsMjAsMGMxMS4wMjksMCwyMC4wMDIsOC45NzIsMjAuMDAyLDIwQzQwLjAwMiwzMS4wMjgsMzEuMDI4LDQwLDIwLDQwelxuICAgICAgICBNMjAsMS43NjVDOS45NDUsMS43NjUsMS43NjQsOS45NDUsMS43NjQsMjBTOS45NDUsMzguMjM0LDIwLDM4LjIzNGMxMC4wNTYsMCwxOC4yMzctOC4xOCwxOC4yMzctMTguMjM0UzMwLjA1NiwxLjc2NSwyMCwxLjc2NXpcIi8+XG4gICAgICAgIDxwb2x5Z29uIGNsYXNzPVwicm91bmRlZC1wbGF5LWJ1dHRvbl9fdHJpYW5nbGVcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgcG9pbnRzPVwiMTUuNzk5LDI2LjkzOSAyNy4wNjIsMjAuMDA4IDE1Ljc5OSwxMy4wNzggXCIvPlxuICAgICAgPC9zdmc+XG4gICAgICBgLFxuICAgIH19XG4gIC8+XG4pO1xuXG5NZWRpYUluZGljYXRvci5wcm9wVHlwZXMgPSB7XG4gIHNpemU6IHN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFJbmRpY2F0b3I7XG4iXX0= */"));

var MediaIndicator = function MediaIndicator(_ref) {
  var size = _ref.size;
  return /*#__PURE__*/React.createElement(Wrapper, {
    "aria-hidden": "true",
    size: size,
    dangerouslySetInnerHTML: {
      __html: "\n      <svg class=\"rounded-play-button\" focusable=\"false\" width=".concat(size, " xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 40 40\">\n        <path class=\"rounded-play-button__inner\" fill=\"transparent\" d=\"M20,0C8.971,0,0,8.972,0,20c0,11.028,8.972,20,20,20c11.029,0,20.002-8.972,20.002-20C40.002,8.972,31.028,0,20,0z\n        M15.799,26.939V13.078l11.264,6.93L15.799,26.939z\"/>\n        <path class=\"rounded-play-button__ring\" fill=\"currentColor\" d=\"M20,40C8.971,40,0,31.028,0,20C0,8.972,8.971,0,20,0c11.029,0,20.002,8.972,20.002,20C40.002,31.028,31.028,40,20,40z\n        M20,1.765C9.945,1.765,1.764,9.945,1.764,20S9.945,38.234,20,38.234c10.056,0,18.237-8.18,18.237-18.234S30.056,1.765,20,1.765z\"/>\n        <polygon class=\"rounded-play-button__triangle\" fill=\"currentColor\" points=\"15.799,26.939 27.062,20.008 15.799,13.078 \"/>\n      </svg>\n      ")
    }
  });
};

MediaIndicator.propTypes = {
  size: string.isRequired
};
export default MediaIndicator;