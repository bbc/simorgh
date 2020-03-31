Feature: On Demand Radio Page

    Scenario Outline: Play episode
        Given I navigate to <URL>
        When I click the play episode button
        Then the episode plays
        Examples:
            | URL                                                |
            # | indonesia/bbc_indonesian_radio/w172x6r5000f38s     |
            # | indonesia/bbc_indonesian_radio/w172x6r5000f38s.amp |
