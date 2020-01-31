const fs = require('fs');
const { exec } = require('child_process');

const serviceTranslations = {
  afaanoromoo: "Meeshaan kee Miidiyaa taphachiisuu hin danda'u",
  afrique: '',
  amharic: 'የእርሶ መሳሪያ ሚዲያ ፕሌይ ባክን ማጫወት ኣልተቻለም።',
  arabic: 'جهازك لا يدعم تشغيل الفيديو',
  azeri: 'Sizin qurğunuzda yenidən səsləndirmə mümkün deyil',
  bengali: 'আপনার ডিভাইস মিডিয়া প্লেব্যাক সমর্থন করে না',
  burmese: 'သငျ့စကျတှငျ ဒီမီဒီယာဖိုငျကို ဖှငျ့၍ မရပါ။',
  cymrufyw: '',
  gahuza: 'Ntibishobora gukina mu cuma cawe',
  gujarati: 'તમારું ડિવાઇસ મીડિયા પ્લેબૅક સપોર્ટ નથી કરતું',
  hausa: "Na'urarku na da matsalar sauraren sauti",
  hindi: 'प्लेबैक आपके उपकरण पर नहीं हो पा रहा',
  igbo: 'Ngwaọrụ gị akwadoghi ọkpụkpọ mgbasa ozi',
  indonesia: 'Media playback tidak ada di perangkat Anda',
  japanese: 'お使いの端末ではメディアプレイバックはご利用になれません',
  korean: '사용 기기에서 미디어 재생이 지원되지 않습니다',
  kyrgyz: 'Жабдыгыңыз медианын бул түрүн ойнотууга ылайыктуу эмес.',
  marathi: 'मीडिया प्लेबॅक आपल्या डिव्हाइसवर असमर्थित आहे',
  mundo: '',
  naidheachdan: '',
  nepali: 'तपाईंको उपकरणमा मिडिया प्लेब्याक सपोर्ट छैन',
  pashto: 'په دې وسیله کې د غږ اوريدل او ویډیو لیدنه شونې نه ده.',
  persian: 'پخش این فایل در دستگاه شما پشتیبانی نمی شود.',
  pidgin: 'Dem no support media player for your device',
  portuguese:
    'A reprodução deste formato de vídeo não é compatível com seu dispositivo',
  punjabi: "ਮੀਡੀਆ ਪਲੇਬੈਕ ਤੁਹਾਡੀ ਡਿਵਾਈਸ 'ਤੇ ਸਪੋਰਟ ਨਹੀਂ ਕਰਦਾ",
  russian: '',
  sinhala: "Multimedia o'ynash bu qurilmada dastaklanmaydi",
  somali: 'Qalabkan aad haysato kuma ciyaari kartid maqalkan iyo muuqaalkan',
  swahili: 'Huwezi kusikiliza tena',
  tamil: 'ஒலிபரப்பு மென்பொருள் உங்கள் கணினியில் இல்லை',
  telugu: 'మీ పరికరంలో మీడియా ప్లేబ్యాక్ సదుపాయం లేదు.',
  thai: 'อุปกรณ์ของท่านไม่สามารถใช้งานเครื่องเล่นสื่อได้',
  tigrinya: 'ትጥቀምሉ ዘለኹም መሳርሒ ኣይተቐበሎን።',
  turkce: 'Cihazınızda ses/video gösterim programı bulunamadı',
  ukrainian: 'Ваш пристрій не підтримує відтворення мультимедійних файлів',
  urdu: 'اپ کی ڈیوائس پر پلے بیک سپورٹ دستیاب نہیں',
  vietnamese: 'Máy của bạn không hỗ trợ nghe xem',
  yoruba: 'Àwọn àmúyẹ fun gbígbọ́ orin ko le ṣiṣẹ lori ẹ̀rọ rẹ',
};

const getServiceConfigPath = service =>
  `src/app/lib/config/services/${service}.js`;
const getLines = string => string.split('\n');
const getIndexOfTranslations = lines =>
  lines.findIndex(line => line.includes('media: {'));

Object.keys(serviceTranslations).forEach(service => {
  const serviceConfigPath = getServiceConfigPath(service);
  const serviceConfig = fs.readFileSync(serviceConfigPath, 'utf8').toString();
  const lines = getLines(serviceConfig);
  const indexOfTranslations = getIndexOfTranslations(lines);
  const newLines = [
    ...lines.slice(0, indexOfTranslations + 1),
    `noJs: "${serviceTranslations[service]}",`,
    ...lines.slice(indexOfTranslations + 1),
  ];

  fs.writeFileSync(serviceConfigPath, newLines.join('\n'));
});

exec(
  './node_modules/.bin/prettier --write src/app/lib/config/services/**',
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  },
);
