Feature: Live Radio Page

    @smoke @test
    Scenario Outline: Play radio
        Given I navigate to <URL>
        When I click the play radio button
        Then the radio plays
        Examples:
            | URL                                   |
            | korean/bbc_korean_radio/liveradio     |
            | korean/bbc_korean_radio/liveradio.amp |
