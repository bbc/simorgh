# PromotionalBanner Component

This component displays a promotional banner with configurable title, description, and action buttons. It is designed to be service-aware and supports customisation via service config.

## Usage

Import and use the component in your page or story:

```tsx
import PromotionalBanner from './PromotionallBanner';
```

## Props

- `title`: string
- `description`: string
- `orText`: string
- `primaryButton`: { text: string, longText?: string, onClick: () => void }
- `secondaryButton`: { text: string, longText?: string, onClick: () => void }
- `isDismissible?`: boolean
- `handleClose`: () => void

## Service Config

The banner can be configured via the service config file (`src/app/lib/config/services/<service>.ts`).

## Storybook

See `index.stories.tsx` for usage examples in Storybook.

---

For more details, see the code and service config documentation.
