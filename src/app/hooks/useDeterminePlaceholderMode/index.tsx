import useOperaMiniDetection from '#app/hooks/useOperaMiniDetection';
import { Services } from '#app/models/types/global';
import { useContext, useEffect, useState } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';

// Disabled due to bug in ts lint
// eslint-disable-next-line no-shadow
export enum Mode {
  NO_JS = `No js mode`,
  SHOW_SUSTAINABILITY_MSG = `Has sustainability message`,
  DEFAULT = `Default - has no sustainability message`,
}

type Criteria = Partial<{
  service: Services;
  isOperaMini: boolean;
  dataSaver: boolean;
  lowPower: boolean;
  noJs: boolean;
  hasTranscript: boolean;
}>;

export type Navigator = {
  connection: { saveData: boolean };
  getBattery?: () => Promise<{ level: number }>;
};

const LOW_POWER_THRESHOLD = 0.2;

const determineMode = ({
  service,
  isOperaMini,
  dataSaver,
  lowPower,
  noJs,
  hasTranscript,
}: Criteria) => {
  if (noJs) {
    return Mode.NO_JS;
  }

  if (
    (service === 'mundo' || dataSaver || isOperaMini || lowPower) &&
    hasTranscript
  ) {
    return Mode.SHOW_SUSTAINABILITY_MSG;
  }

  return Mode.DEFAULT;
};

const useDeterminePlaceholderMode = (hasTranscript: boolean) => {
  const [lowPower, setLowPower] = useState(false);
  const [dataSaver, setSaveDataMode] = useState(false);
  const [noJs, setNoJs] = useState(true);
  const isOperaMini = useOperaMiniDetection();
  const { service } = useContext(ServiceContext);

  useEffect(() => {
    const initialiseDeviceStates = async () => {
      const nav = navigator as unknown as Navigator;
      const saveDataMode = nav.connection?.saveData;
      if (nav.getBattery) {
        const manager = await nav.getBattery();
        const { level } = manager;
        const isLowPower = level <= LOW_POWER_THRESHOLD;
        setLowPower(isLowPower);
      }
      setSaveDataMode(saveDataMode);
    };
    initialiseDeviceStates();
    setNoJs(false);
  }, []);

  const stage = determineMode({
    isOperaMini,
    service,
    dataSaver,
    lowPower,
    noJs,
    hasTranscript,
  });

  return stage;
};

export default useDeterminePlaceholderMode;
