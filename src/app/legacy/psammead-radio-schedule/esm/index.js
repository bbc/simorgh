import _styled from '@emotion/styled/base';
var _excluded = ['dir', 'program'],
  _excluded2 = ['schedules', 'dir'],
  _excluded3 = ['id'];

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

import React from 'react';
import { GEL_GROUP_3_SCREEN_WIDTH_MIN } from '#legacy/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '#legacy/gel-foundations/spacings';
import { grid } from '#legacy/psammead-styles/detection';
import Grid from '#legacy/psammead-grid';
import {
  arrayOf,
  elementType,
  number,
  oneOf,
  shape,
  string,
  oneOfType,
} from 'prop-types';
import { scriptPropType } from '#legacy/gel-foundations/prop-types';
import ProgramCard from './ProgramCard';
import StartTime from './StartTime';

var StartTimeWrapper = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e1dgwbbg2',
      }
    : {
        target: 'e1dgwbbg2',
        label: 'StartTimeWrapper',
      },
)(
  'padding-bottom:',
  GEL_SPACING,
  ';' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJtQyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IEdFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU4gfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lORywgR0VMX1NQQUNJTkdfREJMIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuaW1wb3J0IHsgZ3JpZCB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2RldGVjdGlvbic7XG5pbXBvcnQgR3JpZCBmcm9tICdAYmJjL3BzYW1tZWFkLWdyaWQnO1xuaW1wb3J0IHtcbiAgYXJyYXlPZixcbiAgZWxlbWVudFR5cGUsXG4gIG51bWJlcixcbiAgb25lT2YsXG4gIHNoYXBlLFxuICBzdHJpbmcsXG4gIG9uZU9mVHlwZSxcbn0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuaW1wb3J0IFByb2dyYW1DYXJkIGZyb20gJy4vUHJvZ3JhbUNhcmQnO1xuaW1wb3J0IFN0YXJ0VGltZSBmcm9tICcuL1N0YXJ0VGltZSc7XG5cbmNvbnN0IFN0YXJ0VGltZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nLWJvdHRvbTogJHtHRUxfU1BBQ0lOR307XG5gO1xuXG4vLyBSZXNldCBkZWZhdWx0IG9mIDx1bD4gc3R5bGVcbmNvbnN0IFN0eWxlZEdyaWQgPSBzdHlsZWQoR3JpZClgXG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgQG1lZGlhIChtYXgtd2lkdGg6ICR7R0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5gO1xuXG4vLyBVc2luZyBmbGV4LWJveCBvbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IGdyaWQgd2lsbCBicmVhayBncmlkIGZhbGxiYWNrIGRlZmluZWQgaW4gcHNhbW1lYWQtZ3JpZFxuY29uc3QgU3R5bGVkRmxleEdyaWQgPSBzdHlsZWQoR3JpZClgXG4gIEBzdXBwb3J0cyAoJHtncmlkfSkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmctYm90dG9tOiAke0dFTF9TUEFDSU5HX0RCTH07XG5gO1xuXG5jb25zdCByZW5kZXJTY2hlZHVsZUl0ZW0gPSAoeyBkaXIsIHByb2dyYW0sIC4uLnByb3BzIH0pID0+IHtcbiAgY29uc3QgeyBzdGFydFRpbWUgfSA9IHByb2dyYW07XG4gIGNvbnN0IHsgc2VydmljZSwgc2NyaXB0LCBsb2NhbGUsIHRpbWV6b25lIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFN0YXJ0VGltZVdyYXBwZXI+XG4gICAgICAgIDxTdGFydFRpbWVcbiAgICAgICAgICB0aW1lc3RhbXA9e3N0YXJ0VGltZX1cbiAgICAgICAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgICAgICAgIHNjcmlwdD17c2NyaXB0fVxuICAgICAgICAgIGxvY2FsZT17bG9jYWxlfVxuICAgICAgICAgIHRpbWV6b25lPXt0aW1lem9uZX1cbiAgICAgICAgICBkaXI9e2Rpcn1cbiAgICAgICAgLz5cbiAgICAgIDwvU3RhcnRUaW1lV3JhcHBlcj5cbiAgICAgIDxQcm9ncmFtQ2FyZCB7Li4ucHJvcHN9IGRpcj17ZGlyfSBwcm9ncmFtPXtwcm9ncmFtfSAvPlxuICAgIDwvPlxuICApO1xufTtcblxuY29uc3Qgc2NoZWR1bGVzR3JpZFByb3BzID0ge1xuICBlbmFibGVHZWxHdXR0ZXJzOiB0cnVlLFxuICBjb2x1bW5zOiB7XG4gICAgZ3JvdXAwOiA0LFxuICAgIGdyb3VwMTogNCxcbiAgICBncm91cDI6IDYsXG4gICAgZ3JvdXAzOiA2LFxuICAgIGdyb3VwNDogOCxcbiAgICBncm91cDU6IDgsXG4gIH0sXG4gIG1hcmdpbnM6IHtcbiAgICBncm91cDA6IHRydWUsXG4gICAgZ3JvdXAxOiB0cnVlLFxuICAgIGdyb3VwMjogdHJ1ZSxcbiAgfSxcbn07XG5cbmNvbnN0IHByb2dyYW1HcmlkUHJvcHMgPSB7XG4gIGl0ZW06IHRydWUsXG4gIGNvbHVtbnM6IHtcbiAgICBncm91cDA6IDQsXG4gICAgZ3JvdXAxOiA0LFxuICAgIGdyb3VwMjogNixcbiAgICBncm91cDM6IDMsXG4gICAgZ3JvdXA0OiAyLFxuICAgIGdyb3VwNTogMixcbiAgfSxcbn07XG5cbi8qXG5DdXJyZW50bHksIHdlIGFyZSBwYXNzaW5nIGEgbGlzdCBvZiBzY2hlZHVsZXMgdG8gdGhpcyBjb21wb25lbnQgYW5kIG1hcHBpbmdcbnRocm91Z2ggdGhlIGxpc3QgdG8gcmVuZGVyIGEgc3Rhci10aW1lIGFuZCBwcm9ncmFtLWNhcmQsIGluc2lkZSBhIGdpcmQuXG5XZSBpbnRlbmQgdG8gbW92ZSB0aGUgbWFwIGZ1bmN0aW9uYWxpdHkgb3V0IG9mIHBzYW1tZWFkIGluIGEgZnV0dXJlIGl0ZXJhdGlvbi5cbiovXG5jb25zdCBSYWRpb1NjaGVkdWxlID0gKHsgc2NoZWR1bGVzLCBkaXIsIC4uLnByb3BzIH0pID0+IChcbiAgPFN0eWxlZEdyaWQgZm9yd2FyZGVkQXM9XCJ1bFwiIGRpcj17ZGlyfSB7Li4uc2NoZWR1bGVzR3JpZFByb3BzfSByb2xlPVwibGlzdFwiPlxuICAgIHtzY2hlZHVsZXMubWFwKCh7IGlkLCAuLi5wcm9ncmFtIH0pID0+IChcbiAgICAgIDxTdHlsZWRGbGV4R3JpZFxuICAgICAgICBkaXI9e2Rpcn1cbiAgICAgICAgcGFyZW50Q29sdW1ucz17c2NoZWR1bGVzR3JpZFByb3BzLmNvbHVtbnN9XG4gICAgICAgIHBhcmVudEVuYWJsZUdlbEd1dHRlcnNcbiAgICAgICAgey4uLnByb2dyYW1HcmlkUHJvcHN9XG4gICAgICAgIGtleT17aWR9XG4gICAgICAgIGFzPVwibGlcIlxuICAgICAgICBkYXRhLWUyZT17cHJvZ3JhbS5zdGF0ZX1cbiAgICAgICAgcm9sZT1cImxpc3RpdGVtXCJcbiAgICAgID5cbiAgICAgICAge3JlbmRlclNjaGVkdWxlSXRlbSh7IC4uLnByb3BzLCBkaXIsIHByb2dyYW0gfSl9XG4gICAgICA8L1N0eWxlZEZsZXhHcmlkPlxuICAgICkpfVxuICA8L1N0eWxlZEdyaWQ+XG4pO1xuXG5jb25zdCBwcm9ncmFtUHJvcFR5cGVzID0gc2hhcGUoe1xuICBzdGF0ZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHN0YXJ0VGltZTogbnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxpbms6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBicmFuZFRpdGxlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc3VtbWFyeTogc3RyaW5nLFxuICBkdXJhdGlvbjogc3RyaW5nLmlzUmVxdWlyZWQsXG59KTtcblxuY29uc3Qgc2hhcmVkUHJvcHMgPSB7XG4gIHRpbWV6b25lOiBzdHJpbmcsXG4gIGxvY2FsZTogc3RyaW5nLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgbmV4dExhYmVsOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGl2ZUxhYmVsOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgZHVyYXRpb25MYWJlbDogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRpcjogb25lT2YoWydydGwnLCAnbHRyJ10pLFxufTtcblxucmVuZGVyU2NoZWR1bGVJdGVtLnByb3BUeXBlcyA9IHtcbiAgcHJvZ3JhbTogcHJvZ3JhbVByb3BUeXBlcy5pc1JlcXVpcmVkLFxuICAuLi5zaGFyZWRQcm9wcyxcbiAgbGlua0NvbXBvbmVudDogb25lT2ZUeXBlKFtlbGVtZW50VHlwZSwgc3RyaW5nXSksXG4gIGxpbmtDb21wb25lbnRBdHRyOiBzdHJpbmcsXG59O1xuXG5yZW5kZXJTY2hlZHVsZUl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBsaW5rQ29tcG9uZW50OiAnYScsXG4gIGxpbmtDb21wb25lbnRBdHRyOiAnaHJlZicsXG59O1xuXG5SYWRpb1NjaGVkdWxlLnByb3BUeXBlcyA9IHtcbiAgc2NoZWR1bGVzOiBhcnJheU9mKHByb2dyYW1Qcm9wVHlwZXMpLmlzUmVxdWlyZWQsXG4gIC4uLnNoYXJlZFByb3BzLFxuICBsaW5rQ29tcG9uZW50OiBvbmVPZlR5cGUoW2VsZW1lbnRUeXBlLCBzdHJpbmddKSxcbiAgbGlua0NvbXBvbmVudEF0dHI6IHN0cmluZyxcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2RlZmF1bHQtcHJvcHMtbWF0Y2gtcHJvcC10eXBlcyAqL1xuUmFkaW9TY2hlZHVsZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpcjogJ2x0cicsXG4gIHRpbWV6b25lOiAnRXVyb3BlL0xvbmRvbicsXG4gIGxvY2FsZTogJ2VuLWdiJyxcbiAgbGlua0NvbXBvbmVudDogJ2EnLFxuICBsaW5rQ29tcG9uZW50QXR0cjogJ2hyZWYnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmFkaW9TY2hlZHVsZTtcbiJdfQ== */'),
); // Reset default of <ul> style

