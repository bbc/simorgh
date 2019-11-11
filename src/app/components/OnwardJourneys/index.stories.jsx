import React from 'react';
import { storiesOf } from '@storybook/react';
import { latin } from '@bbc/gel-foundations/scripts';
import notes from '../README.md';
import OnwardJourneys from './index';

const onwardJourneysData = [
  {
    name: 'Climate change',
    href: 'https://www.bbc.co.uk/news/topics/cmj34zmwm1zt/climate-change',

    url: 'https://www.bbc.co.uk/news/topics/cmj34zmwm1zt/climate-change',
    id: 'cmj34zmwm1zt',
    records: [
      {
        headline: "Climate change 'making mountaineering riskier'",
        url: 'https://www.bbc.co.uk/news/science-environment-50237551',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/14A56/production/_109466548_crevasses.jpg',
          originCode: 'cpsprodpb',
          caption:
            'Crevasses are becoming difficult to cross in some mountainous regions',
          altText: 'Mountaineers climbing the Alps',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
      {
        headline: "Corbyn plans 'green industrial revolution'",
        url: 'https://www.bbc.co.uk/news/uk-politics-50318521',
        image: {
          height: 576,
          width: 1024,
          href:
            'http://c.files.bbci.co.uk/D615/production/_109550845_p07t5pvs.jpg',
          originCode: 'cpsprodpb',
          altText: 'Jeremy Corbyn',
          copyrightHolder: 'Reuters',
          allowSyndication: true,
        },
      },
      {
        headline: 'How would the Greens fund climate pledge?',
        url: 'https://www.bbc.co.uk/news/uk-politics-50315720',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/AAAE/production/_109549634_gettyimages-976800330.jpg',
          originCode: 'cpsprodpb',
          altText: 'Wind turbines',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
      {
        headline: "Green Party: 'This must be the climate election'",
        url: 'https://www.bbc.co.uk/news/uk-politics-50317421',
        image: {
          height: 576,
          width: 1024,
          href:
            'http://c.files.bbci.co.uk/036A/production/_109547800_p07t5lh8.jpg',
          originCode: 'cpsprodpb',
          altText: 'Sian Berry, Carla Denyer and Amelia Womack',
          copyrightHolder: 'PA Media',
          allowSyndication: true,
        },
      },
      {
        headline: "Nuclear fusion: 'A question of when, not if'",
        url: 'https://www.bbc.co.uk/news/science-environment-50267017',
        image: {
          height: 261,
          width: 464,
          href:
            'http://c.files.bbci.co.uk/5494/production/_109525612_gettyimages-1095967942.jpg',
          originCode: 'cpsprodpb',
          caption: "An artist's impression of how a fusion reactor might look",
          altText: 'fusion',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
    ],
  },
  {
    name: 'Elon Musk',
    href: 'https://www.bbc.co.uk/news/topics/c302m85q53mt/elon-musk',
    url: 'https://www.bbc.co.uk/news/topics/c302m85q53mt/elon-musk',
    id: 'c302m85q53mt',
    records: [
      {
        headline: "Musk faces trial over 'pedo' tweet",
        url: 'https://www.bbc.co.uk/news/world-us-canada-48238576',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/FB8F/production/_103299346_7d122136-acbc-4722-9641-46595b077a34.jpg',
          originCode: 'cpsprodpb',
          caption:
            'Mr Musk (R) called British diver Mr Unsworth (L) "pedo guy"',
          altText: 'Composite image of Vernon Unsworth and Elon Musk',
          copyrightHolder: 'AFP',
          allowSyndication: true,
        },
      },
      {
        headline: 'Tesla gets the go-ahead to build cars in China',
        url: 'https://www.bbc.co.uk/news/business-50080806',
        image: {
          height: 576,
          width: 1024,
          href:
            'http://c.files.bbci.co.uk/1114E/production/_109266996_tesla3_getty.jpg',
          originCode: 'cpsprodpb',
          altText: 'Tesla car',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
      {
        headline: 'Fortnite blown up by asteroid',
        url: 'https://www.bbc.co.uk/news/newsbeat-50038597',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/128F6/production/_109222067_8bda743b-8d1e-465e-bdf1-ccdb24571903.jpg',
          originCode: 'cpsprodpb',
          altText: "Black hole being streamed on Fortnite's Twitter page",
          copyrightHolder: 'Fortnite/Twitter',
          allowSyndication: true,
        },
      },
      {
        headline: 'Elon Musk upbeat on Starship test flights',
        url: 'https://www.bbc.co.uk/news/science-environment-49870154',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/963D/production/_109016483_efmqff1u0aavyjn.jpg',
          originCode: 'cpsprodpb',
          altText: 'Artwork',
          copyrightHolder: 'SPACEX',
          allowSyndication: false,
        },
      },
      {
        headline: 'Tech Tent: Facebook has designs on your brain',
        url: 'https://www.bbc.co.uk/news/technology-49858048',
        image: {
          height: 1152,
          width: 2048,
          href:
            'http://c.files.bbci.co.uk/133E4/production/_109002887_gettyimages-486115005.jpg',
          originCode: 'cpsprodpb',
          altText: 'Child in mind-reading hat',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
      {
        headline: "Musk says 'pedo guy' tweet was not accusation",
        url: 'https://www.bbc.co.uk/news/world-us-canada-49724251',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/FB8F/production/_103299346_7d122136-acbc-4722-9641-46595b077a34.jpg',
          originCode: 'cpsprodpb',
          caption:
            'Mr Musk (R) called British diver Mr Unsworth (L) "pedo guy"',
          altText: 'Composite image of Vernon Unsworth and Elon Musk',
          copyrightHolder: 'AFP',
          allowSyndication: true,
        },
      },
    ],
  },
  {
    name: 'Environment',
    url: 'https://www.bbc.co.uk/news/topics/cnx753jenyjt/environment',
    id: 'cnx753jenyjt',
    records: [
      {
        headline: 'How Shropshire ideas may help the rewilding debate',
        url: 'https://www.bbc.co.uk/news/uk-england-shropshire-50169027',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/BF0A/production/_109360984_rewilding.jpg',
          originCode: 'cpsprodpb',
          caption:
            "In the Cambrian Mountains there's strong local opposition to rewilding",
          altText:
            "In the Cambrian Mountains there's strong local opposition to rewilding",
          copyrightHolder: 'BBC',
          allowSyndication: true,
        },
      },
      {
        headline: "Farmers' anger over slurry pollution rule changes",
        url: 'https://www.bbc.co.uk/news/uk-wales-50332308',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/3ED6/production/_109568061_gettyimages-1148622395.jpg',
          originCode: 'cpsprodpb',
          altText: 'A cow sticking its tongue out',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
      {
        headline: 'This must be the climate election - Greens',
        url: 'https://www.bbc.co.uk/news/uk-politics-50305284',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/15DF0/production/_109548598_mediaitem109548595.jpg',
          originCode: 'cpsprodpb',
          caption:
            'Co-leader Sian Berry, candidate Carla Denyer and deputy leader Amelia Womack',
          altText:
            'Sian Berry, Bristol West Candidate Carla Denyer and deputy leader Amelia Womack',
          copyrightHolder: 'PA Media',
          allowSyndication: true,
        },
      },
      {
        headline: "Plans to double city's green space",
        url: 'https://www.bbc.co.uk/news/uk-wales-50303472',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/6468/production/_109540752_rivertawegreencorridor.png',
          originCode: 'cpsprodpb',
          altText: 'River Tawe Wildlife Corridor',
          copyrightHolder: 'Swansea Council',
          allowSyndication: false,
        },
      },
      {
        headline: "Do your 'plastic-free' teabags contain plastic?",
        url: 'https://www.bbc.co.uk/news/uk-50260687',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/7ED8/production/_109427423_gettyimages-93195303.jpg',
          originCode: 'cpsprodpb',
          altText: 'Tea bag in cup',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
      {
        headline: 'How much will this be a climate change election?',
        url: 'https://www.bbc.co.uk/news/science-environment-50307304',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/96D6/production/_109541683_mediaitem109541681.jpg',
          originCode: 'cpsprodpb',
          altText: 'Solar panels',
          copyrightHolder: 'PA Media',
          allowSyndication: true,
        },
      },
    ],
  },
  {
    name: 'YouTube',
    url: 'https://www.bbc.co.uk/news/topics/c77jz3mdmjxt/youtube',
    id: 'c77jz3mdmjxt',
    records: [
      {
        headline: 'Iranian Instagram star arrested for blasphemy',
        url: 'https://www.bbc.co.uk/news/world-middle-east-49952543',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/E68E/production/_109122095_mediaitem109122094.jpg',
          originCode: 'cpsprodpb',
          caption: 'Her Instagram has been deleted',
          altText: "Shot of Sahar Tabar's Instagram",
          copyrightHolder: 'Instagram',
          allowSyndication: false,
        },
      },
      {
        headline:
          "'It doesn't get much bigger than this!' - YouTubers on KSI v Logan Paul 2",
        url: 'https://www.bbc.co.uk/sport/av/boxing/50346111',
        image: {
          height: 576,
          width: 1024,
          href:
            'http://c.files.bbci.co.uk/17724/production/_109563069_ksi_logan.jpg',
          originCode: 'cpsprodpb',
          altText: 'KSI and Logan Paul',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
      {
        headline: 'KSI v Logan Paul - all you need to know',
        url: 'https://www.bbc.co.uk/sport/boxing/50300742',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/3530/production/_103161631_index.jpg',
          originCode: 'cpsprodpb',
          altText: 'KSI and Logan Paul',
          copyrightHolder: 'PA/Getty Images',
          allowSyndication: false,
        },
      },
      {
        headline: 'Can KSI and Logan Paul be nice to each other?',
        url: 'https://www.bbc.co.uk/sport/av/50338677',
        image: {
          height: 576,
          width: 1024,
          href:
            'http://c.files.bbci.co.uk/9283/production/_109570573_p07t8x10.jpg',
          originCode: 'cpsprodpb',
          altText: 'KSI v Logan Paul',
          copyrightHolder: 'BBC Sport',
          allowSyndication: false,
        },
      },
      {
        headline: "KSI vs Logan Paul: 'Someone's getting knocked out'",
        url: 'https://www.bbc.co.uk/news/newsbeat-50324702',
        image: {
          height: 576,
          width: 1024,
          href:
            'http://c.files.bbci.co.uk/E304/production/_109561185_p07t7lld.jpg',
          originCode: 'cpsprodpb',
          altText: 'KSI and Logan Paul face off',
          copyrightHolder: 'Getty Images',
          allowSyndication: false,
        },
      },
      {
        headline: 'What does KSI v Logan Paul II mean for boxing?',
        url: 'https://www.bbc.co.uk/sport/boxing/50293836',
        image: {
          height: 1152,
          width: 2048,
          href:
            'http://c.files.bbci.co.uk/A175/production/_109433314_gettyimages-1174691578.jpg',
          originCode: 'cpsprodpb',
          altText: 'KSI v Logan Paul',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
    ],
  },
  {
    name: 'YouTubers',
    url: 'https://www.bbc.co.uk/news/topics/c347lq4ey92t/youtubers',
    id: 'c347lq4ey92t',
    records: [
      {
        headline: "YouTuber complains about 'copied' makeup tutorials",
        url: 'https://www.bbc.co.uk/news/newsbeat-49496147',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/39A0/production/_108525741_chelsie-edit.jpg',
          originCode: 'cpsprodpb',
          altText: 'Chelsie Worthy is known on social media as @wvrthy',
          copyrightHolder: 'Chelsie Worthy / Youtube',
          allowSyndication: false,
        },
      },
      {
        headline: "KSI vs Logan Paul: 'Someone's getting knocked out'",
        url: 'https://www.bbc.co.uk/news/newsbeat-50324702',
        image: {
          height: 576,
          width: 1024,
          href:
            'http://c.files.bbci.co.uk/E304/production/_109561185_p07t7lld.jpg',
          originCode: 'cpsprodpb',
          altText: 'KSI and Logan Paul face off',
          copyrightHolder: 'Getty Images',
          allowSyndication: false,
        },
      },
      {
        headline: 'What does KSI v Logan Paul II mean for boxing?',
        url: 'https://www.bbc.co.uk/sport/boxing/50293836',
        image: {
          height: 1152,
          width: 2048,
          href:
            'http://c.files.bbci.co.uk/A175/production/_109433314_gettyimages-1174691578.jpg',
          originCode: 'cpsprodpb',
          altText: 'KSI v Logan Paul',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
      {
        headline: 'Fortnite pro Jarvis banned over cheat software',
        url: 'https://www.bbc.co.uk/news/technology-50300842',
        image: {
          height: 432,
          width: 768,
          href:
            'http://c.files.bbci.co.uk/AA5D/production/_109531634_mediaitem109531633.jpg',
          originCode: 'cpsprodpb',
          altText: 'Fortnite logo',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
      {
        headline: 'YouTube stars lead way with tree-planting campaign',
        url: 'https://www.bbc.co.uk/news/world-us-canada-50233221',
        image: {
          height: 549,
          width: 976,
          href:
            'http://c.files.bbci.co.uk/17FBC/production/_109463289_053320720.jpg',
          originCode: 'cpsprodpb',
          caption:
            'Beauty YouTuber Jeffree Star donated $50,000 to the campaign',
          altText: 'Jeffree Star standing against a pink fluffy background',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
      {
        headline: 'The YouTube sensation taking on Arsenal',
        url: 'https://www.bbc.co.uk/sport/football/50226853',
        image: {
          height: 1152,
          width: 2048,
          href:
            'http://c.files.bbci.co.uk/134B1/production/_109452097_barboravotikovagetty.jpg',
          originCode: 'cpsprodpb',
          altText: 'Barbora Votikova',
          copyrightHolder: 'Getty Images',
          allowSyndication: true,
        },
      },
    ],
  },
];

storiesOf('Components|OnwardJourneys', module).add(
  'default',
  () => (
    <OnwardJourneys
      onwardJourneysData={onwardJourneysData}
      service="news"
      script={latin}
    />
  ),
  { notes },
);
