Feature: Media Player

    @smoke
    Scenario Outline: Video clip plays on a Media Asset Page
        Given I navigate to <URL>
        When I click the play video button
        Then the video clip plays
        Examples:
            | URL                                                                       |
            | http://localhost:7080/igbo/media-23256786                                 |
            | http://localhost:7080/igbo/media-23256786.amp                             |
            | http://localhost:7080/gahuza/amakuru/2016/02/160215_map_amakuru_test1     |
            | http://localhost:7080/gahuza/amakuru/2016/02/160215_map_amakuru_test1.amp |

    @smoke
    Scenario Outline: Audio clip plays on a Media Asset Page
        Given I navigate to <URL>
        When I click the play audio button
        Then the audio clip plays
        Examples:
            | URL                                                                    |
            | http://localhost:7080/gujarati/other-news-23130286                     |
            | http://localhost:7080/gujarati/other-news-23130286.amp                 |
            | http://localhost:7080/hausa/multimedia/2016/07/160714_tc2_audiomap     |
            | http://localhost:7080/hausa/multimedia/2016/07/160714_tc2_audiomap.amp |

    @test
    Scenario Outline: Video clip plays on a Media Asset Page
        Given I navigate to <URL>
        When I click the play video button
        Then the video clip plays
        Examples:
            | URL                                                                          |
            | https://www.test.bbc.com/igbo/media-23256786                                 |
            | https://www.test.bbc.com/igbo/media-23256786.amp                             |
            | https://www.test.bbc.com/gahuza/amakuru/2016/02/160215_map_amakuru_test1     |
            | https://www.test.bbc.com/gahuza/amakuru/2016/02/160215_map_amakuru_test1.amp |

    @test
    Scenario Outline: Audio clip plays on a Media Asset Page
        Given I navigate to <URL>
        When I click the play audio button
        Then the audio clip plays
        Examples:
            | URL                                                                       |
            | https://www.test.bbc.com/gujarati/other-news-23130286                     |
            | https://www.test.bbc.com/gujarati/other-news-23130286.amp                 |
            | https://www.test.bbc.com/hausa/multimedia/2016/07/160714_tc2_audiomap     |
            | https://www.test.bbc.com/hausa/multimedia/2016/07/160714_tc2_audiomap.amp |

    @live
    Scenario Outline: Video clip plays on a Media Asset Page
        Given I navigate to <URL>
        When I click the play video button
        Then the video clip plays
        Examples:
            | URL                                                                                          |
            | https://www.bbc.com/igbo/media-23256786                                                      |
            | https://www.bbc.com/igbo/media-23256786.amp                                                  |
            | https://www.bbc.com/bengali/multimedia/2016/08/160801_baghdad_rashid_street_100yrs_video     |
            | https://www.bbc.com/bengali/multimedia/2016/08/160801_baghdad_rashid_street_100yrs_video.amp |

    @live
    Scenario Outline: Audio clip plays on a Media Asset Page
        Given I navigate to <URL>
        When I click the play audio button
        Then the audio clip plays
        Examples:
            | URL                                                  |
            | https://www.bbc.com/gujarati/other-news-23130286     |
            | https://www.bbc.com/gujarati/other-news-23130286.amp |
            # Need TC2 example with audio clip

#Live Video Stream

#Live Audio Stream
