# WS Renderer

This is an early POC of a nextjs app that can be deployed to utilise 'Incremental Static Regeneration' in NextJS. The goal is deploy a highly performant version of our site where users never hit origin except for newly created content (and this origin call could be eliminated with 'On-demand Static Regeneration' to follow later).

It also utilises existing Simorgh components so as to practice 'evolutionary architecture', we gradually move towards to NextJS app without rebuilding all our React components from scratch. Gradually the original Express app goes out of use production.
