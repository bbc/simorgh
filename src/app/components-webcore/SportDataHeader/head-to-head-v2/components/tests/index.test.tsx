import { render } from '#app/components/react-testing-library-with-providers';
import ActionsTime from '../actions-time';

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
        expect(renderedActionTime).toHaveTextContent("65' ر.ت.");
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
});
