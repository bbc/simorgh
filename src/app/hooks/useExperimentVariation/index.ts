export enum ExperimentType {
  CLIENT_SIDE = 'client side experiment',
  SERVER_SIDE = 'server side experiment',
}

type Props = {
  experimentName: string;
  overrideAttributes?: Record<string, string>;
  experimentType: ExperimentType;
};

// No experimentation platform is currently integrated, so every experiment
// resolves to its default (control) experience.
const useExperimentVariation = (_props: Props): string | null => null;

export default useExperimentVariation;
