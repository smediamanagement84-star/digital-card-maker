# Hackathon Demo Script - Digital Card Maker
**Event:** KU Hackathon 2026
**Date:** May 6, 2026
**URL:** https://card-main-drab.vercel.app

---

## Elevator Pitch (30 seconds)

"Digital Card Maker is a free web app that lets students and professionals create beautiful, shareable digital ID cards in under 2 minutes. No design skills needed. Just sign in with Google, customize your card, and share via QR code or link. Perfect for hackathons, conferences, networking events, or campus life."

---

## Demo Flow (3-5 minutes)

### 1. Landing Page (15 seconds)
**What to show:**
- Open https://card-main-drab.vercel.app
- Highlight clean, professional design
- Point out key benefits

**What to say:**
"This is Digital Card Maker. It's completely free and works on any device. No sign-up friction—just Google sign-in and you're ready to go."

---

### 2. Authentication (15 seconds)
**What to do:**
- Click "Get Started" or "Sign In"
- Sign in with Google account
- Show quick authentication

**What to say:**
"One-click sign-in with your university Google account. No passwords to remember. Works on mobile with automatic redirect for better compatibility."

---

### 3. Dashboard & Card Creation (2 minutes)
**What to do:**
- Show dashboard layout
- Walk through card creation:
  - Enter name: "Sakar Sharma"
  - Add title: "Computer Science Student | KU '26"
  - Upload photo (have one ready!)
  - Add bio: "Passionate about AI and web development. Building tools to connect people."
  - Add social links:
    - Email: sakar@ku.edu
    - LinkedIn: linkedin.com/in/sakar
    - GitHub: github.com/sakar

**What to say:**
"Creating a card takes less than 2 minutes. Just fill in your details, upload a photo, and pick a theme. Everything updates in real-time in the preview on the right."

**Demo Tips:**
- Type naturally but quickly
- Show live preview updating
- Point out user-friendly interface

---

### 4. Theme Customization (30 seconds)
**What to do:**
- Click through 3-5 different themes
- Show how colors change instantly
- Pick a professional theme

**What to say:**
"We have multiple themes to match your personality or brand. Everything from professional to playful. Just click and see the change instantly."

---

### 5. Save & Publish (20 seconds)
**What to do:**
- Enter custom slug: "sakar-ku"
- Click "Save" or "Publish"
- Show success message
- Display public URL

**What to say:**
"Pick your custom URL—like card-maker.app/d/sakar-ku—and publish. Your card is now live and shareable with anyone."

---

### 6. Public Card View (30 seconds)
**What to do:**
- Open public card URL (/d/sakar-ku)
- Show it works without login
- Show mobile responsiveness (resize browser or use phone)

**What to say:**
"This is what others see when you share your card. Clean, professional, mobile-optimized. No login required to view. Perfect for networking."

---

### 7. QR Code & Sharing (30 seconds)
**What to do:**
- Show QR code on dashboard or card
- Open phone and scan QR code
- Card opens on mobile instantly

**What to say:**
"The coolest part—scan this QR code with any phone camera, and your card opens instantly. Print it on business cards, conference badges, or display it on your laptop. People can save your contact with one tap."

**Demo Tips:**
- Have QR code pre-generated
- Test QR scan before demo
- Show how fast it works

---

### 8. vCard Download (20 seconds)
**What to do:**
- Click "Download vCard" or "Add to Contacts"
- Show downloaded .vcf file
- Quick import to contacts (if time)

**What to say:**
"Recipients can download your vCard and import directly to their phone contacts. All your info—email, phone, social links—imports automatically."

---

### 9. Wrap-Up & Use Cases (30 seconds)
**What to say:**
"Digital Card Maker is perfect for:
- **Students:** Networking at hackathons and career fairs
- **Professionals:** Business networking events
- **Organizations:** Campus clubs, conferences, meetups
- **Events:** Check-in badges with QR codes

It's free, fast, and works on any device. No app install required—it's a Progressive Web App."

---

## Key Features to Highlight

### Technical Highlights
- **Lightning Fast:** Built with React 19 + Vite
- **Secure:** Firebase Auth + Firestore, HTTPS enforced
- **Scalable:** Vercel hosting, handles thousands of users
- **Mobile-First:** Responsive design, works on all devices
- **Offline-Ready:** PWA capabilities (if enabled)
- **Real-Time:** Instant preview updates

### User Benefits
- **Free Forever:** No hidden costs
- **No Installation:** Works in browser
- **Privacy-Focused:** Only stores what you enter
- **Shareable:** QR codes + direct links
- **Professional:** Multiple themes, looks great
- **Fast Setup:** Under 2 minutes to create

---

## Demo Preparation Checklist

### Before Demo
- [ ] Test internet connection
- [ ] Open demo URL in browser
- [ ] Sign in with demo account
- [ ] Have sample data ready to type
- [ ] Have demo photo ready (professional headshot)
- [ ] Test QR code scanning
- [ ] Charge phone for QR demo
- [ ] Clear browser cache (for fresh load)
- [ ] Close unnecessary tabs
- [ ] Turn off notifications
- [ ] Set browser to 150% zoom (if presenting on large screen)

