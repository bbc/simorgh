# Hindi Editorial Picks banner experiment

The server-side Optimizely experiment `newswb_ws_hindi_map_save_later_promo`
targets signed-out visitors on Hindi media articles tagged with the Editorial
Picks brand. The `registration_banner` variation shows the existing account
banner; all other variations show no additional banner. The experiment is
enabled for Hindi media articles in
`ws-nextjs-app/utilities/experimentHeader/enabledExperimentsList.ts`.

The Hindi title and description are provisional translations of the ticket's
English copy; the account action and close labels use existing Hindi
translations. The existing banner's dismissal limits also apply.

Server-side assignment may not include a visitor's first page view if the
required cookie has not yet been set.
