Feature: Live Radio

    Scenario Outline: Verify Live Radio Page
        Given I navigate to <URL>
        Then the correct radio name is displayed
        And the correct radio description is displayed
        Examples:
            | URL                                   |
            | korean/bbc_korean_radio/liveradio     |
            | korean/bbc_korean_radio/liveradio.amp |

    Scenario Outline: Verify Live Radio plays
        Given I navigate to indonesia/bbc_indonesian_radio/liveradio
        When I click the play radio button
        Then the radio plays
