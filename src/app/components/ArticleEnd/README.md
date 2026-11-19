# Clear article end prototype

Research spike for [WS-3523](https://bbc.atlassian.net/browse/WS-3523), under WS-3508. Not a live audience experiment.

## Behaviour

Mundo articles rendered by `ArticlePage` automatically show **FIN DEL ARTÍCULO**, a decorative circled tick and horizontal rules after the last top-level text block, before any subsequent blocks and onward-journey sections. The label comes from Mundo's service translations. Articles without text blocks have no marker.

The integration is allowlisted to `SIMORGH_APP_ENV=local` or `test`; Live and other services remain unchanged. Preview builds also use the Test application environment and therefore show the treatment. No activation parameter is needed. The marker sits inside the article, so the existing Continue reading behaviour also hides it until the final text is revealed. It is plain text, not a button, heading or live announcement.

## Run and navigate

Follow the repository's [setup instructions](../../../../README.md), then from the repository root:

```sh
yarn
yarn workspace simorgh-nextjs dev
```

For a local fixture with no remote article-data dependency, open:

- http://localhost:7081/mundo/articles/cv6n0064n5vo

The two suggested live articles can be read through the local renderer using the existing live-data override (requires the usual internal BFF configuration/network access):

- http://localhost:7081/mundo/articles/cwe9k0d7x9z0o?renderer_env=live
- http://localhost:7081/mundo/articles/c64gn38yj4ygo?renderer_env=live

Scroll to the final article paragraph. If Continue reading appears, expand it first. The marker separates the last text block from the remaining content; continue scrolling to navigate the existing onward journeys normally.

For an isolated preview, run `yarn storybook` and open **Components / ArticleEnd / Mundo**.

## Test deployment and UserZoom

Deploy this branch through the normal Test pipeline (`yarn workspace simorgh-nextjs build:test` is the build command). After deployment, use:

- https://www.test.bbc.com/mundo/articles/cwe9k0d7x9z0o?renderer_env=live
- https://www.test.bbc.com/mundo/articles/c64gn38yj4ygo?renderer_env=live

`renderer_env=live` selects article data, not the application environment: the treatment remains disabled in a Live deployment. There is no live deployment included in this spike.

Before sharing the URLs with UserZoom participants, verify Test access from their network, both article responses, mobile/desktop layout, the tick asset, and any consent overlays. Test links must be used instead of `www.bbc.com` links. Existing onward links may lead to Live and leave the prototype. Live editorial data can change during the study; arrange stable research fixtures if needed.

## Productionisation risks

- Replace the prototype environment/service gate with an agreed Optimizely eligibility/variation decision, retaining a control and kill switch. Keep server/client decisions consistent to avoid flicker or hydration differences.
- Agree an editorial definition of article end. The spike uses the last top-level `text` block, which may contain lists or promotional copy; trailing images, embeds, corrections or grouped text may need different placement. Media articles use a separate page component and are not changed.
- Confirm the Spanish wording with Mundo and research; add approved translations before enabling other services.
- No exposure, completion or interaction metric is added. Agree experiment metrics and attribution; the added spacing can affect existing scroll-depth/completion measurements.
- Validate screen readers, zoom/reflow, low-bandwidth devices and canonical/AMP/Lite/app layouts before rollout. The rules and tick are decorative; the text conveys the meaning without them. Formal accessibility review is outstanding.
- Review interaction with Continue reading, recommendations, ads and other end-of-article experiments. Test is shared: all Mundo article pages get this prototype, not only study URLs.

## Focused checks

From the repository root:

```sh
NODE_OPTIONS=--experimental-vm-modules yarn jest --selectProjects='Unit Tests' --runInBand --runTestsByPath src/app/components/ArticleEnd/index.test.tsx src/app/pages/ArticlePage/index.test.tsx
```
