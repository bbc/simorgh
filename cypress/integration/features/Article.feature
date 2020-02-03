Feature: Article 

Scenario Outline: Verify video plays on an article
Given I navigate to <URL>
When I click the play video button
Then the video plays
Examples:
| URL                            |
| scotland/articles/czwj5l0n210o |
# |scotland/articles/czwj5l0n210o.amp|
