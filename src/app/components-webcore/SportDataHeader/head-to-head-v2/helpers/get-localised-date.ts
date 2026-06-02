const getLocalisedDate = (date: string) => {
  const [, day, month, year] = date.split(' ');
  const localisedDate = new Date(`${month} ${day} ${year}`).toLocaleString();
};
