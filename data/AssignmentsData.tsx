import NavigationConstants from '../constants/NavigationConstants';

export type assignmentData = {
  title: string;
  destination: string;
};

const AssignmentData: Array<assignmentData> = [
  {
    title: 'Calculator',
    destination: NavigationConstants.CACULATOR,
  },
  {
    title: 'Twitter Text Field',
    destination: NavigationConstants.TWITTER_TEXT_FIELD,
  },
  {
    title: 'Multiple Calls',
    destination: NavigationConstants.MULTIPLE_CALLS,
  },
  {
    title: 'Swipable flatlist',
    destination: NavigationConstants.FLATLIST,
  },
  {
    title: 'Products with Cart',
    destination: NavigationConstants.PRODUCTS,
  },
];

export default AssignmentData;
