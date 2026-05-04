# Testing Checklist - Digital Card Maker
**Test Date:** May 5, 2026
**Production URL:** https://card-main-drab.vercel.app
**Tester:** _______________

## Pre-Testing Setup

### Required Tools
- [ ] Desktop computer with modern browser (Chrome/Firefox/Edge)
- [ ] Mobile device (iOS or Android)
- [ ] Google account for authentication
- [ ] Internet connection
- [ ] Developer tools open (F12) to monitor console

### Test Accounts
- [ ] Personal Google account ready
- [ ] Backup Google account (for multi-user testing)

---

## 1. Landing Page Tests

### Desktop
- [ ] Page loads within 3 seconds
- [ ] Hero section displays correctly
- [ ] "Get Started" button visible and styled
- [ ] Navigation bar present and functional
- [ ] No console errors
- [ ] Smooth scroll animations work
- [ ] Footer visible (if present)

### Mobile
- [ ] Page responsive on small screens
- [ ] Text readable without zooming
- [ ] Buttons large enough to tap
- [ ] No horizontal scrolling
- [ ] Navigation menu works (hamburger if present)

### Performance
- [ ] Lighthouse score > 90
- [ ] Images load quickly
- [ ] No layout shifts
- [ ] Smooth animations (60fps)

---

## 2. Authentication Tests

### Google Sign-In (Desktop)
- [ ] Click "Sign In" or "Get Started"
- [ ] Google popup appears
- [ ] Can select Google account
- [ ] Popup closes after selection
- [ ] Redirects to dashboard
- [ ] User stays logged in after refresh
- [ ] Profile photo shows in navbar (if displayed)

### Google Sign-In (Mobile)
- [ ] Click "Sign In" button
- [ ] Redirects to Google sign-in page
- [ ] Can select account
- [ ] Redirects back to app
- [ ] Lands on dashboard
- [ ] Session persists after closing browser

### Popup Blocked Scenario
- [ ] Block popups in browser settings
- [ ] Try to sign in
- [ ] Should fall back to redirect flow
- [ ] Authentication completes successfully

### Sign Out
- [ ] Click "Sign Out" button
- [ ] Redirects to landing page
- [ ] Cannot access /dashboard anymore
- [ ] Must re-authenticate to access dashboard

---

## 3. Dashboard Tests

### Initial Load
- [ ] Dashboard loads after authentication
- [ ] Onboarding flow appears for new users
- [ ] UI is clean and organized
- [ ] No console errors
- [ ] Loading states work properly

### Onboarding (First-Time Users)
- [ ] Welcome message displays
- [ ] Instructions clear
- [ ] Can skip or complete onboarding
- [ ] Onboarding doesn't show again after completion

### Dashboard Layout
- [ ] Card preview panel visible
- [ ] Editing controls accessible
- [ ] Theme picker visible
- [ ] Save button prominent
- [ ] Responsive on tablet/mobile

---

## 4. Card Creation Tests

### Basic Information
- [ ] Can enter full name
- [ ] Can enter title/role
- [ ] Can enter bio/description
- [ ] Character limits enforced (if any)
- [ ] Input validation works
- [ ] Changes reflect in live preview

### Photo Upload
- [ ] Can click "Upload Photo" button
- [ ] File picker opens
- [ ] Can select JPG/PNG image
- [ ] Image uploads successfully
- [ ] Preview shows uploaded photo
- [ ] Photo appears in card preview
- [ ] Can change photo after upload
- [ ] Large images handled properly (compressed?)

### Contact Information
- [ ] Can add email address
- [ ] Can add phone number
- [ ] Can add website URL
- [ ] URL validation works
- [ ] Email format validated
- [ ] Fields optional (can be left blank)

### Social Links
- [ ] Can add LinkedIn profile
- [ ] Can add Twitter/X handle
- [ ] Can add Instagram handle
- [ ] Can add GitHub profile
- [ ] Can add custom links
- [ ] Invalid URLs show error
- [ ] Links appear in card preview

---

## 5. Theme & Customization Tests

### Theme Picker
- [ ] Multiple themes available
- [ ] Can click to select theme
- [ ] Preview updates immediately
- [ ] Theme colors apply correctly
- [ ] Text readable on all themes
- [ ] Theme selection saved

### Color Schemes
- [ ] Test each available theme:
  - [ ] Theme 1: _____________
  - [ ] Theme 2: _____________
  - [ ] Theme 3: _____________
  - [ ] Theme 4: _____________
  - [ ] Theme 5: _____________

### Preview
- [ ] Live preview updates in real-time
- [ ] Preview matches final card
- [ ] Preview responsive to changes
- [ ] Preview scrollable if content overflows

---

## 6. Card Save & Publish Tests

