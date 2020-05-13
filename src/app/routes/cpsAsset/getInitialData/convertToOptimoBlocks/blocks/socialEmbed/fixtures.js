export default {
  content: {
    blocks: [
      {
        text: 'Twitter',
        markupType: 'plain_text',
        type: 'paragraph',
      },
      {
        href: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
        source: 'twitter',
        type: 'social_embed',
        id: '1237210910835392512',
        embed: {
          oembed: {
            url: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
            author_name: 'Miley Ray Cyrus',
            author_url: 'https://twitter.com/MileyCyrus',
            html:
              '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Australia: Due to the recommendations of local, state, federal and international government authorities, including the Center for Disease Control, to reduce potential health risks in response to the current global health crisis, we are no longer traveling to Aus for the show.</p>&mdash; Miley Ray Cyrus (@MileyCyrus) <a href="https://twitter.com/MileyCyrus/status/1237210910835392512?ref_src=twsrc%5Etfw">March 10, 2020</a></blockquote>',
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
      {
        text: 'Twitter (Empty embedephant response)',
        markupType: 'plain_text',
        type: 'paragraph',
      },
      {
        href: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
        source: 'twitter',
        type: 'social_embed',
        id: '1237210910835392512',
      },
      {
        text: 'YouTube',
        markupType: 'plain_text',
        type: 'paragraph',
      },
      {
        href: 'https://youtu.be/chiWVxreqhU',
        source: 'youtube',
        type: 'social_embed',
        id: 'chiWVxreqhU',
        embed: {
          oembed: {
            author_name: 'BBC News Mundo',
            author_url: 'https://www.youtube.com/user/BBCMundo',
            title:
              'Protestas en Chile: las grietas del modelo económico chileno',
            html:
              '<iframe width="480" height="270" src="https://www.youtube.com/embed/chiWVxreqhU?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            width: 480,
            height: 270,
            thumbnail_height: 360,
            thumbnail_width: 480,
            thumbnail_url: 'https://i.ytimg.com/vi/chiWVxreqhU/hqdefault.jpg',
            type: 'video',
            provider_name: 'YouTube',
            provider_url: 'https://www.youtube.com/',
            version: '1.0',
          },
          fallback_image: {
            fallback_image_width: 500,
            fallback_image_height: 269,
            alt_text:
              'YouTube post by BBC News Mundo: Protestas en Chile: las grietas del modelo económico chileno',
          },
        },
      },
    ],
  },
};
