"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostReadItemGridProps = exports.mostReadListGridProps = void 0;

var mostReadListGridProps = function mostReadListGridProps(columnLayout) {
  return {
    enableGelGutters: true,
    enableGelMargins: true,
    columns: {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: {
        oneColumn: 1,
        twoColumn: 6,
        multiColumn: 6
      }[columnLayout],
      group4: {
        oneColumn: 1,
        twoColumn: 8,
        multiColumn: 8
      }[columnLayout],
      group5: {
        oneColumn: 1,
        twoColumn: 8,
        multiColumn: 20
      }[columnLayout]
    }
  };
};

exports.mostReadListGridProps = mostReadListGridProps;

var mostReadItemGridProps = function mostReadItemGridProps(columnLayout) {
  return {
    item: true,
    columns: {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: {
        oneColumn: 1,
        twoColumn: 3,
        multiColumn: 3
      }[columnLayout],
      group4: {
        oneColumn: 1,
        twoColumn: 4,
        multiColumn: 4
      }[columnLayout],
      group5: {
        oneColumn: 1,
        twoColumn: 4,
        multiColumn: 4
      }[columnLayout]
    }
  };
};

exports.mostReadItemGridProps = mostReadItemGridProps;