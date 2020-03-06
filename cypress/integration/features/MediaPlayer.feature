Feature: Media Player

    @test
    Scenario Outline: Video clip plays on a CPS MAP
        Given I navigate to <URL>
        When I click the play video button
        Then the video clip plays
        Examples:
            | URL                                          |
            | https://www.test.bbc.com/igbo/media-23256786 |
    # | https://www.test.bbc.com/igbo/media-23256786.amp | # amp not currently supported

    @test
    Scenario Outline: Audio clip plays on a CPS MAP
        Given I navigate to <URL>
        When I click the play audio button
        Then the audio clip plays
        Examples:
            | URL                                                   |
            | https://www.test.bbc.com/gujarati/other-news-23130286 |
    # | https://www.test.bbc.com/gujarati/other-news-23130286.amp | # amp not currently supported

    @live
    Scenario Outline: Video clip plays on a TC2 MAP
        Given I navigate to <URL>
        When I click the play video button
        Then the video clip plays
        Examples:
            | URL                                                                      |
            | https://www.bbc.com/azeri/multimedia/2012/09/120919_georgia_prison_video |

    @live
    Scenario Outline: Audio clip plays on a TC2 MAP
        Given I navigate to <URL>
        When I click the play audio button
        Then the audio clip plays
        Examples:
            | URL                                                                            |
            | https://www.bbc.com/bengali/multimedia/2014/02/140206_fp_witness_mother_teresa |

#Live Video Stream

#Live Audio Stream
