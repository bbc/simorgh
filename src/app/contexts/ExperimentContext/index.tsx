import useOperaMiniDetection from '#app/hooks/useOperaMiniDetection';
import { Services } from '#app/models/types/global';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ServiceContext } from '../ServiceContext';

enum Stages {
  STAGE_1 = 'stage_1',
  STAGE_2 = 'stage_2',
  STAGE_3 = 'stage_3',
  DEFAULT = 'default',
}

type ExperimentCriteria = Partial<{
  service: Services;
  jsEnabled: boolean;
  isOperaMini: boolean;
  dataSaver: boolean;
  lowPower: boolean;
}>;

const determineStage = ({
  service,
  jsEnabled = true,
  isOperaMini,
  dataSaver,
  lowPower,
}: ExperimentCriteria) => {
  if (
    service !== 'mundo' &&
    !lowPower &&
    !dataSaver &&
    jsEnabled &&
    !isOperaMini
  ) {
    return Stages.STAGE_3;
  }

  if (
    jsEnabled &&
    (service === 'mundo' || dataSaver || isOperaMini || lowPower)
  ) {
    return Stages.STAGE_2;
  }

  if (!jsEnabled) {
    return Stages.STAGE_1;
  }

  return Stages.DEFAULT;
};
const ExperimentContext = createContext(Stages.DEFAULT);

const WithExperimentContext = ({ children }: PropsWithChildren) => {
  const [lowPower, setLowPower] = useState(false);
  const [dataSaver, setSaveDataMode] = useState(false);
  const isOperaMini = useOperaMiniDetection();
  const { service } = useContext(ServiceContext);

  useEffect(() => {
    const initialiseDeviceStates = async () => {
      const nav = navigator as any;
      const saveDataMode = nav.connection.saveData;

      if (nav.getBattery) {
        const manager = await nav.getBattery();
        const { level } = manager;
        console.log('CHECK', manager);
        console.log('CHECK LEVEL', level);
      }

      setSaveDataMode(saveDataMode);
    };

    initialiseDeviceStates();
  }, []);

  const stage = determineStage({
    isOperaMini,
    service,
    dataSaver,
    jsEnabled: true,
    lowPower,
  });

  console.log('CHECK STATUSES', {
    isOperaMini,
    service,
    dataSaver,
    jsEnabled: true,
    lowPower,
  });

  return (
    <ExperimentContext.Provider value={stage}>
      {children}
    </ExperimentContext.Provider>
  );
};

export const useExperimentContext = () => useContext(ExperimentContext);

export default WithExperimentContext;
