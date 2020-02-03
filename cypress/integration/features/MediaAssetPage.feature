Feature: Media Asset Page

Scenario Outline: Verify MAP page with video content
Given I navigate to <URL>
Then the correct headline is displayed
When I click the play video button
Then the video plays
Examples:
| URL                 |
| pidgin/23248703     |
# | pidgin/23248703.amp |

Scenario Outline: Verify MAP page with audio content
 Given I navigate to <URL>
#  Then the correct headline is displayed
 When I click the play audio button
 Then the audio plays
Examples:
 | URL                       |
 | pidgin/world-23252817     |
#  | pidgin/world-23252817.amp |

# Scenario Outline: Verify subheadings / crossheads etc
#  Given I navigate to <URL>
#  Then the correct headline is displayed
#  And the subheadline 'This is a heading!' is displayed
#  And the subheadline 'This is a crosshead!' is displayed
# Examples:
#  | URL                       |
#  | pidgin/world-23252817     |
# #  | pidgin/world-23252817.amp |
