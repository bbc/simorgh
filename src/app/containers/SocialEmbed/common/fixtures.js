export const cpsTwitterBlockNoEmbed = {
  type: 'twitter',
  indexOfType: 1,
  model: {
    href: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
    id: '1237210910835392512',
  },
  id: 'd5bccd4e-60ae-471d-adcc-9de0f9a6c1c7',
  position: [27, 1],
};

export const cpsTwitterBlock = {
  type: 'twitter',
  indexOfType: 1,
  model: {
    href: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
    id: '1237210910835392512',
    embed: {
      oembed: {
        indexOfType: 1,
        url: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
        author_name: 'Miley Ray Cyrus',
        author_url: 'https://twitter.com/MileyCyrus',
        html:
          '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Australia: Due to the recommendations of local, state, federal and international government authorities, including the Center for Disease Control, to reduce potential health risks in response to the current global health crisis, we are no longer traveling to Aus for the show.</p>&mdash; Miley Ray Cyrus (@MileyCyrus) <a href="https://twitter.com/MileyCyrus/status/1237210910835392512?ref_src=twsrc%5Etfw">March 10, 2020</a></blockquote>\n',
        width: 550,
        height: null,
        type: 'rich',
        cache_age: '3153600000',
        provider_name: 'Twitter',
        provider_url: 'https://twitter.com',
        version: '1.0',
      },
      fallback_image: {
        fallback_image_width: 465,
        fallback_image_height: 279,
        alt_text:
          'Twitter post by Miley Ray Cyrus: Australia: Due to the recommendations of local, state, federal and international government authorities, including the Center for Disease Control, to reduce potential health risks in response to the current global health crisis, we are no longer traveling to Aus for the show.',
      },
    },
  },
  id: 'c063a42a-53f9-4421-ba8d-db7ffbd2bfe6',
  position: [25, 1],
};

export const twitterBlock = {
  type: 'renditions',
  model: {
    locator: 'urn:bbc:optimo:social:619df6aa-8abf-4e4d-baf1-189b0106f2fa',
    blocks: [
      {
        type: 'aresOEmbed',
        model: {
          oembed: {
            indexOfType: 1,
            version: '1.0',
            author_name: 'BBC Pidgin',
            author_url: 'https://twitter.com/bbcnewspidgin',
            provider_name: 'Twitter',
            provider_url: 'https://twitter.com',
            url: 'https://twitter.com/bbcnewspidgin/status/1401130492313866243',
            html:
              '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Logan Paul vs Mayweather: Date, time and how to watch di fight.<br><br>Wen dis Youtuber &amp; Former professional boxer jam dis weekend, wetin you think say go happun?<br><br>Read more here: <a href="https://t.co/mLHxByELjA">https://t.co/mLHxByELjA</a> <a href="https://t.co/lp7GmXfGTF">pic.twitter.com/lp7GmXfGTF</a></p>&mdash; BBC Pidgin (@bbcnewspidgin) <a href="https://twitter.com/bbcnewspidgin/status/1401130492313866243?ref_src=twsrc%5Etfw">June 5, 2021</a></blockquote>\n',
            width: 550,
          },
        },
      },
    ],
  },
};

export const twitterBlockNoEmbed = {
  type: 'renditions',
  model: {
    locator: 'urn:bbc:optimo:social:619df6aa-8abf-4e4d-baf1-189b0106f2fa',
    blocks: [
      {
        type: 'aresOEmbed',
      },
    ],
  },
};
