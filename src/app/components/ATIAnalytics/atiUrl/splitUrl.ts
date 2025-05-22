export default (url: string): string[] =>
  url.replace(/&/g, ',').replace(/\?/g, ',').split(',');