### Demo Account
- [ ] Create dedicated demo account
- [ ] Pre-populate some data (optional)
- [ ] Have backup account ready
- [ ] Know login credentials

### Backup Plans
- [ ] Screenshot of each step (in case internet fails)
- [ ] Video recording of full demo (as fallback)
- [ ] Printed slides with screenshots
- [ ] Mobile hotspot ready

---

## Q&A Preparation

### Common Questions

**Q: Is it really free?**
A: Yes, completely free. No ads, no premium tier. Built for students and professionals who need simple, effective digital cards.

**Q: Where is data stored?**
A: Google Firebase (Firestore), a secure, industry-standard cloud database. Only you can edit your card. Cards are publicly readable via their unique URL.

**Q: Can I customize the design more?**
A: Currently, you can choose from pre-designed themes and customize colors. Custom CSS coming in future updates based on user feedback.

**Q: Does it work offline?**
A: Card viewing works offline after first load (if PWA enabled). Editing requires internet connection to save to database.

**Q: Can I have multiple cards?**
A: Currently one card per account. Multi-card support planned for future release.

**Q: Can I delete my card?**
A: Yes, delete option available in dashboard settings.

**Q: What about privacy?**
A: You control what information you share. Don't include sensitive data. Cards are public once published. Authentication required to edit.

**Q: Can I use a custom domain?**
A: Not currently, but you can share the card-maker.app/d/your-slug URL. Custom domains in future version.

**Q: How many people can use it?**
A: Unlimited. Firebase and Vercel scale automatically to handle any traffic.

**Q: Is the code open-source?**
A: Currently private repository. Open-source release under consideration.

---

## Technical Q&A (For Judges/Developers)

**Q: What's the tech stack?**
A: Frontend: React 19, TypeScript, Vite, Tailwind CSS v4. Backend: Firebase Auth + Firestore. Hosting: Vercel. Routing: React Router v7.

**Q: Why Vercel over Netlify?**
A: Both are excellent. We migrated to Vercel for this hackathon to demonstrate deployment flexibility and take advantage of Vercel's edge network and analytics.

**Q: How do you handle unique slugs?**
A: Firestore transaction with a separate `usernames` collection that reserves slugs atomically. Prevents race conditions and ensures uniqueness.

**Q: Why disable the service worker?**
A: During rapid iteration (hackathons, demos), aggressive SW caching can prevent users from seeing fresh deploys. We prioritize fresh content over offline support for this use case.

**Q: How do you handle image uploads?**
A: Currently data URLs (base64) for simplicity. For production scale, would migrate to Firebase Storage or Cloudinary with CDN.

**Q: What about rate limiting?**
A: Firebase has built-in rate limiting. For production, would add explicit rate limiting rules in Firestore security rules.

**Q: Security concerns?**
A: Firebase API keys are safe to expose (client SDK). Firestore rules enforce authorization. HTTPS enforced. CSP headers prevent XSS. Auth required to modify cards.

---

## Storytelling Elements

### Origin Story
"I built this because at our last hackathon, I spent 20 minutes manually typing contact info from paper business cards into my phone. I thought—there has to be a better way. Digital Card Maker was born to solve this exact problem."

### User Story
"Imagine you're at a career fair. Instead of fumbling with paper cards, you just show your QR code on your phone or laptop. Recruiters scan it, get all your info instantly, and can contact you immediately. No lost business cards, no mistyped emails."

### Impact Vision
"Our goal is to make networking effortless. At KU alone, there are hundreds of events per year where people exchange contact info. This app could save thousands of hours and countless lost connections."

---

## Post-Demo Actions

### Call to Action
"Try it now! Scan this QR code or visit card-main-drab.vercel.app. Create your card in under 2 minutes. Share it with everyone here."

### Feedback Collection
- Ask audience to create cards
- Collect feedback on features
- Note requested improvements
- Gather email list for updates

### Social Media
- Post screenshots on Twitter/LinkedIn
- Use hashtag #KUHackathon2026
- Tag relevant accounts
- Share demo video

---

## Timing Breakdown

| Section | Duration | Cumulative |
|---------|----------|------------|
| Intro & Landing | 15s | 0:15 |
| Authentication | 15s | 0:30 |
| Card Creation | 2min | 2:30 |
| Theme Customization | 30s | 3:00 |
| Save & Publish | 20s | 3:20 |
| Public Card View | 30s | 3:50 |
| QR Code Demo | 30s | 4:20 |
| vCard Download | 20s | 4:40 |
| Wrap-Up | 30s | 5:10 |
| **Total** | **~5min** | |

**Buffer:** Aim for 4-5 minutes. Leave 1-2 minutes for questions.

---

## Success Metrics

### During Hackathon
- Number of cards created
- QR scans performed
- Social shares
- Positive feedback
- Follow-up questions

### After Hackathon
- Continued usage
- Word-of-mouth growth
- Feature requests
- Partnership opportunities

---

## Confident Closing

"Digital Card Maker is production-ready, battle-tested, and already making networking easier. Whether you're a student looking for internships, a professional building your network, or an event organizer managing attendees—this tool is for you. Thank you!"

---

**Prepared by:** Claude Sonnet 4.5
**Date:** May 4, 2026
**Status:** Ready for Demo ✅

**Break a leg at the hackathon!** 🚀
