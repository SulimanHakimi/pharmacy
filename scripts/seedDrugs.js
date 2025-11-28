// Script to populate the database with sample drugs
// Run with: node scripts/seedDrugs.js

const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pharmacy-app';

// Drug schema
const DrugSchema = new mongoose.Schema({
  name: String,
  namePashto: String,
  category: String,
  description: String,
  sideEffects: [String],
  dosage: String,
  manufacturer: String,
  price: Number,
  inStock: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const Drug = mongoose.models.Drug || mongoose.model('Drug', DrugSchema);

// Sample drugs data
const sampleDrugs = [
  {
    name: "Aspirin",
    namePashto: "اسپرین",
    category: "Pain Relief",
    description: "د درد او تبې لپاره کارول کیږي. د زړه د ناروغیو د مخنیوي لپاره هم  کارول کیږي.",
    sideEffects: ["د معدې درد", "زړه بدوالی", "د زړه بدوالی احساس"],
    dosage: "په ورځ کې 81-325mg",
    manufacturer: "Bayer",
    price: 5.99,
    inStock: true,
  },
  {
    name: "Paracetamol",
    namePashto: "پاراسیتامول",
    category: "Pain Relief",
    description: "د درد او تبې لپاره. د سر درد، د غاښونو درد او ټولو ډولونو د درد لپاره خوندي.",
    sideEffects: ["د ډیر مقدار چې کارول شی د ځیګر تاوان", "د پوستکې خارښت"],
    dosage: "په هرو 4-6 ساعتونو کې 500-1000mg",
    manufacturer: "Generic",
    price: 3.99,
    inStock: true,
  },
  {
    name: "Ibuprofen",
    namePashto: "ایبوپروفین",
    category: "Anti-inflammatory",
    description: "د درد، سوځیدنې او تبې لپاره. د ګردن، د عضلاتو درد او د مرګیو لپاره ډیر اغیزمن.",
    sideEffects: ["د معدې تکلیف", "زړه بدوالی", "د معدې السر کیدی شي"],
    dosage: "په هرو 6-8 ساعتونو کې 200-400mg",
    manufacturer: "Advil",
    price: 8.99,
    inStock: true,
  },
  {
    name: "Amoxicillin",
    namePashto: "اموکسیسلین",
    category: "Antibiotic",
    description: "یو پراخ سپیکټرم انټي بایوټیک د بیکټیریا انفیکشن لپاره. نسخه اړینه ده.",
    sideEffects: ["اسهال", "زړه بدوالی", "د پوستکې خارښت"],
    dosage: "500mg په هرو 8 ساعتونو کې",
    manufacturer: "GlaxoSmithKline",
    price: 12.99,
    inStock: true,
  },
  {
    name: "Metformin",
    namePashto: "میتفورمین",
    category: "Diabetes",
    description: "د ډایبیټس د ډول 2 د درملنې لپاره. د وینې د قند کچه کموي.",
    sideEffects: ["د معدې تکلیف", "اسهال", "د ویټامین B12 کموالی"],
    dosage: "په ورځ کې 500-2000mg",
    manufacturer: "Merck",
    price: 15.99,
    inStock: true,
  },
  {
    name: "Lisinopril",
    namePashto: "لیسینوپریل",
    category: "Blood Pressure",
    description: "د لوړ فشار فشار د درملنې لپاره ACE inhibitor. د زړه د ناکامۍ لپاره هم کارول کیږي.",
    sideEffects: ["ټوخی", "سر درد", "ستړیا"],
    dosage: "په ورځ کې 10-40mg",
    manufacturer: "AstraZeneca",
    price: 18.99,
    inStock: true,
  },
  {
    name: "Omeprazole",
    namePashto: "اومیپرازول",
    category: "Gastrointestinal",
    description: "د معدې د تیزابیت کمولو لپاره. د GERD او السر لپاره کارول کیږي.",
    sideEffects: ["سر درد", "د معدې درد", "زړه بدوالی"],
    dosage: "په ورځ کې یو ځل 20-40mg",
    manufacturer: "AstraZeneca",
    price: 14.99,
    inStock: true,
  },
  {
    name: "Simvastatin",
    namePashto: "سیمواسټاټین",
    category: "Cholesterol",
    description: "د کولیسټرول کموالي لپاره statin. د زړه د ناروغیو خطر کموي.",
    sideEffects: ["د عضلاتو درد", "د ځیګر د انزایمونو زیاتوالی", "سر درد"],
    dosage: "په ورځ کې شپه کې 10-40mg",
    manufacturer: "Merck",
    price: 22.99,
    inStock: true,
  },
  {
    name: "Levothyroxine",
    namePashto: "لیووتایروکسین",
    category: "Thyroid",
    description: "د تایرایډ د هورمون بدلیدل. د hypothyroidism لپاره کارول کیږي.",
    sideEffects: ["زړه ګړندی کول", "بې خوبي", "وزن کم کیدل"],
    dosage: "په ورځ کې 25-200mcg",
    manufacturer: "Abbott",
    price: 16.99,
    inStock: true,
  },
  {
    name: "Albuterol",
    namePashto: "الب یوټیرول",
    category: "Respiratory",
    description: "د ساه اخیستلو لپاره inhaler. د اسمه او COPD لپاره کارول کیږي.",
    sideEffects: ["لړزیدنه", "زړه ګړندی کول", "سر درد"],
    dosage: "د اړتیا په صورت کې 2 puffs",
    manufacturer: "GlaxoSmithKline",
    price: 45.99,
    inStock: true,
  },
  {
    name: "Ciprofloxacin",
    namePashto: "سیپروفلوکساسین",
    category: "Antibiotic",
    description: "پیاوړی انټي بایوټیک د ډیرو انفیکشنونو لپاره. نسخه اړینه ده.",
    sideEffects: ["زړه بدوالی", "اسهال", "د لمر لخوا حساسیت"],
    dosage: "500-750mg په هرو 12 ساعتونو کې",
    manufacturer: "Bayer",
    price: 25.99,
    inStock: false,
  },
  {
    name: "Amlodipine",
    namePashto: "املودیپین",
    category: "Blood Pressure",
    description: "د لوړ فشار فشار لپاره calcium channel blocker. د سینې درد لپاره هم کارول کیږي.",
    sideEffects: ["پښې سوځیدل", "سر درد", "ستړیا"],
    dosage: "په ورځ کې 5-10mg",
    manufacturer: "Pfizer",
    price: 13.99,
    inStock: true,
  },
];

async function seedDrugs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing drugs (optional - comment out if you want to keep existing)
    // await Drug.deleteMany({});
    // console.log('Cleared existing drugs');

    // Insert sample drugs
    await Drug.insertMany(sampleDrugs);
    console.log(`Successfully added ${sampleDrugs.length} drugs to database`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDrugs();
