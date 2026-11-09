📖 User Story

As a BBC World Service user, I want the website to recognise the articles and topics I've engaged with, so that I can receive more relevant content and topic recommendations.

📝 Detail

We want to investigate how we can capture, store and retrieve information about a user's content consumption behaviour, with the longer term aim of supporting personalised experiences across World Service.

There is already some functionality that stores topic engagement information in browser local storage, including topic IDs, paths and visit counts.

This spike should investigate three areas:

Local storage

Review the existing implementation and understand what information is currently captured.

Establish whether we can retrieve and expose this data within the website.

Determine whether individual article visits are recorded, or whether tracking is limited to associated topics.

Identify any changes required to capture more useful reading behaviour.

User Activity Service (UAS)

Investigate whether UAS can capture and store additional behavioural signals, including:

Articles visited.

Topics associated with visited articles.

Frequency of visits or repeat engagement.

Reading behaviour, potentially including scroll depth.

Timestamps or other useful engagement metadata.

Understand how this could work for both registered and anonymous users, including any technical limitations.

Local storage and UAS integration

Investigate whether existing local storage data can be sent directly to UAS.

Explore whether reading activity should be captured directly by UAS, synchronised periodically from local storage, or both.

Understand how information could be retrieved from UAS and exposed within the website.

Identify any limitations around data consistency, duplication, authentication and browser storage.

The outcome should be a recommendation for how we could use this information to power future functionality, particularly topic recommendations and Follow Topics.

📦 Expected Deliverables

A short technical findings document covering:

Current local storage capabilities and limitations.

UAS capabilities for capturing and retrieving engagement data.

Feasibility of synchronising local storage data with UAS.

Recommended technical approach.

Proposed follow-up development tickets.

📈 Business Value

Understanding user reading behaviour could enable us to:

Suggest relevant topics based on demonstrated interests.

Improve discovery of relevant content.

Increase adoption and engagement with Follow Topics.

Create stronger incentives for anonymous users to register for a BBC account.

Build a foundation for more personalised World Service experiences.

✅ Acceptance Criteria (BDD)

Scenario 1: Understand existing local storage capabilities

GIVEN the website currently stores some topic engagement information locally

WHEN the existing implementation is investigated

THEN we have documented what data is captured, how it is stored, and whether it can be retrieved and used by the website.

Scenario 2: Establish UAS tracking capabilities

GIVEN we want to understand article and topic consumption behaviour

WHEN the capabilities of UAS are investigated

THEN we understand whether article visits, associated topics and engagement signals such as scroll depth can be captured, stored and retrieved.

Scenario 3: Investigate local storage synchronisation

GIVEN relevant engagement information may already exist in local storage

WHEN options for synchronising this data with UAS are investigated

THEN we understand whether this is technically feasible and what integration or development work would be required.

Scenario 4: Recommend a technical approach

GIVEN the available storage and tracking approaches have been assessed

WHEN the spike is completed

THEN a recommended approach is documented, including technical constraints, privacy considerations, dependencies and proposed next steps.

🧪 Testing Information

Where practical, validate findings through a lightweight proof of concept or existing implementation review.

Consider:

Anonymous versus signed-in behaviour.

Repeat visits to articles and topics.

Browser storage limitations and data persistence.

Reliability of scroll depth as an engagement signal.

Duplicate events and synchronisation behaviour.

⚠️ Operational, Delivery or Compliance Risks

Existing topic tracking may not provide sufficient detail about individual articles.

UAS may have limitations on supported events or anonymous user activity.

Reading history and behavioural tracking may require additional privacy, consent and data retention considerations.

Scroll depth is an imperfect indicator of whether content has actually been read.

World Service topic taxonomy quality may limit the usefulness of captured signals.