var StyledGrid = /*#__PURE__*/ _styled(
  Grid,
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e1dgwbbg1',
      }
    : {
        target: 'e1dgwbbg1',
        label: 'StyledGrid',
      },
)(
  'padding:0;margin:0;@media (max-width: ',
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  '){padding:0;}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0IrQiIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IEdFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU4gfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lORywgR0VMX1NQQUNJTkdfREJMIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuaW1wb3J0IHsgZ3JpZCB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2RldGVjdGlvbic7XG5pbXBvcnQgR3JpZCBmcm9tICdAYmJjL3BzYW1tZWFkLWdyaWQnO1xuaW1wb3J0IHtcbiAgYXJyYXlPZixcbiAgZWxlbWVudFR5cGUsXG4gIG51bWJlcixcbiAgb25lT2YsXG4gIHNoYXBlLFxuICBzdHJpbmcsXG4gIG9uZU9mVHlwZSxcbn0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuaW1wb3J0IFByb2dyYW1DYXJkIGZyb20gJy4vUHJvZ3JhbUNhcmQnO1xuaW1wb3J0IFN0YXJ0VGltZSBmcm9tICcuL1N0YXJ0VGltZSc7XG5cbmNvbnN0IFN0YXJ0VGltZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nLWJvdHRvbTogJHtHRUxfU1BBQ0lOR307XG5gO1xuXG4vLyBSZXNldCBkZWZhdWx0IG9mIDx1bD4gc3R5bGVcbmNvbnN0IFN0eWxlZEdyaWQgPSBzdHlsZWQoR3JpZClgXG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgQG1lZGlhIChtYXgtd2lkdGg6ICR7R0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5gO1xuXG4vLyBVc2luZyBmbGV4LWJveCBvbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IGdyaWQgd2lsbCBicmVhayBncmlkIGZhbGxiYWNrIGRlZmluZWQgaW4gcHNhbW1lYWQtZ3JpZFxuY29uc3QgU3R5bGVkRmxleEdyaWQgPSBzdHlsZWQoR3JpZClgXG4gIEBzdXBwb3J0cyAoJHtncmlkfSkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmctYm90dG9tOiAke0dFTF9TUEFDSU5HX0RCTH07XG5gO1xuXG5jb25zdCByZW5kZXJTY2hlZHVsZUl0ZW0gPSAoeyBkaXIsIHByb2dyYW0sIC4uLnByb3BzIH0pID0+IHtcbiAgY29uc3QgeyBzdGFydFRpbWUgfSA9IHByb2dyYW07XG4gIGNvbnN0IHsgc2VydmljZSwgc2NyaXB0LCBsb2NhbGUsIHRpbWV6b25lIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFN0YXJ0VGltZVdyYXBwZXI+XG4gICAgICAgIDxTdGFydFRpbWVcbiAgICAgICAgICB0aW1lc3RhbXA9e3N0YXJ0VGltZX1cbiAgICAgICAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgICAgICAgIHNjcmlwdD17c2NyaXB0fVxuICAgICAgICAgIGxvY2FsZT17bG9jYWxlfVxuICAgICAgICAgIHRpbWV6b25lPXt0aW1lem9uZX1cbiAgICAgICAgICBkaXI9e2Rpcn1cbiAgICAgICAgLz5cbiAgICAgIDwvU3RhcnRUaW1lV3JhcHBlcj5cbiAgICAgIDxQcm9ncmFtQ2FyZCB7Li4ucHJvcHN9IGRpcj17ZGlyfSBwcm9ncmFtPXtwcm9ncmFtfSAvPlxuICAgIDwvPlxuICApO1xufTtcblxuY29uc3Qgc2NoZWR1bGVzR3JpZFByb3BzID0ge1xuICBlbmFibGVHZWxHdXR0ZXJzOiB0cnVlLFxuICBjb2x1bW5zOiB7XG4gICAgZ3JvdXAwOiA0LFxuICAgIGdyb3VwMTogNCxcbiAgICBncm91cDI6IDYsXG4gICAgZ3JvdXAzOiA2LFxuICAgIGdyb3VwNDogOCxcbiAgICBncm91cDU6IDgsXG4gIH0sXG4gIG1hcmdpbnM6IHtcbiAgICBncm91cDA6IHRydWUsXG4gICAgZ3JvdXAxOiB0cnVlLFxuICAgIGdyb3VwMjogdHJ1ZSxcbiAgfSxcbn07XG5cbmNvbnN0IHByb2dyYW1HcmlkUHJvcHMgPSB7XG4gIGl0ZW06IHRydWUsXG4gIGNvbHVtbnM6IHtcbiAgICBncm91cDA6IDQsXG4gICAgZ3JvdXAxOiA0LFxuICAgIGdyb3VwMjogNixcbiAgICBncm91cDM6IDMsXG4gICAgZ3JvdXA0OiAyLFxuICAgIGdyb3VwNTogMixcbiAgfSxcbn07XG5cbi8qXG5DdXJyZW50bHksIHdlIGFyZSBwYXNzaW5nIGEgbGlzdCBvZiBzY2hlZHVsZXMgdG8gdGhpcyBjb21wb25lbnQgYW5kIG1hcHBpbmdcbnRocm91Z2ggdGhlIGxpc3QgdG8gcmVuZGVyIGEgc3Rhci10aW1lIGFuZCBwcm9ncmFtLWNhcmQsIGluc2lkZSBhIGdpcmQuXG5XZSBpbnRlbmQgdG8gbW92ZSB0aGUgbWFwIGZ1bmN0aW9uYWxpdHkgb3V0IG9mIHBzYW1tZWFkIGluIGEgZnV0dXJlIGl0ZXJhdGlvbi5cbiovXG5jb25zdCBSYWRpb1NjaGVkdWxlID0gKHsgc2NoZWR1bGVzLCBkaXIsIC4uLnByb3BzIH0pID0+IChcbiAgPFN0eWxlZEdyaWQgZm9yd2FyZGVkQXM9XCJ1bFwiIGRpcj17ZGlyfSB7Li4uc2NoZWR1bGVzR3JpZFByb3BzfSByb2xlPVwibGlzdFwiPlxuICAgIHtzY2hlZHVsZXMubWFwKCh7IGlkLCAuLi5wcm9ncmFtIH0pID0+IChcbiAgICAgIDxTdHlsZWRGbGV4R3JpZFxuICAgICAgICBkaXI9e2Rpcn1cbiAgICAgICAgcGFyZW50Q29sdW1ucz17c2NoZWR1bGVzR3JpZFByb3BzLmNvbHVtbnN9XG4gICAgICAgIHBhcmVudEVuYWJsZUdlbEd1dHRlcnNcbiAgICAgICAgey4uLnByb2dyYW1HcmlkUHJvcHN9XG4gICAgICAgIGtleT17aWR9XG4gICAgICAgIGFzPVwibGlcIlxuICAgICAgICBkYXRhLWUyZT17cHJvZ3JhbS5zdGF0ZX1cbiAgICAgICAgcm9sZT1cImxpc3RpdGVtXCJcbiAgICAgID5cbiAgICAgICAge3JlbmRlclNjaGVkdWxlSXRlbSh7IC4uLnByb3BzLCBkaXIsIHByb2dyYW0gfSl9XG4gICAgICA8L1N0eWxlZEZsZXhHcmlkPlxuICAgICkpfVxuICA8L1N0eWxlZEdyaWQ+XG4pO1xuXG5jb25zdCBwcm9ncmFtUHJvcFR5cGVzID0gc2hhcGUoe1xuICBzdGF0ZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHN0YXJ0VGltZTogbnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxpbms6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBicmFuZFRpdGxlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc3VtbWFyeTogc3RyaW5nLFxuICBkdXJhdGlvbjogc3RyaW5nLmlzUmVxdWlyZWQsXG59KTtcblxuY29uc3Qgc2hhcmVkUHJvcHMgPSB7XG4gIHRpbWV6b25lOiBzdHJpbmcsXG4gIGxvY2FsZTogc3RyaW5nLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgbmV4dExhYmVsOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGl2ZUxhYmVsOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgZHVyYXRpb25MYWJlbDogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRpcjogb25lT2YoWydydGwnLCAnbHRyJ10pLFxufTtcblxucmVuZGVyU2NoZWR1bGVJdGVtLnByb3BUeXBlcyA9IHtcbiAgcHJvZ3JhbTogcHJvZ3JhbVByb3BUeXBlcy5pc1JlcXVpcmVkLFxuICAuLi5zaGFyZWRQcm9wcyxcbiAgbGlua0NvbXBvbmVudDogb25lT2ZUeXBlKFtlbGVtZW50VHlwZSwgc3RyaW5nXSksXG4gIGxpbmtDb21wb25lbnRBdHRyOiBzdHJpbmcsXG59O1xuXG5yZW5kZXJTY2hlZHVsZUl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBsaW5rQ29tcG9uZW50OiAnYScsXG4gIGxpbmtDb21wb25lbnRBdHRyOiAnaHJlZicsXG59O1xuXG5SYWRpb1NjaGVkdWxlLnByb3BUeXBlcyA9IHtcbiAgc2NoZWR1bGVzOiBhcnJheU9mKHByb2dyYW1Qcm9wVHlwZXMpLmlzUmVxdWlyZWQsXG4gIC4uLnNoYXJlZFByb3BzLFxuICBsaW5rQ29tcG9uZW50OiBvbmVPZlR5cGUoW2VsZW1lbnRUeXBlLCBzdHJpbmddKSxcbiAgbGlua0NvbXBvbmVudEF0dHI6IHN0cmluZyxcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2RlZmF1bHQtcHJvcHMtbWF0Y2gtcHJvcC10eXBlcyAqL1xuUmFkaW9TY2hlZHVsZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpcjogJ2x0cicsXG4gIHRpbWV6b25lOiAnRXVyb3BlL0xvbmRvbicsXG4gIGxvY2FsZTogJ2VuLWdiJyxcbiAgbGlua0NvbXBvbmVudDogJ2EnLFxuICBsaW5rQ29tcG9uZW50QXR0cjogJ2hyZWYnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmFkaW9TY2hlZHVsZTtcbiJdfQ== */'),
); // Using flex-box on browsers that do not support grid will break grid fallback defined in psammead-grid

