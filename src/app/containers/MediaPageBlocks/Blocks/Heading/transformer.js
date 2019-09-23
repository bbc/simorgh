// Determine what headline to show, given a "headlines" block
export default block => block.headline.replace(/<[^>]*>/g, '');
