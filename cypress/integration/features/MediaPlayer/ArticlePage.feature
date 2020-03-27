Feature: Article Media Player

    @smoke @test
    Scenario Outline: Video clip plays on an article
        Given I navigate to <URL>
        When I click the play video button
        Then the video clip plays
        Examples:
            | URL                                |
            | scotland/articles/czwj5l0n210o     |
            | scotland/articles/czwj5l0n210o.amp |

# @test
# Scenario Outline: Audio clip plays on an article
#     Given I navigate to <URL>
#     When I click the play audio button
#     Then the audio clip plays
#     Examples:
#         | URL                                                     |

#Test multiple clips on an article page?