var StyledFlexGrid = /*#__PURE__*/ _styled(
  Grid,
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e1dgwbbg0',
      }
    : {
        target: 'e1dgwbbg0',
        label: 'StyledFlexGrid',
      },
)(
  '@supports (',
  grid,
  '){display:flex;flex-direction:column;}position:relative;padding-bottom:',
  GEL_SPACING_DBL,
  ';' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUNtQyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IEdFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU4gfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lORywgR0VMX1NQQUNJTkdfREJMIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuaW1wb3J0IHsgZ3JpZCB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2RldGVjdGlvbic7XG5pbXBvcnQgR3JpZCBmcm9tICdAYmJjL3BzYW1tZWFkLWdyaWQnO1xuaW1wb3J0IHtcbiAgYXJyYXlPZixcbiAgZWxlbWVudFR5cGUsXG4gIG51bWJlcixcbiAgb25lT2YsXG4gIHNoYXBlLFxuICBzdHJpbmcsXG4gIG9uZU9mVHlwZSxcbn0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuaW1wb3J0IFByb2dyYW1DYXJkIGZyb20gJy4vUHJvZ3JhbUNhcmQnO1xuaW1wb3J0IFN0YXJ0VGltZSBmcm9tICcuL1N0YXJ0VGltZSc7XG5cbmNvbnN0IFN0YXJ0VGltZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nLWJvdHRvbTogJHtHRUxfU1BBQ0lOR307XG5gO1xuXG4vLyBSZXNldCBkZWZhdWx0IG9mIDx1bD4gc3R5bGVcbmNvbnN0IFN0eWxlZEdyaWQgPSBzdHlsZWQoR3JpZClgXG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgQG1lZGlhIChtYXgtd2lkdGg6ICR7R0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5gO1xuXG4vLyBVc2luZyBmbGV4LWJveCBvbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IGdyaWQgd2lsbCBicmVhayBncmlkIGZhbGxiYWNrIGRlZmluZWQgaW4gcHNhbW1lYWQtZ3JpZFxuY29uc3QgU3R5bGVkRmxleEdyaWQgPSBzdHlsZWQoR3JpZClgXG4gIEBzdXBwb3J0cyAoJHtncmlkfSkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmctYm90dG9tOiAke0dFTF9TUEFDSU5HX0RCTH07XG5gO1xuXG5jb25zdCByZW5kZXJTY2hlZHVsZUl0ZW0gPSAoeyBkaXIsIHByb2dyYW0sIC4uLnByb3BzIH0pID0+IHtcbiAgY29uc3QgeyBzdGFydFRpbWUgfSA9IHByb2dyYW07XG4gIGNvbnN0IHsgc2VydmljZSwgc2NyaXB0LCBsb2NhbGUsIHRpbWV6b25lIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFN0YXJ0VGltZVdyYXBwZXI+XG4gICAgICAgIDxTdGFydFRpbWVcbiAgICAgICAgICB0aW1lc3RhbXA9e3N0YXJ0VGltZX1cbiAgICAgICAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgICAgICAgIHNjcmlwdD17c2NyaXB0fVxuICAgICAgICAgIGxvY2FsZT17bG9jYWxlfVxuICAgICAgICAgIHRpbWV6b25lPXt0aW1lem9uZX1cbiAgICAgICAgICBkaXI9e2Rpcn1cbiAgICAgICAgLz5cbiAgICAgIDwvU3RhcnRUaW1lV3JhcHBlcj5cbiAgICAgIDxQcm9ncmFtQ2FyZCB7Li4ucHJvcHN9IGRpcj17ZGlyfSBwcm9ncmFtPXtwcm9ncmFtfSAvPlxuICAgIDwvPlxuICApO1xufTtcblxuY29uc3Qgc2NoZWR1bGVzR3JpZFByb3BzID0ge1xuICBlbmFibGVHZWxHdXR0ZXJzOiB0cnVlLFxuICBjb2x1bW5zOiB7XG4gICAgZ3JvdXAwOiA0LFxuICAgIGdyb3VwMTogNCxcbiAgICBncm91cDI6IDYsXG4gICAgZ3JvdXAzOiA2LFxuICAgIGdyb3VwNDogOCxcbiAgICBncm91cDU6IDgsXG4gIH0sXG4gIG1hcmdpbnM6IHtcbiAgICBncm91cDA6IHRydWUsXG4gICAgZ3JvdXAxOiB0cnVlLFxuICAgIGdyb3VwMjogdHJ1ZSxcbiAgfSxcbn07XG5cbmNvbnN0IHByb2dyYW1HcmlkUHJvcHMgPSB7XG4gIGl0ZW06IHRydWUsXG4gIGNvbHVtbnM6IHtcbiAgICBncm91cDA6IDQsXG4gICAgZ3JvdXAxOiA0LFxuICAgIGdyb3VwMjogNixcbiAgICBncm91cDM6IDMsXG4gICAgZ3JvdXA0OiAyLFxuICAgIGdyb3VwNTogMixcbiAgfSxcbn07XG5cbi8qXG5DdXJyZW50bHksIHdlIGFyZSBwYXNzaW5nIGEgbGlzdCBvZiBzY2hlZHVsZXMgdG8gdGhpcyBjb21wb25lbnQgYW5kIG1hcHBpbmdcbnRocm91Z2ggdGhlIGxpc3QgdG8gcmVuZGVyIGEgc3Rhci10aW1lIGFuZCBwcm9ncmFtLWNhcmQsIGluc2lkZSBhIGdpcmQuXG5XZSBpbnRlbmQgdG8gbW92ZSB0aGUgbWFwIGZ1bmN0aW9uYWxpdHkgb3V0IG9mIHBzYW1tZWFkIGluIGEgZnV0dXJlIGl0ZXJhdGlvbi5cbiovXG5jb25zdCBSYWRpb1NjaGVkdWxlID0gKHsgc2NoZWR1bGVzLCBkaXIsIC4uLnByb3BzIH0pID0+IChcbiAgPFN0eWxlZEdyaWQgZm9yd2FyZGVkQXM9XCJ1bFwiIGRpcj17ZGlyfSB7Li4uc2NoZWR1bGVzR3JpZFByb3BzfSByb2xlPVwibGlzdFwiPlxuICAgIHtzY2hlZHVsZXMubWFwKCh7IGlkLCAuLi5wcm9ncmFtIH0pID0+IChcbiAgICAgIDxTdHlsZWRGbGV4R3JpZFxuICAgICAgICBkaXI9e2Rpcn1cbiAgICAgICAgcGFyZW50Q29sdW1ucz17c2NoZWR1bGVzR3JpZFByb3BzLmNvbHVtbnN9XG4gICAgICAgIHBhcmVudEVuYWJsZUdlbEd1dHRlcnNcbiAgICAgICAgey4uLnByb2dyYW1HcmlkUHJvcHN9XG4gICAgICAgIGtleT17aWR9XG4gICAgICAgIGFzPVwibGlcIlxuICAgICAgICBkYXRhLWUyZT17cHJvZ3JhbS5zdGF0ZX1cbiAgICAgICAgcm9sZT1cImxpc3RpdGVtXCJcbiAgICAgID5cbiAgICAgICAge3JlbmRlclNjaGVkdWxlSXRlbSh7IC4uLnByb3BzLCBkaXIsIHByb2dyYW0gfSl9XG4gICAgICA8L1N0eWxlZEZsZXhHcmlkPlxuICAgICkpfVxuICA8L1N0eWxlZEdyaWQ+XG4pO1xuXG5jb25zdCBwcm9ncmFtUHJvcFR5cGVzID0gc2hhcGUoe1xuICBzdGF0ZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHN0YXJ0VGltZTogbnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxpbms6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBicmFuZFRpdGxlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc3VtbWFyeTogc3RyaW5nLFxuICBkdXJhdGlvbjogc3RyaW5nLmlzUmVxdWlyZWQsXG59KTtcblxuY29uc3Qgc2hhcmVkUHJvcHMgPSB7XG4gIHRpbWV6b25lOiBzdHJpbmcsXG4gIGxvY2FsZTogc3RyaW5nLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgbmV4dExhYmVsOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGl2ZUxhYmVsOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgZHVyYXRpb25MYWJlbDogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRpcjogb25lT2YoWydydGwnLCAnbHRyJ10pLFxufTtcblxucmVuZGVyU2NoZWR1bGVJdGVtLnByb3BUeXBlcyA9IHtcbiAgcHJvZ3JhbTogcHJvZ3JhbVByb3BUeXBlcy5pc1JlcXVpcmVkLFxuICAuLi5zaGFyZWRQcm9wcyxcbiAgbGlua0NvbXBvbmVudDogb25lT2ZUeXBlKFtlbGVtZW50VHlwZSwgc3RyaW5nXSksXG4gIGxpbmtDb21wb25lbnRBdHRyOiBzdHJpbmcsXG59O1xuXG5yZW5kZXJTY2hlZHVsZUl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBsaW5rQ29tcG9uZW50OiAnYScsXG4gIGxpbmtDb21wb25lbnRBdHRyOiAnaHJlZicsXG59O1xuXG5SYWRpb1NjaGVkdWxlLnByb3BUeXBlcyA9IHtcbiAgc2NoZWR1bGVzOiBhcnJheU9mKHByb2dyYW1Qcm9wVHlwZXMpLmlzUmVxdWlyZWQsXG4gIC4uLnNoYXJlZFByb3BzLFxuICBsaW5rQ29tcG9uZW50OiBvbmVPZlR5cGUoW2VsZW1lbnRUeXBlLCBzdHJpbmddKSxcbiAgbGlua0NvbXBvbmVudEF0dHI6IHN0cmluZyxcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2RlZmF1bHQtcHJvcHMtbWF0Y2gtcHJvcC10eXBlcyAqL1xuUmFkaW9TY2hlZHVsZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpcjogJ2x0cicsXG4gIHRpbWV6b25lOiAnRXVyb3BlL0xvbmRvbicsXG4gIGxvY2FsZTogJ2VuLWdiJyxcbiAgbGlua0NvbXBvbmVudDogJ2EnLFxuICBsaW5rQ29tcG9uZW50QXR0cjogJ2hyZWYnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmFkaW9TY2hlZHVsZTtcbiJdfQ== */'),
);

