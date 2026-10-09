const hasCookie = (headers: string, name: string) =>
  headers
    .split(';')
    .map(cookie => cookie.trim())
    .some(cookie => cookie.startsWith(`${name}=`));

export default hasCookie;
