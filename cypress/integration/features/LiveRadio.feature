Feature: Live Radio

Scenario Outline: Verify Indonesia Live Radio Page
Given I navigate to <URL>
Then the headline is 'BBC Indonesia Radio'
And the paragraph 'BBC Indonesia Radio: Berita dunia, ulasan, berita olahraga dan majalah mingguan dari BBC Indonesia Radio.' is displayed
When I click the radio play button
Then the radio plays
Examples:
| URL | 
| indonesia/bbc_indonesian_radio/liveradio |
#| indonesia/bbc_indonesian_radio/liveradio.amp | <-- Not working