var renderScheduleItem = function renderScheduleItem(_ref) {
  var dir = _ref.dir,
    program = _ref.program,
    props = _objectWithoutProperties(_ref, _excluded);

  var startTime = program.startTime;
  var service = props.service,
    script = props.script,
    locale = props.locale,
    timezone = props.timezone;
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(
      StartTimeWrapper,
      null,
      /*#__PURE__*/ React.createElement(StartTime, {
        timestamp: startTime,
        service: service,
        script: script,
        locale: locale,
        timezone: timezone,
        dir: dir,
      }),
    ),
    /*#__PURE__*/ React.createElement(
      ProgramCard,
      _extends({}, props, {
        dir: dir,
        program: program,
      }),
    ),
  );
};

var schedulesGridProps = {
  enableGelGutters: true,
  columns: {
    group0: 4,
    group1: 4,
    group2: 6,
    group3: 6,
    group4: 8,
    group5: 8,
  },
  margins: {
    group0: true,
    group1: true,
    group2: true,
  },
};
var programGridProps = {
  item: true,
  columns: {
    group0: 4,
    group1: 4,
    group2: 6,
    group3: 3,
    group4: 2,
    group5: 2,
  },
};
/*
Currently, we are passing a list of schedules to this component and mapping
through the list to render a star-time and program-card, inside a gird.
We intend to move the map functionality out of psammead in a future iteration.
*/

