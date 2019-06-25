let scenariosCount = 0;

const countScenarios = () => {
  scenariosCount += 1;
};

const getScenariosCount = () => scenariosCount;

module.exports = { countScenarios, getScenariosCount };
