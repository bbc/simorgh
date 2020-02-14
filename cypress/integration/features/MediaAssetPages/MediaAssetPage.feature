Feature: Media Asset Page

    Scenario Outline: Verify MAP page with video content
        Given I navigate to <URL>
        Then the correct headline is displayed
        When I click the play video button
        Then the video plays
        Examples:
            | URL                 |
            | igbo/media-23256786 |

    Scenario Outline: Verify MAP page with audio content
        Given I navigate to <URL>
        Then the correct headline is displayed
        When I click the play audio button
        Then the audio plays
        Examples:
            | URL                          |
            | gujarati/other-news-23130286 |
