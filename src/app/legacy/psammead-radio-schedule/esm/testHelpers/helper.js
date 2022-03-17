function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/prop-types */
import { TEXT_VARIANTS } from '@bbc/psammead-storybook-helpers';
import { arabic, latin } from '@bbc/gel-foundations/scripts';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import ProgramCard from '../ProgramCard';
import RadioSchedule from '../index'; // Will remove and clean up in future PRs

export var stateTypes = ['live', 'onDemand', 'onDemand', 'next'];
export var uniqueStates = ['live', 'onDemand', 'next'];
var listenLabelTranslations = {
  live: 'Listen Live',
  next: 'Listen Next',
  onDemand: 'Listen'
};

var getSchedule = function getSchedule(service, withLongSummary) {
  var _TEXT_VARIANTS$servic = TEXT_VARIANTS[service],
      text = _TEXT_VARIANTS$servic.text,
      articlePath = _TEXT_VARIANTS$servic.articlePath,
      longText = _TEXT_VARIANTS$servic.longText,
      timezone = _TEXT_VARIANTS$servic.timezone;
  var programDurationLabel = service === 'arabic' ? 'المدة الزمنية %duration%' : 'Duration %duration%';
  return stateTypes.map(function (state, index) {
    return {
      id: index,
      state: state,
      startTime: 1566914061212,
      link: articlePath,
      brandTitle: text,
      summary: withLongSummary && state === 'live' ? "".concat(longText, " ").concat(longText) : longText,
      duration: 'PT1H',
      durationLabel: programDurationLabel,
      timezone: timezone
    };
  });
};

export var renderProgramCard = function renderProgramCard(_ref) {
  var state = _ref.state,
      _ref$service = _ref.service,
      service = _ref$service === void 0 ? 'news' : _ref$service,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 'PT30M' : _ref$duration,
      _ref$durationLabel = _ref.durationLabel,
      durationLabel = _ref$durationLabel === void 0 ? 'Duration %duration%' : _ref$durationLabel,
      _ref$startTime = _ref.startTime,
      startTime = _ref$startTime === void 0 ? 1566914061212 : _ref$startTime,
      _ref$displaySummary = _ref.displaySummary,
      displaySummary = _ref$displaySummary === void 0 ? boolean('show summary', true) : _ref$displaySummary,
      _ref$linkComponent = _ref.linkComponent,
      linkComponent = _ref$linkComponent === void 0 ? 'a' : _ref$linkComponent,
      _ref$linkComponentAtt = _ref.linkComponentAttr,
      linkComponentAttr = _ref$linkComponentAtt === void 0 ? 'href' : _ref$linkComponentAtt;
  var _TEXT_VARIANTS$servic2 = TEXT_VARIANTS[service],
      text = _TEXT_VARIANTS$servic2.text,
      articlePath = _TEXT_VARIANTS$servic2.articlePath,
      longText = _TEXT_VARIANTS$servic2.longText,
      dir = _TEXT_VARIANTS$servic2.dir,
      locale = _TEXT_VARIANTS$servic2.locale,
      timezone = _TEXT_VARIANTS$servic2.timezone;
  var props = {
    service: service,
    script: dir === 'rtl' ? arabic : latin,
    durationLabel: dir === 'rtl' ? 'المدة الزمنية %duration%' : durationLabel,
    nextLabel: dir === 'rtl' ? 'مباشر' : 'NEXT',
    liveLabel: dir === 'rtl' ? 'مباشر' : 'LIVE',
    listenLabelTranslations: listenLabelTranslations,
    timezone: timezone,
    locale: locale,
    linkComponent: linkComponent,
    linkComponentAttr: linkComponentAttr
  };
  var program = {
    state: state,
    link: articlePath,
    startTime: startTime,
    brandTitle: text,
    summary: displaySummary ? longText : null,
    duration: duration
  };
  return /*#__PURE__*/React.createElement(ProgramCard, _extends({
    dir: dir,
    program: program
  }, props));
};
export var renderRadioSchedule = function renderRadioSchedule(_ref2) {
  var _ref2$service = _ref2.service,
      service = _ref2$service === void 0 ? 'news' : _ref2$service,
      _ref2$locale = _ref2.locale,
      locale = _ref2$locale === void 0 ? 'en-gb' : _ref2$locale,
      _ref2$timezone = _ref2.timezone,
      timezone = _ref2$timezone === void 0 ? 'Europe/London' : _ref2$timezone,
      _ref2$script = _ref2.script,
      script = _ref2$script === void 0 ? latin : _ref2$script,
      _ref2$dir = _ref2.dir,
      dir = _ref2$dir === void 0 ? 'ltr' : _ref2$dir,
      _ref2$withLongSummary = _ref2.withLongSummary,
      withLongSummary = _ref2$withLongSummary === void 0 ? false : _ref2$withLongSummary,
      _ref2$selectedService = _ref2.selectedService,
      selectedService = _ref2$selectedService === void 0 ? 'news' : _ref2$selectedService,
      _ref2$linkComponent = _ref2.linkComponent,
      linkComponent = _ref2$linkComponent === void 0 ? 'a' : _ref2$linkComponent,
      _ref2$linkComponentAt = _ref2.linkComponentAttr,
      linkComponentAttr = _ref2$linkComponentAt === void 0 ? 'href' : _ref2$linkComponentAt;
  var nextLabel = dir === 'rtl' ? 'مباشر' : 'NEXT';
  var liveLabel = dir === 'rtl' ? 'مباشر' : 'LIVE';
  var durationLabel = dir === 'rtl' ? 'المدة الزمنية %duration%' : 'Duration %duration%';
  return /*#__PURE__*/React.createElement(RadioSchedule, {
    schedules: getSchedule(selectedService, withLongSummary),
    locale: locale,
    timezone: timezone,
    script: script,
    service: service,
    nextLabel: nextLabel,
    liveLabel: liveLabel,
    listenLabelTranslations: listenLabelTranslations,
    durationLabel: durationLabel,
    dir: dir,
    linkComponent: linkComponent,
    linkComponentAttr: linkComponentAttr
  });
};