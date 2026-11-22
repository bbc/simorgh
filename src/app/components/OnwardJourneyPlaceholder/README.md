# Description

Displays a non-announcing loading skeleton and requests an article onward journey
when the placeholder approaches the viewport.

Each instance has its own viewport target. Instances requesting the same journey
share a single promise and keep their skeletons until that request completes.
