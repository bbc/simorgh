# Webpack

## Title

Justification for our Webpack setup and our removal of Razzle as a dependency.

## Status

Accepted

## Context

We need a vulnerability-free, isomorphic (client & server) application with excellent DX (Developer eXperience).

## Decision

Justification for removing Razzle: https://github.com/BBC-News/simorgh/issues/715

Summary:

1. Security vulnerability (see below)
2. Unable to upgrade dependencies (styled-components v4 and babel v7)
3. It's a black box (maintenance issue for us)

Explanation of Webpack implementation: https://github.com/BBC-News/simorgh/pull/1117

Summary:

- Created a webpack.config.client.js, webpack.config.server.js and webpack.config.js, the latter concerning base Webpack configuration and the former concerning specific Webpack configuration for the separate parts of the isomorphic application.
- We use a `.env` file at the root of the repository to populate the variables used by the application. These can be overridden on Jenkins in each respective promoted environment.

## Consequences

Industry-standard DX that has fewer vulnerabilities,
More maintainable codebase,
Frees us up to upgrade our dependencies
