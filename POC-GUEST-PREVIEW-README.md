# Temporary Guest My News POC

This POC implements a temporary signed-in preview experience for guest users to test the hypothesis that allowing non-registered users to build a temporary My News experience will increase BBC account registrations.

## Features Implemented

### 1. Enhanced Save Button for Guests
- **Location**: `src/app/components/SaveArticleButton/SaveArticleButtonGuestWithPreview/`
- **Features**:
  - Hover tooltip on save button with info: "Save this article for later. It will appear in your My News page."
  - Save/unsave functionality using localStorage
  - Confirmation notification after saving with link to My News
  - Visual feedback showing saved state

### 2. Temporary Article Storage
- **Location**: `src/app/hooks/useTemporarySavedArticles/`
- **Features**:
  - Stores articles in browser localStorage
  - 2-day expiry period
  - Auto-cleanup on expiry
  - Tracks save timestamp and article metadata

### 3. Temporary My News Page
- **Location**: `ws-nextjs-app/pages/[service]/my-news/MyNewsPage/MyNewsPageTemporary/`
- **Features**:
  - Displays saved articles in a grid
  - Prominent banner explaining temporary nature
  - Shows countdown to expiry
  - Prompts for registration/sign-in with call-to-action buttons
  - Integrates with existing AccountActionButtons component

### 4. Integration Points
- **Article Pages**: Save button now uses `enableGuestPreview` prop to activate POC
- **My News Page**: Automatically shows temporary view when user has saved articles but isn't signed in
- **Smooth transition**: When user signs in, they see their temporary saves migrate to permanent storage

## Usage

### Enable on Article Pages
The POC is enabled by default on article pages. The `SaveArticleButton` component accepts an `enableGuestPreview` prop:

```tsx
<SaveArticleButton
  saveArticlePageData={extractSaveArticleProps(articlePageData)}
  enableGuestPreview={true}
/>
```

### User Flow

1. **Article with Save Button**
   - Guest user sees "Save for later" button
   - Hovering shows tooltip explaining the feature

2. **Clicking Save**
   - Article is saved to localStorage
   - Confirmation notification appears with "View My News" link

3. **Visiting My News Page**
   - Shows temporary My News page with:
     - Banner: "This is a temporary page available for 2 days"
     - Expiry countdown
     - Sign in / Register buttons
     - Grid of saved articles

4. **Registration/Sign-in**
   - User clicks register or sign in
   - Completes account creation
   - Returns to My News with personalized experience
   - (Future enhancement: migrate temporary saves to permanent account)

## Technical Details

### Data Storage
- **Key**: `bbc_temp_saved_articles`
- **Expiry Key**: `bbc_temp_saved_articles_expiry`
- **Format**: JSON array of article objects
- **Lifecycle**: 2 days from first save

### Article Data Structure
```typescript
{
  id: string;
  title: string;
  link: string;
  imageUrl?: string;
  imageAlt?: string;
  promoImage?: string;
  type: string;
  description: string;
  savedAt: number;
}
```

### Components Reused
- `SaveButton` - Base save button component
- `CurationGrid` - Displays article grid
- `AccountActionButtons` - Sign in/register buttons
- `AccountSignInModal` - Modal for guest save (original flow)
- `Heading`, `Text`, `CallToActionLink` - UI primitives

## Files Created/Modified

### New Files
- `src/app/hooks/useTemporarySavedArticles/index.ts`
- `src/app/components/SaveArticleButton/SaveArticleButtonGuestWithPreview/index.tsx`
- `src/app/components/SaveArticleButton/SaveArticleButtonGuestWithPreview/SaveButtonTooltip.tsx`
- `src/app/components/SaveArticleButton/SaveArticleButtonGuestWithPreview/SaveArticleConfirmation.tsx`
- `ws-nextjs-app/pages/[service]/my-news/MyNewsPage/MyNewsPageTemporary/index.tsx`

### Modified Files
- `src/app/components/SaveArticleButton/index.tsx` - Added `enableGuestPreview` prop
- `ws-nextjs-app/pages/[service]/my-news/MyNewsPage/index.tsx` - Added conditional rendering for temporary view
- `src/app/pages/ArticlePage/ArticlePage.tsx` - Enabled guest preview on article pages

## Future Enhancements

1. **Migration on Sign-in**: - Automatic transfer of temporary saves to permanent UAS storage
2. **Analytics**: Track conversion rates from temporary saves to registrations
3. **Recommendations**: Show personalized recommendations based on temporary saves
4. **Persistence Warning**: Show warning before expiry (e.g., "1 hour left")
5. **Cross-device**: Sync temporary saves using anonymous token
6. **Topic/Place Following**: Extend to topics and places, not just articles

## ✨ Automatic Migration to Permanent Storage

### Overview
When a guest user with temporary saved articles signs in or registers, their articles are **automatically migrated** to permanent UAS storage with zero user action required!

### New Components for Migration

**Migration Hook** (`useTemporarySavesMigration`):
- `src/app/hooks/useTemporarySavesMigration/index.ts`
- Automatically triggers on sign-in
- Migrates all temporary articles to UAS
- Clears localStorage after success

**Success Banner** (`MigrationSuccessBanner`):
- `ws-nextjs-app/pages/[service]/my-news/MyNewsPage/MigrationSuccessBanner/index.tsx`
- Green success banner
- Auto-hides after 10 seconds

### Migration Flow

```
1. Guest saves articles → localStorage
2. Signs in/registers → Account created
3. Returns to My News → Migration triggers automatically
4. Loading state (1-2 seconds) → Migrating articles to UAS
5. Success banner appears → "Your articles have been saved!"
6. Permanent My News → All articles now in UAS
```

### What Gets Migrated

- Article ID, title, and link
- Promo image and alt text
- Service context
- All metadata needed for display

### Error Handling

- Individual failures don't stop migration
- Successful articles still saved
- Errors logged to console
- User sees successfully migrated content

[copilot]

## Testing

This POC does not include test suites . For manual testing:

1. Open any article page as a guest user
2. Hover over the save button to see tooltip
3. Click save and verify confirmation appears
4. Navigate to My News page
5. Verify temporary banner and articles display
6. Wait 2 days or manually clear localStorage to test expiry
7. Sign in to test transition (saves will not migrate in POC)

[copilot]
