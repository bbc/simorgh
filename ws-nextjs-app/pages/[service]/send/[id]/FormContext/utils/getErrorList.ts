import { FieldData, OnChangeInputName } from '../../types';

const getErrorList = (state: Record<OnChangeInputName, FieldData>) => {
  const formEntries = Object.entries(state);

  console.log('state', state);
  const errorList = formEntries.filter((entry, index) => {
    // value => value.isValid === true
    const [key, value] = entry;
    const { isValid, messageCode } = value;
    console.log('entry', entry);
    console.log('key', key);
    console.log('value', value);
    console.log('isValid', isValid);
    return true;
  });

  const formEntriesNew = new Map(Object.entries(state));

  const listOfErrors: any = [];

  formEntriesNew.forEach((data, key) => {
    const { isValid, messageCode } = data;
    console.log('isValid', isValid);
    console.log('messageCode', messageCode);
    if (isValid === false) {
      listOfErrors.push({ key, isValid, messageCode });
    }
  });
  console.log('listOfErrors', listOfErrors);
};

export default getErrorList;
