import path from 'ramda/src/path';

const getPageId = path(['pageData', 'metadata', 'id']);

export default (prevProps, nextProps) => {
    console.log('memo eval', prevProps.pageData.metadata.id, nextProps.pageData.metadata.id);
    return getPageId(prevProps) === getPageId(nextProps);
}
  
