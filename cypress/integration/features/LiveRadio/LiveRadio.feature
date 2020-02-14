Feature: Live Radio

    Scenario Outline: Verify Live Radio Page
        Given I navigate to <URL>
        When I click the play radio button
        Then the radio plays
        Examples:
            | URL                                      |
            | indonesia/bbc_indonesian_radio/liveradio |
