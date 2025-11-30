# Pulseboard Checklist

Use this checklist before merging major UI changes into `main` and before final release.

## Build + code quality
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] No console errors in normal usage
- [ ] No committed secrets (no `.env` or keys)

## Responsiveness
Check each at minimum:
- [ ] 375px (mobile)
- [ ] 768px (tablet)
- [ ] 1280px+ (desktop)

Validate:
- [ ] No horizontal overflow
- [ ] Sidebar behavior correct (desktop vs mobile)
- [ ] Table usable on mobile (no broken layout)

## Accessibility baseline
- [ ] Logical heading structure (page title is clear)
- [ ] Keyboard navigation works (Tab through sidebar + settings)
- [ ] Focus styles visible
- [ ] Buttons are buttons, links are links
- [ ] Inputs have labels (or accessible labeling)

## UI states
- [ ] Loading states exist for key widgets (simple is fine)
- [ ] Empty states exist (e.g., table has “No results”)
- [ ] Error state placeholder exists where data would fail (even with fake data)

## Visual polish
- [ ] Consistent spacing and typography
- [ ] Consistent button variants and hover states
- [ ] Chart and table styling match the rest of the UI
- [ ] No layout shift from media elements

## Release
- [ ] README has setup steps
- [ ] README includes screenshots
- [ ] Deployed link added to README (if deploying)