### Slug Creation
- [ ] Can enter custom slug/username
- [ ] Slug validation works (alphanumeric + hyphens)
- [ ] Duplicate slug shows error
- [ ] Slug must be unique
- [ ] Case-insensitive slug matching

### Save Card
- [ ] Click "Save" or "Publish" button
- [ ] Success message appears
- [ ] Card saves to Firestore
- [ ] No console errors
- [ ] Can edit and re-save
- [ ] Changes persist after refresh

### Card URL
- [ ] Public URL generated (/d/:slug)
- [ ] URL displayed clearly
- [ ] Can copy URL to clipboard
- [ ] Copy confirmation appears

---

## 7. Public Card View Tests

### Access Public Card
- [ ] Navigate to /d/:slug
- [ ] Card displays correctly
- [ ] Works without authentication
- [ ] Can share link with others
- [ ] Loads quickly

### Card Display
- [ ] Name displayed correctly
- [ ] Title/role shown
- [ ] Bio/description visible
- [ ] Photo loads and displays
- [ ] Theme applied correctly
- [ ] Social links clickable
- [ ] Contact info visible

### Mobile View
- [ ] Card responsive on mobile
- [ ] All text readable
- [ ] Image properly sized
- [ ] Links tappable
- [ ] No layout issues

---

## 8. QR Code Tests

### QR Generation
- [ ] QR code generated for card
- [ ] QR code visible in dashboard
- [ ] QR code visible on public card
- [ ] QR code scannable with phone camera

### QR Download
- [ ] Can download QR code as PNG
- [ ] Downloaded file opens correctly
- [ ] QR code high resolution
- [ ] Filename descriptive

### QR Scanning
- [ ] Scan QR with phone camera
- [ ] Redirects to public card URL
- [ ] Card displays on mobile
- [ ] All features work after scan

---

## 9. vCard Download Tests

### Download Button
- [ ] "Download vCard" button visible
- [ ] Button clickable
- [ ] Download starts immediately
- [ ] File downloads as .vcf

### vCard Content
- [ ] Open .vcf file
- [ ] Import to contacts (phone/computer)
- [ ] Name imported correctly
- [ ] Email imported correctly
- [ ] Phone imported correctly
- [ ] URL imported correctly
- [ ] Photo imported (if supported)

---

## 10. Network Panel & Sharing Tests

### Share Options
- [ ] Share button(s) visible
- [ ] Copy link works
- [ ] Share on social media (if implemented)
- [ ] Email share works (if implemented)

### Link Preview
- [ ] Shared links show preview on social media
- [ ] OG tags working (title, description, image)
- [ ] Preview looks professional

---

## 11. Error Handling Tests

### Network Errors
- [ ] Turn off WiFi
- [ ] Try to save card
- [ ] Error message appears
- [ ] User notified gracefully
- [ ] Can retry after reconnecting

### Invalid Data
- [ ] Submit empty required fields
- [ ] Validation errors shown
- [ ] Error messages clear
- [ ] Can correct and resubmit

### 404 Errors
- [ ] Navigate to /d/nonexistentslug
- [ ] 404 page or error message shown
- [ ] Can navigate back to home

### Firebase Errors
- [ ] Simulate auth failure
- [ ] Error handled gracefully
- [ ] User notified
- [ ] Can retry login

---

## 12. Performance Tests

### Load Times
- [ ] Landing page: < 2 seconds
- [ ] Dashboard: < 3 seconds
- [ ] Public card: < 2 seconds
- [ ] Image uploads: < 5 seconds

### Bundle Sizes
- [ ] Check Network tab in DevTools
- [ ] Total JS < 1MB (gzipped ~260KB)
- [ ] No unnecessarily large files
- [ ] Code splitting working

### Lighthouse Audit
Run Lighthouse in Chrome DevTools:
- [ ] Performance: _____ (target: >90)
- [ ] Accessibility: _____ (target: 100)
- [ ] Best Practices: _____ (target: >90)
- [ ] SEO: _____ (target: >90)

---

## 13. Browser Compatibility Tests

### Desktop Browsers
- [ ] Chrome (latest): ✅ / ❌
- [ ] Firefox (latest): ✅ / ❌
- [ ] Edge (latest): ✅ / ❌
- [ ] Safari (latest): ✅ / ❌

### Mobile Browsers
- [ ] Mobile Chrome: ✅ / ❌
- [ ] Mobile Safari: ✅ / ❌
- [ ] Mobile Firefox: ✅ / ❌

### Issues Found
_Document any browser-specific issues:_

---

## 14. Security Tests

### Console Check
- [ ] No sensitive data in console
- [ ] No API keys exposed
- [ ] No user credentials logged
- [ ] CSP warnings (acceptable if from Firebase)

