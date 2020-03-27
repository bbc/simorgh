Feature: On Demand Radio Player

    Scenario Outline: Verify media plays on an On Demand Radio page
        Given I navigate to <URL>
        When I click the play episode button
        Then the episode plays
        Examples:
            | URL                                                |
            # | indonesia/bbc_indonesian_radio/w172x6r5000f38s     |
            # | indonesia/bbc_indonesian_radio/w172x6r5000f38s.amp |
