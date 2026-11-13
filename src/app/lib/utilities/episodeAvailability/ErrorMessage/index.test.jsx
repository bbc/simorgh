import { render } from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';

import { EPISODE_STATUS } from '../episodeStatus';
import ErrorMessage from '.';

const ErrorMessageWithContext = ({ episodeAvailability, skin }) => (
  <ServiceContextProvider service="pidgin">
    <ErrorMessage skin={skin} episodeAvailability={episodeAvailability} />
  </ServiceContextProvider>
);

describe(`episodeAvailability - Error Message`, () => {
  it('should correctly render for future episodes with video skin', () => {
    const { getByText } = render(
      <ErrorMessageWithContext
        episodeAvailability={EPISODE_STATUS.EPISODE_IS_NOT_YET_AVAILABLE}
        skin="video"
      />,
    );

    expect(
      getByText('De thing wey de here never ready for you to play.'),
    ).toBeInTheDocument();
  });

  it('should correctly render for expired episodes with audio skin', () => {
    const { getByText } = render(
      <ErrorMessageWithContext
        episodeAvailability={EPISODE_STATUS.EPISODE_IS_EXPIRED}
        skin="audio"
      />,
    );

    expect(getByText('Dis thing no dey again')).toBeInTheDocument();
  });

  it('should default to the video skin when no skin is provided', () => {
    const { getByText } = render(
      <ErrorMessageWithContext
        episodeAvailability={EPISODE_STATUS.EPISODE_IS_EXPIRED}
      />,
    );

    expect(getByText('Dis thing no dey again')).toBeInTheDocument();
  });
});
