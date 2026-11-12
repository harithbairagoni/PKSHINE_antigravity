# Peacock Shine Private Limited &ndash; Corporate Consulting Website

A modern, professional corporate consulting and technology solutions website for **Peacock Shine Private Limited**, engineered with a clean, high-impact aesthetic modeled after leading international consulting firms (such as Akoya Solutions).

---

## 🏛️ Corporate Profile
- **Company Name:** PEACOCK SHINE PRIVATE LIMITED
- **Corporate Office:** No. 1889/1, First Floor, Chamalapura Street, 8th Ward, Nanjangud Town (Rural), Mysore, Mysore, Karnataka, India &ndash; 571301.
- **Official Email:** info@peacockshine.com
- **Official Phone:** +91 7569592985
- **Registered Domain:** peacockshine.com

---

## 📂 Project Architecture

```
peacock-shine-website/
├── index.html                  # Executive Homepage & Consulting Overview
├── about.html                  # About Us: Profile, Mission, Vision, Core Values, Expansion
├── solutions.html              # Dedicated sections for 6 Key Technology Solutions
├── services.html               # 6 Comprehensive Service Categories (Staffing, PMO, Dev)
├── industries.html             # 6 Industry Verticals (BFSI, Telecom, Healthcare, IT, Infra, Mfg)
├── contact.html                # Contact Hub: Corporate Office, Interactive Form, Map
├── css/
│   └── style.css               # Design system tokens, peacock gradients, card micro-interactions
├── js/
│   └── main.js                 # Sticky nav, mobile drawer, interactive tabs, form toast handler
├── images/
│   ├── peacock-shine-logo.svg        # Brand logo (Primary Light Variant)
│   └── peacock-shine-logo-white.svg  # Brand logo (Dark Footer/Hero Variant)
└── README.md                   # Documentation & Deployment Guide
```

---

## 🧭 Site Sections & Content Mapping

### 1. Main Navigation
- **Home:** Executive Hero banner, operational delivery matrix, quick-access solutions, services showcase, industry vertical matrix, and client delivery models.
- **ABOUT US:** Full corporate profile, vision & mission statements, 5 core values, and strategic expansion into infrastructure and engineering.
- **SOLUTIONS:**
  1. Mobile Application Development (iOS, Android, React Native, Flutter, MDM)
  2. Web Application Development (Cloud-native SPAs, microservices, APIs)
  3. ERP Solutions & Support (SAP, Oracle, Dynamics 365, migration, 24/7 SLA)
  4. Digital Transformation (Cloud migration, RPA, legacy modernization)
  5. Technology Consulting (Architecture, cybersecurity, DevSecOps, tech debt audits)
  6. Business Process Solutions (BPM, workflow automation, cost reduction)
- **SERVICES:**
  1. Application Development Services (Full SDLC, automated QA, SLA maintenance)
  2. IT Staffing & Resource Augmentation (Flexible talent, contract-to-hire, ODC)
  3. Project Management & Consulting (PMP/Scrum certified PMO governance)
  4. Professional Technology Services (Systems integration, cloud orchestration, DR/BCP)
  5. Enterprise Solutions (CRM, SCM, data warehousing, BI analytics)
  6. Business & Management Consulting (Strategic transformation, change management)
- **INDUSTRIES:**
  1. Banking, Financial Services & Insurance (BFSI)
  2. Communications & Payment Services
  3. Pharma, Life Sciences & Healthcare
  4. Information Technology & Software
  5. Infrastructure & Engineering *(Strategic Expansion Focus)*
  6. Manufacturing & Industrial Services (Industry 4.0, MES)
- **CONTACT US:**
  - Official postal address & phone contact.
  - Interactive inquiry form with live validation and toast notifications routed to `info@peacockshine.com`.
  - Regional location graphic & Google Maps link.

---

## 🚀 Local Development & Preview

To preview the website locally on your computer:

```bash
cd /Users/harith/.gemini/antigravity/scratch/peacock-shine-website
python3 -m http.server 8080
```

Then open your browser at **`http://localhost:8080`**.

---

## 🌐 Production Deployment & SSL Setup

### 1. Free SSL & Global CDN (Cloudflare Pages / Vercel / Netlify / Firebase)
- **Cloudflare Pages / Netlify / Vercel:** Simply push this repository to GitHub or upload the folder directly. An automatic SSL/TLS certificate (Let's Encrypt / DigiCert) is provisioned with 100% automated renewal.
- **Custom Domain:** In the DNS dashboard for `peacockshine.com`, add:
  - `CNAME` for `www` &rarr; `<your-project>.pages.dev` or `cname.vercel-dns.com`
  - `A` / `ALIAS` for `@` &rarr; Points to the hosting IP address.

### 2. Corporate Email Integration (`info@peacockshine.com`)
- Configure Google Workspace, Microsoft 365, or Zoho Mail MX records for `peacockshine.com`.
- For the website contact form, you can link it directly to:
  - **Formspree:** Change `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
  - **Web3Forms:** `<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">`
  - Or an internal API endpoint on your backend server.
