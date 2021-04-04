export const formatDateEUA = (date) => {
  if (typeof date !== 'string') return undefined;

  let splittedDate;

  if (date.includes('-')) splittedDate = date.split('-');
  else if (date.includes('/')) splittedDate = date.split('/');
  else return undefined;

  const stringDate = `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;

  return stringDate;
};
