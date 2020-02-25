import LearningEnglish from '#pages/LearningEnglish';
import LearningEnglishCourse from '#pages/LearningEnglish/Course';
import getInitialData from './getInitialData';
import { articlePath } from '../utils/regex';

export default {
  path: '/learningenglish',
  exact: true,
  component: LearningEnglish,
  getInitialData,
  pageType: 'learningenglish',
  routes: [
    {
      path: '/learningenglish/english',
      component: LearningEnglishCourse,
      getInitialData,
      pageType: 'learning_english_course',
    },
  ],
};

// routes: {
//   path: 'learningenglish/english/course',
//   component: LearningEnglish,
//   getInitialData,
//   pageType: 'learning_english_course',
//   routes: {
//     path: 'learningenglish/english/course/intermediate',
//     component: LearningEnglish,
//     getInitialData,
//     pageType: 'learning_english_course_section',
//   },
// },
