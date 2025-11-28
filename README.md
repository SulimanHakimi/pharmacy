# فارما AI - Pharmaceutical AI Assistant (Pashto)

یو جامع درملتون ویب اپلیکیشن د هوښيار (AI) ځواک سره، د پښتو ژبې په کارونکو لپاره ډیزاین شوی.

## 🌟 Features

### Core Features

- **د هوښيار چیټ بوټ** - د درملو، جانبي عوارضو، او روغتیایی مشورو په اړه پوښتنې وکړئ
- **د درملو د تعامل چک** - د احتمالي خطرناکو تعاملاتو لپاره د ګڼو درملو تحلیل
- **د نسخې تحلیل** - د درملو نومونو او ل

ارښوونو د پیژندلو لپاره عکسونه اپلوډ کړئ

- **د کاروونکي مدیریت** - د NextAuth سره خوندي تصدیق
- **د کریډیټ سیسټم** - وړیا او تادیه شوي پلانونه
- **RTL ملاتړ** - د پښتو ژبې لپاره بشپړ د راست څخه چپ لور ته ملاتړ

### Technical Features

- **Next.js 16** - د پرمختللې React فریمورک
- **Tailwind CSS v4** - د عصري سټایلینګ لپاره
- **MongoDB** - د ډیټابیس سولوشن
- **Google Gemini AI** - د AI ځواب ورکولو او انځور تحلیل لپاره
- **NextAuth** - د تصدیق او سیشن مدیریت لپاره
- **Framer Motion** - د ښکلي انیمیشنونو لپاره

## 📋 Prerequisites

- Node.js 18+ نصب شوی
- MongoDB نصب شوی او چلیدونکی (local یا cloud)
- Google API Key د Gemini AI لپاره

## 🚀 Installation

### 1. Repository Clone کړئ یا پروژه ډاونلوډ کړئ

```bash
cd pharmacy-app
```

### 2. Dependencies نصب کړئ

```bash
npm install
```

### 3. Environment Variables تنظیم کړئ

`.env.local` فایل جوړ کړئ یا موجوده فایل تازه کړئ:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/pharmacy-app

# Google Gemini AI API Key
# Get your key from: https://makersuite.google.com/app/apikey
GOOGLE_API_KEY=your_google_api_key_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_random_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

### 4. MongoDB پیل کړئ

که تاسو MongoDB په محلي توګه چلوئ:

```bash
mongod
```

یا MongoDB Atlas (cloud) وکاروئ او خپل connection string په `.env.local` کې تازه کړئ.

### 5. Development Server پیل کړئ

```bash
npm run dev
```

اپلیکیشن به په [http://localhost:3000](http://localhost:3000) کې شتون ولري.

## 🔑 Getting Google API Key

1. [Google AI Studio](https://makersuite.google.com/app/apikey) ته لاړ شئ
2. د خپل Google حساب سره sign in وکړئ
3. "Get API Key" کلیک وکړئ
4. API key کاپي کړئ او خپل `.env.local` فایل کې یې ځای په ځای کړئ

## 📁 Project Structure

```
pharmacy-app/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth configuration
│   │   │   ├── chat/         # AI chatbot endpoint
│   │   │   ├── interactions/ # Drug interactions endpoint
│   │   │   ├── upload/       # Prescription upload endpoint
│   │   │   └── register/     # User registration endpoint
│   │   ├── chat/             # Chat page
│   │   ├── interactions/     # Drug interactions page
│   │   ├── upload/           # Prescription upload page
│   │   ├── pricing/          # Pricing plans page
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   ├── layout.js         # Root layout
│   │   ├── page.js           # Home page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation component
│   │   └── AuthProvider.jsx  # Session provider
│   ├── lib/
│   │   ├── db.js             # MongoDB connection
│   │   └── utils.js          # Utility functions
│   └── models/
│       └── User.js           # User model
├── .env.local                # Environment variables
├── package.json
└── README.md
```

## 🎨 Key Pages

### کور پاڼه (/)

- Hero section د تشریح سره
- د فیچرونو showcase
- CTA buttons

### هوښيار چیټ (/chat)

- د AI سره ریښتیني وخت خبرې اترې
- پښتو ژبې ملاتړ
- د روغتیایی معلوماتو لپاره بوټ

### د درملو تعاملات (/interactions)

- د ګڼو درملو اضافه کول
- د AI تحلیل د تعاملاتو لپاره
- تفصیلي امنیتي راپورونه

### نسخه اپلوډ (/upload)

- د نسخې عکس اپلوډ
- د AI انځور پیژندنه
- د درملو نومونه او خوراک

### بیې (/pricing)

- وړیا پلان (5 credits)
- پرو پلان ($9.99/month)
- پریمیم پلان ($19.99/month)

## 🛠️ Available Scripts

- `npm run dev` - Development server پیل کړئ
- `npm run build` - د production لپاره build جوړ کړئ
- `npm start` - Production server پیل کړئ
- `npm run lint` - Linting چک کړئ

## 🔐 User Authentication

- د bcrypt سره password hashing
- د NextAuth سره Session management
- د JWT سره Secure authentication
- Credits tracking

## 💳 Credit System

- **Free Plan**: 5 credits په میاشت کې
- **Pro Plan**: Unlimited credits
- **Premium Plan**: Unlimited + اضافي فیچرونه

## 🌐 Right-to-Left (RTL) Support

پوره RTL ملاتړ د پښتو ژبې لپاره:

- HTML `dir="rtl"`
- Tailwind utilities (`space-x-reverse`, `text-right`)
- د نیویګیشن او لایآوټ RTL تنظیمات

## 🤖 AI Features

### Google Gemini Integration

- **gemini-pro**: د text chatbot لپاره
- **gemini-1.5-flash**: د انځورونو تحلیل لپاره

### Pashto Language Support

ټول AI responses په پښتو کې دي:

- د چیټ بوټ ځوابونه
- د تعامل تحلیلونه
- د نسخې شننه

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation
- Optimized for all devices
- Touch-friendly interfaces

## 🎯 Future Enhancements

- [ ] د تادیاتو gateway integration (Stripe/PayPal)
- [ ] د کاروونکي dashboard/profile
- [ ] د روغتیا تاریخ tracking
- [ ] د ډاکټر سره onlineمشورې
- [ ] Push notifications
- [ ] د ډیرو ژبو ملاتړ
- [ ] Progressive Web App (PWA)

## 🐛 Troubleshooting

### MongoDB Connection Error

- ډاډ ترلاسه کړئ چې MongoDB چلیدونکی دی
- خپل `MONGODB_URI` په `.env.local` کې چیک کړئ

### Google API Error

- ډاډ ترلاسه کړئ چې ستاسو API key معتبر دی
- API usage limits چیک کړئ

### Build Errors

- `node_modules` پاک کړئ او `npm install` بیا چل کړئ
- ډاډ ترلاسه کړئ چې تاسو Node.js 18+ لرئ

## 📄 License

MIT License - په آزاده توګه وکاروئ او ترمیم کړئ.

## 👨‍💻 Development

د Next.js په 16.0.5 سره جوړ شوی
د Tailwind CSS v4 سره styled شوی
د Google Gemini AI سره powered شوی

---

**یادښت**: دا یو AI-powered روغتیایی معلوماتي وسیله ده او باید د مسلکي طبي مشورې ځای نه نیسي.
