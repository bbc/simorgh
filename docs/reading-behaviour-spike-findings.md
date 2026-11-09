# Reading Behaviour: Initial Findings

**Status:** code review and focused unit tests complete; browser and UAS-owner validation still needed. This is evidence for the spike, not approval to add tracking.

## What We Know

- **Local topics:** `ws_bbc_topics` stores topic name, ID, path and a visit count under the service. Page metadata supplies the topics, and the count increments when the page wrapper runs. [Writer](../src/app/components/PageLayoutWrapper/setPageWrapperInlineJs/index.ts) [Call site](../src/app/components/PageLayoutWrapper/index.tsx)
- **Other local totals:** `ws_bbc_wrapped` stores yearly/monthly totals by page type, service and topic, plus word count and elapsed visible time. It is an aggregate, not a per-article history; elapsed time does not prove reading.
- **Where it runs:** the wrapper script is omitted for Lite, AMP, tests and when service fonts are unavailable. Topics are based on page metadata; article coverage and navigation edge cases still need browser checks.
- **Retrieval:** code search found no production reader of `ws_bbc_topics` or `ws_bbc_wrapped`. Tests read them, but the site does not currently use them to show recommendations. The stored JSON can be read by same-origin browser code, subject to browser storage availability.
- **Environment separation:** the keys are not environment-prefixed. The browser separates storage by the page's origin (scheme, host and port): local development is configured for `http://localhost:7080`, test for `https://www.test.bbc.com`, and live for `https://www.bbc.com`. These are separate storage areas. Different paths/services on the same origin share storage, with this data further grouped by service in the JSON. Check the actual address-bar origin, since local overrides can change it.
- **UAS today:** Simorgh's documented integration supports signed-in saved articles and followed topics. It can retrieve those lists with service filtering and pagination. Current code does not establish a reading-history event type or anonymous-user support. [UAS guide](../src/app/lib/uasApi/README.md)
- **Privacy and retention:** code review does not establish consent, retention, deletion, or lawful-basis requirements for reading history. These require owner decisions before collecting or uploading new behaviour.

The focused storage suite passed (13 tests) with `yarn jest --runInBand --config jest.config.ts src/app/components/PageLayoutWrapper/setPageWrapperInlineJs/index.test.ts`. Jest printed pre-existing duplicate manual-mock warnings; they did not fail this suite.

## What Is Not Yet Confirmed

UAS owner documentation or test-environment evidence is needed to confirm whether UAS accepts and returns article visits, associated topics, repeat counts, timestamps, scroll/dwell signals, anonymous activity or imported local summaries. Also confirm limits, deduplication, deletion and retention. A request field or mock test alone does not prove server support.

The code review also cannot confirm real-browser persistence, private browsing, multi-tab count accuracy, consent behaviour, signed-in/account-switch handling, cross-device retrieval or actual article/topic-page coverage.

## Recommendation To Test

First test local topic candidates without sending history anywhere. If owners confirm an approved UAS event contract and privacy rules, compare direct capture with a small, bounded retry queue against periodic local-storage sync. Do not upload existing totals as individual historic visits, send raw local-storage JSON, or turn inferred interest into an explicit Follow Topics action. Treat scroll depth and visible time only as imperfect engagement signals.

## My News Feasibility

An initial, same-browser recommendation section is possible with existing data and UI pieces, but it needs new wiring. [My News](../ws-nextjs-app/pages/%5Bservice%5D/my-news/MyNewsPage/MyNewsPageContent.tsx) currently displays UAS-followed topics and saved articles; it does not read local topic counts. The page already fetches followed topics, and [FollowTopicButton](../src/app/components/FollowTopicButton/index.tsx) supports follow/unfollow actions. The page itself currently shows a guest screen unless personalization is enabled and the user is signed in ([page gate](../ws-nextjs-app/pages/%5Bservice%5D/my-news/MyNewsPage/index.tsx)).

Suggested first presentation: a small **Topics you might like** section above **Followed topics**. Read `ws_bbc_topics` in the browser, select the current service, sort candidates by saved count (highest first), exclude IDs already followed, and use the existing follow button. Hide the section when there are no eligible candidates, or use a separately approved editorial fallback. Do not display visit counts by default.

Sorting by count is a reasonable experiment, not a measure of reading. The count increments when the page wrapper runs, has no timestamp/recency, and is only available in that browser and origin. Keep the explicit followed-topic list separate from recommendations. Anonymous My News recommendations would need a page-flow change because guests currently see the guest screen; local data is not automatically transferred across devices.

**Conclusion:** possible as a local-only UI experiment; cross-device recommendations require a confirmed UAS consumption contract and privacy approval.

## Sign-Up Opportunity

Showing useful topic discovery on article, topic or other public pages could give signed-out visitors a reason to follow topics and create an account. This is a plausible growth hypothesis, not a proven sign-up driver. The existing [guest Follow button](../src/app/components/FollowTopicButton/FollowTopicButtonGuest/index.tsx) opens an account modal with sign-in and registration actions ([modal](../src/app/components/Account/AccountSignInModal/index.tsx)); currently, the button is used on topic pages ([call site](../src/app/pages/TopicPage/TopicPage.jsx)). Reusing it elsewhere depends on the topic-personalization feature being available for that service.

Keep two approaches distinct:

- **General discovery:** show editorially selected or generally popular topics on public pages. This does not depend on a visitor's reading history and can be tested without building a personal profile.
- **Local recommendations:** rank topics using `ws_bbc_topics` for the current browser. This may work before sign-in, but it is still behaviour-based personalization and needs privacy review; local history is not available across devices.

Test placement and wording with an experiment before treating it as a registration strategy. Measure registration completion as well as recommendation views, Follow clicks and follow completion; monitor page exits and performance so a sign-up prompt does not harm the reading experience. Compare against an appropriate control and report results by service, without inferring uplift from clicks alone.

## Developer: What To Do Next

1. The focused storage tests pass. Re-run them after any change to the local tracking code: `yarn jest --runInBand --config jest.config.ts src/app/components/PageLayoutWrapper/setPageWrapperInlineJs/index.test.ts`.
2. In browser DevTools, inspect Application/Storage > Local Storage separately for the actual local, test and live page origins. Do not expect values to copy between them; services at the same origin share the storage area.
3. In a real browser, check anonymous and signed-in article/topic visits, client navigation, repeats, storage clearing/private mode, and two-tab behaviour. Record which page types actually increment topics and totals.
4. Ask the UAS owner for a supported write/read/delete contract and test access for consumption events, anonymous identity, deduplication, limits, retention and deletion. Validate with synthetic data only.
5. Ask product/privacy owners to approve consent, data minimisation, sensitive topics, retention, deletion and account-switch rules before any new capture or sync.
6. Ask product/analytics owners to define the sign-up experiment, control group and success/guardrail metrics before using topic discovery to claim registration growth.
7. Add dated evidence and blockers here; then update the [execution plan](../spike-investigation-plan.md) and create only the follow-up tickets supported by findings.

## Follow-Up Work (If Validated)

| Work                                           | Requires                               |
| ---------------------------------------------- | -------------------------------------- |
| Approved consent, identity and retention rules | Product/privacy/security decisions     |
| Local event schema and reader                  | Confirmed use case and storage policy  |
| UAS consumption contract                       | UAS owner support and test environment |
| Capture, retry and account-transition flow     | Approved contract and privacy rules    |
| Topic candidate retrieval/ranking              | Reliable data and taxonomy review      |
| Topic discovery/sign-up experiment             | Product placement and analytics plan   |
| Optional scroll/dwell pilot                    | Demonstrated need and UAS support      |
