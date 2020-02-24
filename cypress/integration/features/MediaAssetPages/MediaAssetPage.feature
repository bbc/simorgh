Feature: Media Asset Page (CPS)

    Scenario: Verify MAP page renders
        Given I navigate to pidgin/23248703
        Then the headline is displayed

    Scenario: Verify MAP page can play video
        Given I navigate to igbo/media-23256786
        When I click the play video button
        Then the video plays

    Scenario: Verify MAP page can play audio
        Given I navigate to gujarati/other-news-23130286
        When I click the play audio button
        Then the audio plays

