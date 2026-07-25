# 🇵🇰 SehatAI Pakistan — AI-Powered Healthcare & Teleconsultation Platform

[![GitHub Repo](https://img.shields.io/badge/GitHub-fa19m2mr02--creator%2FSehatAI--Pakistan-10b981?style=for-the-badge&logo=github)](https://github.com/fa19m2mr02-creator/SehatAI-Pakistan)
[![License](https://img.shields.io/badge/License-Apache_2.0-0284c7?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Gemini API](https://img.shields.io/badge/Google_Gemini-3.6_Flash-8e44ad?style=for-the-badge&logo=google)](https://ai.google.dev)

**SehatAI Pakistan** is Pakistan's premier AI-powered healthcare platform designed specifically for the Pakistani medical ecosystem. It bridges the gap between digital AI triage, PMDC-verified teleconsultations, laboratory report analysis, hospital emergency tracking, and government Sehat Card health insurance coverage.

---

## 🌟 Key Features

### 🩺 1. AI Symptom Triage Assistant (Urdu & English)
* **Real-time AI Assessment:** Powered by Google's `gemini-3.6-flash` model, evaluating user symptoms in plain English, Urdu, or Roman Urdu.
* **Regional Disease Context:** Specialized awareness of prevalent regional illnesses in Pakistan (e.g., Dengue Fever, Typhoid, Malaria, Gastroenteritis, Heatstroke, COVID-19, Diabetes, and Hypertension).
* **Urgency Stratification:** Instant color-coded urgency levels (`EMERGENCY`, `URGENT`, `MODERATE`, `LOW`).
* **Clinical Guidance:** Provides PMDC specialist recommendations, safe immediate home care instructions (e.g., ORS, hydration, temperature monitoring), emergency red flags, and doctor consultation checklists.

### 🔬 2. AI Lab Report & Prescription Reader (نسخہ)
* **Smart Medical Document Explainer:** Upload or paste lab reports (CBC, HbA1c, Typhoid/Widal/Typhidot, Dengue NS1/Platelets, LFT, Lipid Profile, Urine RE) or doctor prescription photos.
* **Bilingual Findings:** Translates complex biomarker values into easy-to-understand English and Urdu explanations.
* **Actionable Advice:** Includes dietary guidelines, lifestyle recommendations, and follow-up consultation guidance.

### 👨‍⚕️ 3. PMDC Verified Doctor Directory & Teleconsultation
* **Verified Directory:** Search and filter PMDC-registered specialists across major Pakistani cities (Karachi, Lahore, Islamabad, Peshawar, Quetta, Multan, Faisalabad, Rawalpindi).
* **Multi-Parametric Filtering:** Filter doctors by specialty, city, consultation fee (PKR), gender, spoken languages (Urdu, English, Pashto, Punjabi, Sindhi), and Sehat Card acceptance.
* **Seamless Booking:** Interactive modal for scheduling video consultations with instant slot selection and local payment option previews (JazzCash, EasyPaisa, Bank Cards).

### 🏥 4. Hospital & ICU Emergency Directory
* **Trauma Center Database:** Browse leading public and private hospitals across Pakistan (e.g., Aga Khan University Hospital, Shaukat Khanum, Mayo Hospital, PIMS Islamabad, Lady Reading Hospital Peshawar, AKCMH Muzaffarabad).
* **Real-time ER Specs:** View bed capacities, 24/7 Emergency Room status, ICU ventilator availability, and Sehat Card paneling.

### 💳 5. Sehat Card Plus CNIC Eligibility Checker
* **Instant CNIC Verification:** Check universal health coverage eligibility for Qaumi Sehat Card Punjab, Sehat Card Plus KP, Sehat Sahulat ICT, Balochistan, GB, AJK, and Sindh.
* **Coverage Breakdown:** Displays annual family limits (PKR 1,000,000), 100% cashless covered procedures (Cardiology, Cancer, Dialysis, Maternity, ER Trauma), and government SMS verification instructions (8500).

### 🚨 6. 24/7 Emergency Hotline & Family SOS Dispatcher
* **National Emergency Hotlines:** Direct dial links for Rescue 1122, Edhi 115, Chhipa 1020, Aman Ambulance, and Police 15.
* **City ER Direct Lines:** Quick access phone numbers for major hospital casualty departments.
* **First Aid & CPR Guide:** Step-by-step Basic Life Support (BLS) instructions in English and Urdu.
* **Family SOS Dispatcher:** One-click emergency alert builder generating pre-formatted WhatsApp and SMS distress messages with live location details.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19, TypeScript |
| **Styling** | Tailwind CSS v4, Lucide React Icons, Motion |
| **Backend Runtime** | Node.js, Express.js |
| **AI SDK** | `@google/genai` (Gemini 3.6 Flash) |
| **Development Tooling** | Vite 6, `tsx` server runner |
| **Production Build** | `esbuild` bundled CJS server (`dist/server.cjs`) |

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm** or **bun** / **yarn**
* **Google Gemini API Key** (optional for AI features; fallback mock analysis is available offline)

### 1. Clone the Repository
```bash
git clone https://github.com/fa19m2mr02-creator/SehatAI-Pakistan.git
cd SehatAI-Pakistan
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root (refer to `.env.example`):
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
NODE_ENV=development
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Express backend with Vite HMR middleware on port `3000` |
| `npm run build` | Compiles Vite frontend assets and bundles `server.ts` into `dist/server.cjs` via `esbuild` |
| `npm start` | Runs the compiled production server (`node dist/server.cjs`) |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Removes build artifacts (`dist/`) |

---

## 📂 Project Structure

```
SehatAI-Pakistan/
├── src/
│   ├── components/          # UI Components
│   │   ├── Header.tsx           # Top navigation bar with language toggle & emergency trigger
│   │   ├── Hero.tsx             # Main hero section with quick triage input & key stats
│   │   ├── AiTriageSection.tsx  # Interactive AI symptom triage portal
│   │   ├── AiLabAnalyzer.tsx    # Lab report & doctor prescription reader
│   │   ├── DoctorDirectory.tsx  # PMDC verified doctor directory & booking modal
│   │   ├── HospitalDirectory.tsx# Hospital & ICU availability finder
│   │   ├── SehatCardSection.tsx # Sehat Card CNIC eligibility checker
│   │   ├── EmergencyModal.tsx   # Emergency 1122 hotlines, First Aid, and Family SOS
│   │   ├── PricingSection.tsx   # Subscription packages & teleconsultation plans
│   │   ├── Testimonials.tsx     # Verified patient & doctor reviews
│   │   └── Footer.tsx           # Footer links & emergency disclaimer
│   ├── data/                # Mock data & localized translations
│   │   ├── pakistanData.ts      # Doctor listings, hospital specs, emergency hotlines
│   │   └── translations.ts      # Bilingual English & Urdu UI text
│   ├── App.tsx              # Root React component
│   ├── main.tsx             # Frontend entry point
│   └── types.ts             # Global TypeScript interface definitions
├── server.ts                # Express server with Gemini API routes
├── package.json             # Project manifests & scripts
├── vite.config.ts           # Vite configuration
└── README.md                # Project documentation
```

---

## 🔒 Security & Medical Disclaimer

> **Disclaimer:** SehatAI Pakistan is an AI-assisted health navigation and triage tool created for informational and educational purposes only. It does NOT provide formal medical diagnoses or replace direct clinical care from a licensed healthcare professional. In any medical emergency, users are instructed to dial **1122** or **115** immediately or visit the nearest hospital emergency room.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve SehatAI Pakistan:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the Apache 2.0 License. See `LICENSE` for details.

---

<p align="center">
  <b>Developed for the people of Pakistan 🇵🇰</b>
</p>
