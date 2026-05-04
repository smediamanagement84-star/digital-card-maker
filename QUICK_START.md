# Quick Start - May 5 Testing Guide

## 🎯 Priority: Test These First

### 1. Does it Load? (2 minutes)
Open: https://card-main-drab.vercel.app
- [ ] Page loads in under 3 seconds
- [ ] No errors in browser console (F12)
- [ ] Landing page looks good
- [ ] "Sign In" button visible

### 2. Can You Sign In? (2 minutes)
- [ ] Click "Sign In" or "Get Started"
- [ ] Google sign-in popup appears
- [ ] Select your Google account
- [ ] Redirects to dashboard
- [ ] You see the card editor

### 3. Can You Create a Card? (3 minutes)
- [ ] Enter your name
- [ ] Add a title (e.g., "Student at KU")
- [ ] Upload a photo
- [ ] Add email and social links
- [ ] Pick a theme
- [ ] Click "Save" or "Publish"
- [ ] Success message appears

### 4. Can You View Your Card? (1 minute)
- [ ] Copy your public URL (something like /d/your-name)
- [ ] Open in new browser tab (or incognito)
- [ ] Card displays correctly
- [ ] Works without being signed in

### 5. Does QR Code Work? (2 minutes)
- [ ] QR code visible on dashboard or card
- [ ] Scan with your phone camera
- [ ] Card opens on mobile
- [ ] Everything looks good on phone

---

## ✅ If All 5 Work: YOU'RE READY FOR HACKATHON!

---

## 🔧 If Something Breaks

### Build Error
```bash
cd C:\Users\DEll\Downloads\card-main\card-main
npm install
npm run build
```
If build succeeds locally → redeploy:
```bash
git push origin main
```

### Authentication Error
- Try incognito/private window
- Check Firebase Console (authorized domains)
- Try a different Google account
- Clear browser cache

### Card Not Saving
- Check browser console for errors
- Verify internet connection
- Check Firestore rules in Firebase Console
- Try different slug (unique usernames)

### QR Code Not Working
- Try a different QR scanner app
- Ensure HTTPS URL
- Check if production URL changed

---

## 📞 Quick Fixes

### Redeploy (if something is broken)
```bash
cd C:\Users\DEll\Downloads\card-main\card-main
git add .
git commit -m "Fix [describe issue]"
git push origin main
```
Vercel auto-deploys in ~30 seconds.

### Rollback to Previous Version
1. Go to: https://vercel.com/jarus-projects-079a93e4/card-main
2. Click "Deployments"
3. Find last working deployment
4. Click "..." → "Promote to Production"

### Check Build Logs
```bash
vercel logs
```
Or check Vercel Dashboard → Deployments → Click deployment → View logs

---

## 📱 Mobile Testing Shortcut

1. Open on phone: https://card-main-drab.vercel.app
2. Sign in with Google
3. Create card on phone (or desktop)
4. Test all features work on mobile
5. Share with friend to test public view

---

## 🎬 Demo Prep (10 minutes)

### Before Hackathon
1. [ ] Create demo account card
2. [ ] Use professional photo
3. [ ] Fill all fields with real data
4. [ ] Pick best theme
5. [ ] Test QR code scan
6. [ ] Print QR code (optional)
7. [ ] Rehearse 5-minute demo
8. [ ] Have backup screenshots

### Demo Flow
1. Show landing page
2. Sign in with Google
3. Walk through card creation
4. Show theme picker
5. Save and show public URL
6. Scan QR code live
7. Show card on mobile
8. Highlight key features

---

## 🐛 Known Issues (None Yet!)

_Any issues found during testing will be listed here_

---

## 📊 Quick Health Check

Open production URL and check:
- [ ] Browser: Chrome/Firefox/Edge/Safari
- [ ] Console: No errors (F12)
- [ ] Network: All requests succeed (Network tab)
- [ ] Performance: Page loads fast
- [ ] Mobile: Responsive design works

---

## 🚀 Deployment URLs

- **Production:** https://card-main-drab.vercel.app
- **Dashboard:** https://vercel.com/jarus-projects-079a93e4/card-main
- **GitHub:** https://github.com/smediamanagement84-star/digital-card-maker

---

## 📚 Full Documentation

- **TESTING_CHECKLIST.md** - Complete 150+ test cases
- **HACKATHON_DEMO.md** - Full presentation script
- **DEPLOYMENT.md** - Deployment guide
- **FEATURES.md** - All features explained

---

## ⏱️ Time Budget (May 5)

- **9:00 AM - 11:00 AM:** Core feature testing
- **11:00 AM - 1:00 PM:** Mobile and browser testing
- **1:00 PM - 3:00 PM:** Bug fixes (if needed)
- **3:00 PM - 5:00 PM:** Demo preparation
- **5:00 PM - 6:00 PM:** Final rehearsal

---

## 🎉 Success Criteria

- [ ] Can sign in
- [ ] Can create card
- [ ] Can save card
- [ ] Can view public card
- [ ] QR code works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Fast performance

**If all checked: READY FOR HACKATHON!** ✅

---

**Good luck tomorrow! You've got this!** 🚀

_(App is already deployed and working—just need to test everything works as expected)_
