Feature: Media Player

    @smoke @test
    Scenario Outline: Video clip plays on a Media Asset Page
        Given I navigate to <URL>
        When I click the play video button
        Then the video clip plays
        Examples:
            | URL                                                 |
            | igbo/media-23256786                                 |
            | igbo/media-23256786.amp                             |
            | gahuza/amakuru/2016/02/160215_map_amakuru_test1     |
            | gahuza/amakuru/2016/02/160215_map_amakuru_test1.amp |

    @smoke @test
    Scenario Outline: Audio clip plays on a Media Asset Page
        Given I navigate to <URL>
        When I click the play audio button
        Then the audio clip plays
        Examples:
            | URL                                              |
            | gujarati/other-news-23130286                     |
            | gujarati/other-news-23130286.amp                 |
            | hausa/multimedia/2016/07/160714_tc2_audiomap     |
            | hausa/multimedia/2016/07/160714_tc2_audiomap.amp |

    @test
    Scenario Outline: Video clip plays on a Media Asset Page
        Given I navigate to <URL>
        When I click the play video button
        Then the video clip plays
        Examples:
            | URL                                                 |
            | igbo/media-23256786                                 |
            | igbo/media-23256786.amp                             |
            | gahuza/amakuru/2016/02/160215_map_amakuru_test1     |
            | gahuza/amakuru/2016/02/160215_map_amakuru_test1.amp |

    @test
    Scenario Outline: Audio clip plays on a Media Asset Page
        Given I navigate to <URL>
        When I click the play audio button
        Then the audio clip plays
        Examples:
            | URL                                              |
            | gujarati/other-news-23130286                     |
            | gujarati/other-news-23130286.amp                 |
            | hausa/multimedia/2016/07/160714_tc2_audiomap     |
            | hausa/multimedia/2016/07/160714_tc2_audiomap.amp |

    # @smoke @live
    # Scenario Outline: Video clip plays on a Media Asset Page
    #     Given I navigate to <URL>
    #     When I click the play video button
    #     Then the video clip plays
    #     Examples:
    #         | URL                                                                                          |
    #         | https://www.bbc.com/pidgin/tori-50974590                                                     |
    #         | https://www.bbc.com/pidgin/tori-50974590.amp                                                 |
    #         | https://www.bbc.com/bengali/multimedia/2016/08/160801_baghdad_rashid_street_100yrs_video     |
    #         | https://www.bbc.com/bengali/multimedia/2016/08/160801_baghdad_rashid_street_100yrs_video.amp |

#     @live
#     Scenario Outline: Audio clip plays on a Media Asset Page
#         Given I navigate to <URL>
#         When I click the play audio button
#         Then the audio clip plays
#         Examples:
#             | URL                                                  |
#             | gujarati/other-news-23130286     |
#             | gujarati/other-news-23130286.amp |
#             # Need TC2 example with audio clip

# #Live Video Stream

# #Live Audio Stream
