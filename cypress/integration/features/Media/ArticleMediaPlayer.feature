Feature: Article Media Player

    @test
    Scenario Outline: Video clip plays on an article
        Given I navigate to <URL>
        When I click the play video button
        Then the video clip plays
        Examples:
            | URL                                                     |
            | https://www.test.bbc.com/scotland/articles/czwj5l0n210o |

    @test
    Scenario Outline: Audio clip plays on an article
        Given I navigate to <URL>
        When I click the play audio button
        Then the audio clip plays
        Examples:
            | URL                                                     |
            | https://www.test.bbc.com/scotland/articles/czwj5l0n210o |

#Test multiple clips on an article page?
