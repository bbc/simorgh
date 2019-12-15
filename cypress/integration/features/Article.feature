Feature: Article 

Scenario Outline: Verify scotland/articles/czwj5l0n210o
Given I navigate to <URL>
Then the headline is 'This is the headline of this test article'
And the subheadline 'This is a subheadline block' is displayed
And the paragraph 'This test article has been created so that we can run automated end-to-end tests on our website.' is displayed
When I click the video play button
Then the video plays
Examples:
| URL |
|scotland/articles/czwj5l0n210o|
|scotland/articles/czwj5l0n210o.amp|