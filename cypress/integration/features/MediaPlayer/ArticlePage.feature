Feature: Article Page

    @smoke @test
    Scenario Outline: Play video clip
        Given I navigate to <URL>
        When I click the play video button
        Then the video clip plays
        Examples:
            | URL                                |
            | scotland/articles/czwj5l0n210o     |
            | scotland/articles/czwj5l0n210o.amp |

# @test
# Scenario Outline: Play audio clip
#     Given I navigate to <URL>
#     When I click the play audio button
#     Then the audio clip plays
#     Examples:
#         | URL                                                     |

#Test multiple video clips

#Test multiple audio clips
