Feature: Live Radio Player

    @smoke @test @live
    Scenario Outline: Verify media plays on Live Radio page
        Given I navigate to <URL>
        When I click the play radio button
        Then the radio plays
        Examples:
            | URL                                   |
            | korean/bbc_korean_radio/liveradio     |
            | korean/bbc_korean_radio/liveradio.amp |