var RadioSchedule = function RadioSchedule(_ref2) {
  var schedules = _ref2.schedules,
    dir = _ref2.dir,
    props = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/ React.createElement(
    StyledGrid,
    _extends(
      {
        forwardedAs: 'ul',
        dir: dir,
      },
      schedulesGridProps,
      {
        role: 'list',
      },
    ),
    schedules.map(function (_ref3) {
      var id = _ref3.id,
        program = _objectWithoutProperties(_ref3, _excluded3);

      return /*#__PURE__*/ React.createElement(
        StyledFlexGrid,
        _extends(
          {
            dir: dir,
            parentColumns: schedulesGridProps.columns,
            parentEnableGelGutters: true,
          },
          programGridProps,
          {
            key: id,
            as: 'li',
            'data-e2e': program.state,
            role: 'listitem',
          },
        ),
        renderScheduleItem(
          _objectSpread(
            _objectSpread({}, props),
            {},
            {
              dir: dir,
              program: program,
            },
          ),
        ),
      );
    }),
  );
};

var programPropTypes = shape({
  state: string.isRequired,
  startTime: number.isRequired,
  link: string.isRequired,
  brandTitle: string.isRequired,
  summary: string,
  duration: string.isRequired,
});
var sharedProps = {
  timezone: string,
  locale: string,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  nextLabel: string.isRequired,
  liveLabel: string.isRequired,
  durationLabel: string.isRequired,
  dir: oneOf(['rtl', 'ltr']),
};
renderScheduleItem.propTypes = _objectSpread(
  _objectSpread(
    {
      program: programPropTypes.isRequired,
    },
    sharedProps,
  ),
  {},
  {
    linkComponent: oneOfType([elementType, string]),
    linkComponentAttr: string,
  },
);
renderScheduleItem.defaultProps = {
  linkComponent: 'a',
  linkComponentAttr: 'href',
};
RadioSchedule.propTypes = _objectSpread(
  _objectSpread(
    {
      schedules: arrayOf(programPropTypes).isRequired,
    },
    sharedProps,
  ),
  {},
  {
    linkComponent: oneOfType([elementType, string]),
    linkComponentAttr: string,
  },
);
/* eslint-disable react/default-props-match-prop-types */

RadioSchedule.defaultProps = {
  dir: 'ltr',
  timezone: 'Europe/London',
  locale: 'en-gb',
  linkComponent: 'a',
  linkComponentAttr: 'href',
};
export default RadioSchedule;