### Network Tab
- [ ] All requests over HTTPS
- [ ] No mixed content warnings
- [ ] Firebase requests authenticated
- [ ] No CORS errors

### Headers Check
Open DevTools > Network > Click any resource:
- [ ] HSTS header present
- [ ] CSP header present
- [ ] X-Frame-Options present
- [ ] X-Content-Type-Options present

---

## 15. Multi-User Tests

### Create Multiple Cards
- [ ] User A creates card with slug "userA"
- [ ] User B creates card with slug "userB"
- [ ] Both cards accessible
- [ ] No data leakage between users
- [ ] Each user sees only their own dashboard

### Slug Uniqueness
- [ ] User A creates card with slug "test"
- [ ] User B tries to create card with slug "test"
- [ ] Should fail with error message
- [ ] User B can choose different slug

---

## 16. Edge Cases & Stress Tests

### Long Content
- [ ] Enter very long name (100+ chars)
- [ ] Enter very long bio (1000+ chars)
- [ ] Layout still works
- [ ] Text truncated or scrollable

### Special Characters
- [ ] Enter emojis in name 👨‍💼
- [ ] Enter special chars: é, ñ, 中文
- [ ] Text displays correctly
- [ ] No encoding issues

### Large Images
- [ ] Upload 10MB+ image
- [ ] Should compress or show error
- [ ] No app crash
- [ ] User notified if too large

### Rapid Actions
- [ ] Click save button multiple times rapidly
- [ ] Should not create duplicate cards
- [ ] Loading state prevents double-submit

---

## 17. Mobile-Specific Tests

### Touch Interactions
- [ ] All buttons tappable
- [ ] No accidental taps
- [ ] Scrolling smooth
- [ ] Pinch-to-zoom works (if allowed)

### Keyboard
- [ ] Mobile keyboard appears for inputs
- [ ] Keyboard doesn't cover input fields
- [ ] "Done" button works
- [ ] Can switch between fields

### Rotation
- [ ] Rotate to landscape
- [ ] Layout adapts correctly
- [ ] No content cutoff
- [ ] Rotate back to portrait works

---

## 18. Accessibility Tests

### Keyboard Navigation
- [ ] Can tab through all inputs
- [ ] Focus indicators visible
- [ ] Can submit forms with Enter
- [ ] Can close modals with Escape

### Screen Reader
- [ ] Turn on screen reader (VoiceOver/TalkBack)
- [ ] All buttons announced
- [ ] Form labels read correctly
- [ ] Navigation makes sense

### Color Contrast
- [ ] Text readable on all backgrounds
- [ ] Meets WCAG AA standards
- [ ] Color not sole indicator

---

## 19. Hackathon Demo Prep

### Demo Flow
- [ ] Landing page demo-ready
- [ ] Sample card prepared
- [ ] Demo account created
- [ ] No test data visible
- [ ] Professional appearance

### Talking Points
- [ ] Feature list clear
- [ ] Use cases identified
- [ ] Value proposition ready
- [ ] Tech stack highlights prepared

---

## 20. Final Production Check

### Before Launch
- [ ] All critical bugs fixed
- [ ] Documentation complete
- [ ] Deployment guide tested
- [ ] Rollback plan ready
- [ ] Contact info accessible

### Go/No-Go Criteria
- [ ] Core features working: ✅ / ❌
- [ ] Authentication reliable: ✅ / ❌
- [ ] No critical console errors: ✅ / ❌
- [ ] Mobile responsive: ✅ / ❌
- [ ] Fast performance: ✅ / ❌

### Launch Decision
- [ ] ✅ **READY FOR HACKATHON**
- [ ] ❌ **NEEDS MORE WORK**

---

## Issues Found

| # | Issue Description | Severity | Status | Notes |
|---|------------------|----------|--------|-------|
| 1 |                  | Critical/High/Medium/Low |        |       |
| 2 |                  |          |        |       |
| 3 |                  |          |        |       |

**Severity Levels:**
- **Critical:** Blocks core functionality, must fix before launch
- **High:** Major feature broken, fix before hackathon
- **Medium:** Minor issue, fix if time permits
- **Low:** Enhancement, can defer

---

## Test Summary

**Total Tests:** ~150+
**Passed:** _____
**Failed:** _____
**Blocked:** _____

**Overall Status:** ✅ PASS / ⚠️ PASS WITH ISSUES / ❌ FAIL

**Tester Signature:** _______________
**Date:** May 5, 2026
**Time:** _____

**Ready for KU Hackathon:** YES / NO

---

**Notes:**
Use this checklist systematically on May 5, 2026. Test on multiple devices and browsers. Document all issues for quick fixes before the hackathon on May 6.
