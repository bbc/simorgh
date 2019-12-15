Feature: Media Asset Page

Scenario Outline: Verify pidgin/23248703
Given I navigate to <URL>
Then the headline is 'Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < >'
# Unable to click into another related story...
And there are 4 related stories  
# When I click the video play button <-- NOT WORKING FOR MAPs
# Then the video plays
Examples:
| URL |
| pidgin/23248703|
| pidgin/23248703.amp|

Scenario Outline: Verify pidgin/world-23252817
Given I navigate to <URL>
Then the headline is 'STY - Blood pressure drugs dey work better'
And the subheadline 'This is a heading!' is displayed
And the subheadline 'This is a crosshead!' is displayed
# When I click the audio play button <-- NOT WORKING FOR MAPs
# Then the audio plays
| URL |
| pidgin/world-23252817 |
| pidgin/world-23252817.amp |
