import { render } from '#app/components/react-testing-library-with-providers';
import { service as afriqueServiceConfig } from '#app/lib/config/services/afrique';
import ActionsTime from '../actions-time';
import PenaltyScores from '../penalty-scores';
import Period from '../period';
import ScoreDetails from '../score-details';

describe('Sports Data Header Components', () => {
  describe('Actions Time', () => {
    describe('translations', () => {
      const playerActionsFixture = {
        playerUrn:
          'urn:bbc:sportsdata:football:player:s-ckaqxlw257qzj8vjdumvwbaad',
        playerName: 'O. Dembélé',
        actionType: 'goal',
        actions: [
          {
            type: 'Penalty',
            typeLabel: {
              value: 'Penalty',
              accessible: 'Penalty',
            },
            timeLabel: {
              value: "65'",
              accessible: '65 minutes',
            },
          },
        ],
      };

      const ownGoalActionsFixture = {
        playerId: 'kvchpptoxgvcyiv358w9gtzp',
        playerName: 'J. Matip',
        actionType: 'goal',
        actions: [
          {
            type: 'Own Goal',
            typeLabel: {
              value: 'Own Goal',
              accessible: 'Own Goal',
            },
            timeLabel: {
              value: "67'",
              accessible: '67 minutes',
            },
          },
        ],
      };

      const withTranslatedActionsFixture = {
        actionType: 'goal',
        participantId: '3rutx3wc2j6q3qq8uqdn8pdja',
        playerId: '7uufcg0dvus42emi9yev9i9cl',
        playerName: 'N. Belaković',
        actions: [
          {
            type: 'Goal',
            typeLabel: {
              value: 'Goal',
              accessible: 'Goal',
            },
            timeLabel: {
              value: "23'",
              accessible: '23 minutes',
              translated: "۲۳'",
            },
          },
          {
            type: 'Penalty',
            typeLabel: {
              value: 'Penalty',
              accessible: 'Penalty',
            },
            timeLabel: {
              value: "27'",
              accessible: '27 minutes',
              translated: "۲۷'",
            },
          },
        ],
      };

      it('should render english fallback for penalty if no translation is available', () => {
        const { container } = render(
          <ActionsTime player={playerActionsFixture} />,
        );
        const renderedActionTime = container.querySelector(
          'span[aria-hidden="true"]',
        );
        const visuallyHiddenSummary = container.querySelector(
          'span[class*="visuallyHiddenText"]',
        );
        expect(renderedActionTime).toHaveTextContent("65' pen");
        expect(visuallyHiddenSummary).toHaveTextContent('Penalty 65 minutes');
      });

      it('should render english fallback for own goal if no translation is available', () => {
        const { container } = render(
          <ActionsTime player={ownGoalActionsFixture} />,
        );
        const renderedActionTime = container.querySelector(
          'span[aria-hidden="true"]',
        );
        const visuallyHiddenSummary = container.querySelector(
          'span[class*="visuallyHiddenText"]',
        );
        expect(renderedActionTime).toHaveTextContent("67' og");
        expect(visuallyHiddenSummary).toHaveTextContent('Own Goal 67 minutes');
      });

      it('should render translated action time for penalty if available', () => {
        const { container } = render(
          <ActionsTime player={playerActionsFixture} />,
          { service: 'arabic' },
        );
        const renderedActionTime = container.querySelector(
          'span[aria-hidden="true"]',
        );
        const visuallyHiddenSummary = container.querySelector(
          'span[class*="visuallyHiddenText"]',
        );
        expect(renderedActionTime).toHaveTextContent("65' ر . ج");
        expect(visuallyHiddenSummary).toHaveTextContent('Penalty 65 minutes');
      });

      it('should render translated action time for own goal if available', () => {
        const { container } = render(
          <ActionsTime player={ownGoalActionsFixture} />,
          { service: 'arabic' },
        );
        const renderedActionTime = container.querySelector(
          'span[aria-hidden="true"]',
        );
        const visuallyHiddenSummary = container.querySelector(
          'span[class*="visuallyHiddenText"]',
        );
        expect(renderedActionTime).toHaveTextContent("67' هدف عكسي");
        expect(visuallyHiddenSummary).toHaveTextContent('Own Goal 67 minutes');
      });

      it('should render translated numerals if provided', () => {
        const { container } = render(
          <ActionsTime player={withTranslatedActionsFixture} />,
          { service: 'persian' },
        );
        expect(container).toHaveTextContent("۲۳'");
        expect(container).toHaveTextContent("۲۷' پن");
      });
    });
  });

  describe('Penalty Scores', () => {
    describe('translations', () => {
      it('should render translated penalty scores text when translations are provided', () => {
        const { getByTestId } = render(
          <PenaltyScores
            data={{
              status: 'PostEvent',
              winner: 'home',
              // @ts-expect-error - partial data for test
              home: {
                fullName: 'Team A',
                runningScores: {
                  penaltyShootout: '5',
                },
              },
              // @ts-expect-error - partial data for test
              away: {
                fullName: 'Team B',
                runningScores: {
                  penaltyShootout: '4',
                },
              },
            }}
          />,
          { service: 'afrique' },
        );
        const penaltiesText = getByTestId('penalties-text');
        expect(penaltiesText).toHaveTextContent(
          'Team A gagne 5-4 aux tirs au but',
        );
      });

      it('should render default penalty scores text when no translations are provided', () => {
        const { getByTestId } = render(
          <PenaltyScores
            data={{
              status: 'PostEvent',
              winner: 'home',
              // @ts-expect-error - partial data for test
              home: {
                fullName: 'Team A',
                runningScores: {
                  penaltyShootout: '5',
                },
              },
              // @ts-expect-error - partial data for test
              away: {
                fullName: 'Team B',
                runningScores: {
                  penaltyShootout: '4',
                },
              },
            }}
          />,
        );
        const penaltiesText = getByTestId('penalties-text');
        expect(penaltiesText).toHaveTextContent('Team A win 5-4 on pens');
      });
    });
  });

  describe('Period', () => {
    describe('translations', () => {
      it('should render translated period label if translations are provided', () => {
        const { getByText } = render(
          <Period
            status="MidEvent"
            labels={{
              value: 'ET',
              accessible: 'Match going to Extra Time',
              translation: 'Prolongation',
            }}
          />,
          { service: 'afrique' },
        );
        const periodLabel = getByText('Prolongation');
        expect(periodLabel).toBeInTheDocument();
      });

      it('should render default period label if no translated value is provided', () => {
        const { getByText } = render(
          <Period
            status="MidEvent"
            labels={{
              value: 'ET',
              accessible: 'Match going to Extra Time',
            }}
          />,
        );
        const periodLabel = getByText('ET');
        expect(periodLabel).toBeInTheDocument();
      });
    });
  });

  describe('Score Details', () => {
    describe('translations', () => {
      it('should render translated score details if translations are provided', () => {
        const { getByText } = render(
          <ScoreDetails
            homeName="Team A"
            awayName="Team B"
            homeRunningScores={{
              halftime: '0',
              fulltime: '1',
              extratime: '1',
              penaltyShootout: '4',
            }}
            awayRunningScores={{
              halftime: '1',
              fulltime: '1',
              extratime: '1',
              penaltyShootout: '3',
            }}
            translations={afriqueServiceConfig.default.translations.sport}
          />,
          { service: 'afrique' },
        );
        const fullTimeVisuallyHiddenLabel = getByText(
          'Fin du match Team A 1 , Team B 1',
        );
        const fullTimeLabel = getByText('Fin du match 1-1');
        const halfTimeVisuallyHiddenLabel = getByText(
          'Mi-temps Team A 0 , Team B 1',
        );
        const halfTimeLabel = getByText('Mi-temps 0-1');
        expect(fullTimeVisuallyHiddenLabel).toBeInTheDocument();
        expect(fullTimeLabel).toBeInTheDocument();
        expect(halfTimeVisuallyHiddenLabel).toBeInTheDocument();
        expect(halfTimeLabel).toBeInTheDocument();
      });

      it('should render default score details if no translations are provided', () => {
        const { getByText } = render(
          <ScoreDetails
            homeName="Team A"
            awayName="Team B"
            homeRunningScores={{
              halftime: '0',
              fulltime: '1',
              extratime: '1',
              penaltyShootout: '4',
            }}
            awayRunningScores={{
              halftime: '1',
              fulltime: '1',
              extratime: '1',
              penaltyShootout: '3',
            }}
          />,
        );
        const fullTimeVisuallyHiddenLabel = getByText(
          'Full Time Team A 1 , Team B 1',
        );
        const fullTimeLabel = getByText('FT 1-1');
        const halfTimeVisuallyHiddenLabel = getByText(
          'Half Time Team A 0 , Team B 1',
        );
        const halfTimeLabel = getByText('HT 0-1');
        expect(fullTimeVisuallyHiddenLabel).toBeInTheDocument();
        expect(fullTimeLabel).toBeInTheDocument();
        expect(halfTimeVisuallyHiddenLabel).toBeInTheDocument();
        expect(halfTimeLabel).toBeInTheDocument();
      });
    });
  });
});
