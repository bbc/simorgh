Feature: Media Asset Pages

Scenario: Verify pidgin/23248703 article
Given I navigate to pidgin/23248703
Then the headline is 'Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < >'
And there are 4 related stories
# Unable to click into another related story...
# When I click the video play button <-- NOT WORKING FOR MAPs
# Then the video plays

Scenario: Verify scotland/articles/czwj5l0n210o
Given I navigate to scotland/articles/czwj5l0n210o
Then the headline is 'This is the headline of this test article'
And the subheadline 'This is a subheadline block' is displayed
And the paragraph 'This test article has been created so that we can run automated end-to-end tests on our website.' is displayed
When I click the video play button
Then the video plays

Scenario: Verify pidgin/world-23252817
Given I navigate to pidgin/world-23252817
Then the headline is 'STY - Blood pressure drugs dey work better'
And the subheadline 'This is a heading!' is displayed
And the subheadline 'This is a crosshead!' is displayed
# When I click the audio play button <-- NOT WORKING FOR MAPs
# Then the audio plays