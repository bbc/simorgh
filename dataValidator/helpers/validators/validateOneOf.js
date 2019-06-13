const { throwError } = require('../../utilities/messaging');
const { getRefNameList } = require('../interpretSchema/getRefNameList');

module.exports.validateOneOf = (
  referencedItems,
  dataNode,
  parentSchemaName,
) => {
  const oneOfArray = getRefNameList(referencedItems);
  if (!oneOfArray.includes(dataNode.type)) {
    // prettier-ignore
    throwError(
      `Error: the data contained ${dataNode.type} which is not a valid child of ${parentSchemaName}`,
    );
  }
};
