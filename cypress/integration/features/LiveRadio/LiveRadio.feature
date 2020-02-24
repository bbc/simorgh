Feature: Live Radio

    Scenario Outline: Verify Live Radio Page
        Given I navigate to <URL>
        Then the radio name is displayed
        And the radio description is displayed
        Examples:
            | URL                                   |
            | korean/bbc_korean_radio/liveradio     |
            | korean/bbc_korean_radio/liveradio.amp |

    Scenario: Verify Live Radio plays
        Given I navigate to indonesia/bbc_indonesian_radio/liveradio
        When I click the play radio button
        Then the radio plays
