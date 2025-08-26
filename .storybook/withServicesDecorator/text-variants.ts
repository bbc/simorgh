import { Services, Variants } from '#app/models/types/global';

type TextVariant = {
  text: string;
  longText: string;
  script: string;
  locale: string;
  timezone: string;
  articlePath: string;
  dir?: string;
  service?: Services;
  variant?: Variants;
};

const TEXT_VARIANTS: Record<string, TextVariant> = {
  afaanoromoo: {
    text: "Gammadoo ta'uun akkanumaan hin dhufu.",
    longText:
      "MM Abiy Ahimed paartii isaanii ADWUI jedhamuun waggoota 28'f biyya bulchaa ture walitti baqsuun paartii Badhaadhinaa [PP] jedhamu hundeessaa jiru.",
    script: 'latin',
    locale: 'om',
    timezone: 'Africa/Addis_Ababa',
    articlePath: '/afaanoromoo/articles/c4g19kgl85ko',
  },
  afrique: {
    text: "La femme qui s'est volatilisée après avoir arnaqué le monde",
    longText:
      'Comment Ruja Ignatova a-t-elle gagné 4 milliards de dollars en vendant sa fausse monnaie numérique au monde - et où est-elle allée ?',
    script: 'latinDiacritics',
    locale: 'fr',
    timezone: 'GMT',
    articlePath: '/afrique/articles/cz216x22106o',
  },
  amharic: {
    text: 'እንግሊዝ ከሩስያ ጦርነት ከገጠመች ከጦር መሣሪያ ውጭ ትሆናለች',
    longText:
      'እንግሊዝ በምዕራብ አውሮጳ ከሩስያ ጋር የምትላተም ከሆነ የብሪታኒያ እግረኛ ወታደሮች ከጦር መሣሪያ ውጭ ይሆናሉ ይላል አንድ ቡድን።',
    script: 'ethiopic',
    locale: 'am',
    timezone: 'Africa/Addis_Ababa',
    articlePath: '/amharic/articles/c3rykrrvy19o',
  },
  arabic: {
    text: 'لماذا يخجل البعض من اسم قريته في مصر؟',
    longText:
      'هناك وقائع عدة تتسم بالسخرية والجدل والتنمر، ضد أهل القرية الذين أصابهم الغضب والسخط مما دفعهم إلى تقديم طلب لتغيير اسم قريتهم.',
    script: 'arabic',
    dir: 'rtl',
    locale: 'ar',
    timezone: 'GMT',
    articlePath: '/arabic/articles/c1er5mjnznzo',
  },
  azeri: {
    text: 'Azərbaycanın siyasi ailələrinin ikinci evi – İngiltərə',
    longText:
      'Son aylarda müxtəlif səbəblərə görə Britaniya mətbuatında İngiltərədə yaşayan və ya burada biznesi olan azərbaycanlı məmurların ailə üzvlərinin adları qeyd olunub.',
    script: 'latinDiacritics',
    locale: 'az',
    timezone: 'Asia/Baku',
    articlePath: '/azeri/articles/c5k08pqnzexo',
  },
  bengali: {
    text: 'ভিসা ফুরিয়ে যাওয়ায় ক্রিকেটার সাইফের জরিমানা',
    longText:
      'বিমানবন্দরে যাওয়ার আগে সাইফ দেখেন, তার ভিসার মেয়াদ দুদিন আগেই শেষ হয়ে গেছে। তখন জরিমানা দিয়ে তাকে আবার এক্সিট পারমিট নিতে হয়।',
    script: 'bengali',
    locale: 'bn',
    timezone: 'Asia/Dhaka',
    articlePath: '/bengali/articles/c6p3yp5zzmeo',
  },
  burmese: {
    text: 'အောက်စဖို့ဒ် ဆရာတော် ပါမောက္ခ ဒေါက်တာအရှင်ဓမ္မသာမိ',
    longText:
      'တပ်မတော်နဲ့ ကရင်နယ်ခြားစောင့်တပ် BGF ပူးပေါင်းတပ်ဖွဲ့က MNLA ရဲ့ မြို့နယ်ခွဲရုံး ဖြစ်တဲ့ ဟင်္သာတိုင် ဂိတ်စခန်းနဲ့ ဂျပန်ရေတွင်းတို့ကို ထိန်းချုပ်ထားတယ်လို့ ဆိုပါတယ်။',
    script: 'burmese',
    locale: 'my',
    timezone: 'GMT',
    articlePath: '/burmese/articles/c3w1kwwmm5yo',
  },
  cymrufyw: {
    text: 'Prif hyfforddwr y Gleision yn gadael y rhanbarth',
    longText:
      'Mae gan y gŵr 55 oed o Awstralia dros 20 mlynedd o brofiad yn hyfforddi ar y lefel uchaf, gan gynnwys cyfnodau fel prif hyfforddwr cynorthwyol yn Awstralia a Japan.',
    script: 'latin',
    locale: 'cy',
    timezone: 'Europe/London',
    articlePath: '/cymrufyw/articles/cn7k01xp8kxo',
  },
  gahuza: {
    text: "Umukate n'isoda vyatumye amenya ko afise umugera wa SIDA",
    longText:
      "Phenny Awiti ni umunyakenya agendana umugera wa SIDA, akaba yamenye ko awugendana mu mwaka wa 2008, ico gihe yiga mu mwaka w'icenda.",
    script: 'latin',
    locale: 'rw',
    timezone: 'GMT',
    articlePath: '/gahuza/articles/cey23zx8wx8o',
  },
  gujarati: {
    text: 'જીતેન્દ્રસિંહ મૂળ ઉત્તર પ્રદેશના ફિરોઝાબાદના',
    longText:
      'ભારતીય અભિનેત્રી ઐશ્વર્યા રાય સાથે અમિરીકી ફિલ્મ નિર્માતા હાર્વી વાઇનસ્ટીન, જેના પર અનેક અભિનેત્રીઓના યૌન શોષણના આરોપો મુકાઈ રહ્યા છે',
    script: 'hindi',
    locale: 'gu',
    timezone: 'Asia/Kolkata',
    articlePath: '/gujarati/articles/cr5el5kw591o',
  },
  hausa: {
    text: 'Bayanin Ganduje kan ayyukan Gama',
    longText:
      'Zhara ta ce za ta yi amfani da kudaden ne wajen tafiyar da gidauniyarta mai tallafa wa marayu a fadin Najeriya.',
    script: 'latin',
    locale: 'ha',
    timezone: 'GMT',
    articlePath: '/hausa/articles/c2nr6xqmnewo',
  },
  hindi: {
    text: 'भारतीय खाने पर दुनिया में क्यों छिड़ी बहस',
    longText:
      'मई तक ये कहानियां या तो अनकही हो गई थीं या इनके बारे में दबी हुई आवाज़ में बात की जा रही थी. लेकिन अब मामला जोर पकड़ रहा है.',
    script: 'hindi',
    locale: 'hi',
    timezone: 'Asia/Kolkata',
    articlePath: '/hindi/articles/c0469479x9xo',
  },
  igbo: {
    text: 'Etu e si achụ nwaanyị taa na mgbe gboo',
    longText:
      'Ọtụtụ mgbe ka ndị mmadụ na-emerụ ahụ maọbụ nwụọ ebe ha na-enyere mmadụ ibe ha aka mana lee ka ị ga-esi gbanarị ọdachị a.',
    script: 'latinDiacritics',
    locale: 'ig',
    timezone: 'Africa/Lagos',
    articlePath: '/igbo/articles/cr1lw620ygjo',
  },
  indonesia: {
    text: 'Ratu kripto: Bagaimana Ruja Ignatova menipu dunia kemudian menghilang',
    longText:
      'Seorang perempuan yang menyebut dirinya ratu kripto dan meraup US$4 miliar atau Rp56 triliun dengan menjual mata uang digital palsu dan kemudian menghilang.',
    script: 'latin',
    locale: 'id',
    timezone: 'Asia/Jakarta',
    articlePath: '/indonesia/articles/c0q2zq8pzvzo',
  },
  japanese: {
    text: '度目の採決認めなかった理由は',
    longText:
      'バラク・オバマ前米大統領など各国の著名人が訪れることで有名な東京のすし店が、レストランガイド「ミシュラン」の最新版から除外された。一般客からの予約を受け付けなくなったため。',
    script: 'chinese',
    locale: 'ja',
    timezone: 'Asia/Tokyo',
    articlePath: '/japanese/articles/c693w95w0mko',
  },
  korean: {
    text: '마이크 폼페이오 미국 국무장관',
    longText:
      '유출된 문서를 통해 중국이 철통보안의 감옥에서 어떻게 수십만 명의 무슬림들을 조직적으로 세뇌하고 있는지가 상세하게 드러났다.',
    script: 'korean',
    locale: 'ko',
    timezone: 'Asia/Seoul',
    articlePath: '/korean/articles/cpv9kv2yzk6o',
  },
  kyrgyz: {
    text: 'Казакстан Назарбаевден башка президентти көрө',
    longText:
      'Кыргыз Республикасынын Жогорку Кеңешинин депутаты Каныбек Иманалиевдин Чыңгыз Айтматовдун 90 жылдыгына арналган илимий-практикалык конференцияда сүйлөгөн сөзү.',
    script: 'cyrillic',
    locale: 'ky',
    timezone: 'GMT',
    articlePath: '/kyrgyz/articles/c3xd4xg3rm9o',
  },
  marathi: {
    text: 'तो फोटो मुंबईकर आजही विसरू शकलेले नाहीत.',
    longText:
      "तो फोटो मुंबईकर आजही विसरू शकलेले नाहीत. पण त्या फोटोनं मिळालेल्या प्रसिद्धीपासून डि'सुझा यांनी दूर राहणंच पसंत केलं. पण त्या फोटोनं मिळालेल्या प्रसिद्धीपासून डि'सुझा यांनी दूर राहणंच पसंत केलं.",
    script: 'hindi',
    locale: 'mr',
    timezone: 'Asia/Kolkata',
    articlePath: '/marathi/articles/cp47g4myxz7o',
  },
  mundo: {
    text: 'Lo que todos podemos aprender de esta foto de un hombre',
    longText:
      'Colombia entra a su sexto día de protestas sin que se resuelvan dos preguntas clave: cuál es el problema y cuáles las soluciones. Uno de expertos en el país más famosos del mundo, el economista británico James Robinson, habló con BBC Mundo sobre esta complejidad histórica.',
    script: 'latinDiacritics',
    locale: 'es',
    timezone: 'GMT',
    articlePath: '/mundo/articles/ce42wzqr2mko',
  },
  naidheachdan: {
    text: 'Bana-chroitear òg sna Hearadh agus an turas sònraichte aice',
    longText:
      "Bha i riamh airson a dhol a Phabaigh airson obair chudromach a bhios croitearan na sgìre a' dèanamh a h-uile bliadhna, agus am bliadhna fhuair i an cothrom a dhol còmhla riutha.",
    script: 'latin',
    locale: 'gd',
    timezone: 'Europe/London',
    articlePath: '/naidheachdan/articles/cn7k01xp8kxo',
  },
  nepali: {
    text: "नेपाललाई तीनवटा जलमार्ग प्रयोग गर्न दिन भारत 'सहमत",
    longText:
      'काठमाण्डूमा बुधवार भएको नेपाल र भारतका अधिकारीहरूको एउटा बैठकमा भारत नेपाललाई आफ्ना तीनवटा जलमार्गहरू प्रयोग गर्न दिन सहमत भएको उक्त बैठकमा सहभागी नेपाली अधिकारीले बताएका छन्।',
    script: 'nepali',
    locale: 'ne',
    timezone: 'Asia/Kathmandu',
    articlePath: '/nepali/articles/cl90j9m3mn6o',
  },
  news: {
    text: 'Could a computer ever create better art than a human?',
    longText:
      'The critic, author, poet and TV host was known for his witty commentary on international television.',
    script: 'latin',
    locale: 'en',
    timezone: 'Europe/London',
    articlePath: '/news/articles/cn7k01xp8kxo',
  },
  newsround: {
    text: 'Could a computer ever create better art than a human?',
    longText:
      'The critic, author, poet and TV host was known for his witty commentary on international television.',
    script: 'latin',
    locale: 'en',
    timezone: 'Europe/London',
    articlePath: '/newsround/articles/cn7k01xp8kxo',
  },
  optimobase: {
    text: 'Could a computer ever create better art than a human?',
    longText:
      'The critic, author, poet and TV host was known for his witty commentary on international television.',
    script: 'latin',
    locale: 'en',
    timezone: 'Europe/London',
    articlePath: '/optimobase/articles/cn7k01xp8kxo',
  },
  pashto: {
    text: 'د ملګرو ملتونو د ماشومانو ادارې یونیسف افغان کرېکټ لوبغاړی راشد خانه.',
    longText:
      'د کندهار سیمه ییز پولیس خبر ورکوي هغه ملا امام یې نیولی، چي پر یوه ۸ کلن ماشوم یې جنسي تېري کړی او بیا یې په وهلو وژلی دی. دغه پېښه تېره ورځ د کندهار د اتمي حوزې اړوند د غازی بابا غونډۍ نومې سیمه کي یوه جومات کې شوې ده.',
    script: 'arabic',
    dir: 'rtl',
    locale: 'ps',
    timezone: 'GMT',
    articlePath: '/pashto/articles/cyjmdl92z3ro',
  },
  persian: {
    text: 'در این جشنواره برای نخستین بار از کارگران افغانستان در شهر تهران تقدیر شد',
    longText:
      'دولت ترکیه تمدید اقامت موقت توریستی برای اتباع بعضی از کشورهای خارجی از جمله ایران را به یک سال محدود کرده است. با مصوبه جدید، متقاضیان تمدید اقامت موقت توریستی تنها می توانند حداقل پس از گذشت یک سال از پایان مهلت اقامت یک ساله توریستی خود دوباره برای دریافت این اقامت اقدام کنند.',
    script: 'arabic',
    dir: 'rtl',
    locale: 'fa',
    timezone: 'GMT',
    articlePath: '/persian/articles/cej3lzd5e0go',
  },
  pidgin: {
    text: 'Tins you need to know about Babcock University',
    longText:
      'Before di agreement workers union bin dey demand 29 per cent increase for workers wey dey collect salary wey pass N30,000.',
    script: 'latin',
    locale: 'pcm',
    timezone: 'Africa/Lagos',
    articlePath: '/pidgin/articles/cwl08rd38l6o',
  },
  portuguese: {
    text: 'Como dormir melhor (e em menos tempo)',
    longText:
      'Medidas anunciadas no encontro entre Bolsonaro e Trump celebram aproximação com o governo americano - mas elas agora precisam passar pelo teste da concretização',
    script: 'latinDiacritics',
    locale: 'pt-br',
    timezone: 'America/Sao_Paulo',
    articlePath: '/portuguese/articles/cd61pm8gzmpo',
  },
  punjabi: {
    text: 'ਲਾਲ ਰਾਜਮਾਂਹ ਤੇ ਸੋਇਆਬੀਨ ਸਣੇ ਖਾਣ ਦੀਆਂ 5 ‘ਖ਼ਤਰਨਾਕ’ ਚੀਜ਼ਾਂ',
    longText:
      'ਪਾਕਿਸਤਾਨੀ ਮਹਿਲਾ ਰਾਹਿਲਾ ਨੇ ਭਾਰਤੀ ਵਕੀਲ ਜ਼ਰੀਏ ਅਦਾਲਤ ਵਿੱਚ ਦਿੱਤੀ ਅਰਜ਼ੀ ਵਿੱਚ ਕਿਹਾ ਕਿ ਮਾਮਲੇ ਨਾਲ ਜੁੜੇ ਪਾਕਿਸਤਾਨੀ ਗਵਾਹਾਂ ਨੂੰ ਬੁਲਾਇਆ ਜਾਵੇ ਜੁੜੇ ਪਾਕਿਸਤਾਨੀ ਗਵਾਹਾਂ ਨੂੰ ਬੁਲਾਇਆ ਜਾਵੇ ਜੁੜੇ ਪਾਕਿਸਤਾਨੀ ਗਵਾਹਾਂ ਨੂੰ ਬੁਲਾਇਆ ਜਾਵੇ',
    script: 'hindi',
    locale: 'pa-in',
    timezone: 'Asia/Kolkata',
    articlePath: '/punjabi/articles/c0l79lr39qyo',
  },
  russian: {
    text: 'Последняя воля: чем тронуло мир фото умирающего американца?',
    longText:
      'Фотография умирающего пожилого человека, который решил в последний раз выпить пива в окружении своих родных, неожиданно нашла отклик у очень многих людей по всему миру. Почему?',
    script: 'cyrillic',
    locale: 'ru',
    timezone: 'GMT',
    articlePath: '/russian/articles/ck7pz7re3zgo',
  },
  'serbian-cyr': {
    service: 'serbian',
    variant: 'cyr',
    text: 'Караџић се годинама крио пре него што је ухапшен 2008. године',
    longText:
      'Захтеви за оставкама чланова владе Србије, из различитих разлога, одјекивали су у медијима више пута него што је оставки заиста било.',
    script: 'cyrillic',
    locale: 'sr-cyrl',
    timezone: 'GMT',
    articlePath: '/serbian/articles/c805k05kr73o/cyr',
  },
  'serbian-lat': {
    service: 'serbian',
    variant: 'lat',
    text: 'Karadžić se godinama krio pre nego što je uhapšen 2008. godine',
    longText:
      'Zahtevi za ostavkama članova vlade Srbije, iz različitih razloga, odjekivali su u medijima više puta nego što je ostavki zaista bilo.',
    script: 'latin',
    locale: 'sr',
    timezone: 'GMT',
    articlePath: '/serbian/articles/c805k05kr73o/lat',
  },
  sinhala: {
    text: 'සිවිල් යුද ගැටුම් හමුවේ කොටු වී සිටි සිවිල් වැසියන්',
    longText:
      'ජනාධිපතිවරණයට පෙර එම ගිවිසුමට අනිවාර්යයෙන්ම අත්සන් තබන බවට නව ප්‍රජාතන්ත්‍රවාදී පෙරමුණ අවධාරණය කළ අතර, ශ්‍රී ලංකා පොදුජන පෙරමුණ චෝදනා කළේ, එය "ඇමෙරිකානු මර උගුලක්" වන අතර ඒ හරහා ඇමෙරිකාවට ශ්‍රී ලංකාවේ ඉඩම් "කුණු කොල්ලයට" විකිණෙන බවටය.',
    script: 'sinhalese',
    locale: 'si',
    timezone: 'GMT',
    articlePath: '/sinhala/articles/c45w255zlexo',
  },
  somali: {
    text: 'Haweeney balaayiin doolar ka dhacday dunida oo dhan, oo mar qura la waayay',
    longText:
      '"Sidey ugu suurtagashay Ruja Ignatova inay sameyso lacag dhan $4bilyan oo doolar iyadoo caalamka oo dhan ka iibineysa barnaamij been abuur ah oo ay ku sheegeysay in lacagta ay ku labajibbaareyso - xaggeyse aadday?"',
    script: 'latin',
    locale: 'so',
    timezone: 'Africa/Mogadishu',
    articlePath: '/somali/articles/cgn6emk3jm8o',
  },
  sport: {
    text: 'Could a computer ever create better art than a human?',
    longText:
      'The critic, author, poet and TV host was known for his witty commentary on international television.',
    script: 'latin',
    locale: 'en',
    timezone: 'Europe/London',
    articlePath: '/sport/articles/cn7k01xp8kxo',
  },
  swahili: {
    text: 'Tetesi za soka Ulaya Jumatano tarehe 27.11.2019',
    longText:
      'Rais aliyechaguliwa na wengi atahitaji washirika wangi bungeni kuhakikisha kwamba kuna upitishwaji wa haraka wa miswada mbali na kuidhinisha maswala muhimu ya biashara za serikali iwapo mapendekezo ya BBI yatakubalika.',
    script: 'latin',
    locale: 'sw',
    timezone: 'Africa/Nairobi',
    articlePath: '/swahili/articles/czjqge2jwn2o',
  },
  tamil: {
    text: 'மகாராஷ்டிராவில் தேசியவாத காங்கிரசுக்கு துணை முதல்வர் பதவி: காங்கிரசுக்கு சபாநாயகர்',
    longText:
      'மகாராஷ்டிராவில் சிவசேனை கட்சித் தலைமையில் அமையவுள்ள புதிய மாநில அரசாங்கத்தில் தேசியவாத காங்கிரஸ் கட்சிக்கு ஒரு துணை முதல்வர் பதவி வழங்கப்படும்; காங்கிரஸை சேர்ந்தவர் சபாநாயகராக தேர்வு செய்யப்படுவார்.',
    script: 'tamil',
    locale: 'ta',
    timezone: 'GMT',
    articlePath: '/tamil/articles/cwl08ll3me8o',
  },
  telugu: {
    text: 'నల్లగొండ ఫ్లోరైడ్ సమస్య గురించి నాటి ప్రధాని అటల్ బిహారీ వాజపేయికి దుశ్చర్ల సత్యనారాయణ వివరించారు',
    longText:
      'చైనా ప్రభుత్వం ఈ కాన్సంట్రేషన్ క్యాంపులను విద్య, శిక్షణ కేంద్రాలుగా చెబుతోంది. చైనా ప్రభుత్వం వీగర్ ముస్లింల విషయంలో వ్యవహరిస్తున్న తీరుపై ఫిరోజా ఆది, సోమవారాల్లో మూడు వీడియోలు పోస్ట్ చేశారు.',
    script: 'hindi',
    locale: 'te',
    timezone: 'Asia/Kolkata',
    articlePath: '/telugu/articles/cq0y4008d4vo',
  },
  thai: {
    text: 'ภาพวาดของตำรวจจากใบหน้าผู้เสียชีวิต',
    longText:
      'คุณนึกภาพคนที่เรียนจบมหาวิทยาลัยด้วยวัยเพียง 9 ขวบออกไหม โลรองต์ ไซมอนส์ จากเบลเยี่ยมคือคนคนนั้น เดือน ธ.ค. นี้ เขาจะได้รับปริญญาตรีสาขาวิศวกรรมไฟฟ้า จากมหาวิทยาลัยเทคโนโลยีไอนด์โฮเวน (Eindhoven University of Technology) ครูและคนหลายคนเรียกเขาว่าอัจฉริยะ เขามีแผนการหลายอย่างในอนาคต รวมถึงการเรียนระดับปริญญาเอก',
    script: 'thai',
    locale: 'th',
    timezone: 'Asia/Bangkok',
    articlePath: '/thai/articles/c3qxeqm7ldjo',
  },
  tigrinya: {
    text: 'ዓብዱራሕማን ኣቡሃሽም ሰሜናዊ ቀይሕ',
    longText:
      'ኣብ ኤርትራ ዞባ ሰሜናዊ ቀይሕ ባሕሪ ከባቢ ጋሕቴላይ ዝተራእየ ወረር ኣንበጣ ምድረበዳ ምሉእ ብምሉእ ኣብ ትሕቲ ቁጽጽር ከም ዝኣተወ ሚኒስትሪ ሕርሻ ኣፍሊጡ።',
    script: 'ethiopic',
    locale: 'ti',
    timezone: 'Africa/Addis_Ababa',
    articlePath: '/tigrinya/articles/c12g32eldk6o',
  },
  turkce: {
    text: "Dünyanın ilk HIV-pozitif sperm bankası Yeni Zelanda'da açıldı",
    longText:
      "HIV pozitif olan bağışçılar için dünyanın ilk sperm bankası, hastalıkla ilgili önyargılarla mücadele amacıyla Yeni Zelanda'da açıldı. Bulaşılık düzeyleri tespit edilemeyecek seviyede düşük olan üç HIV pozitif erkek, şimdiden sperm bankasına bağışta bulundu.",
    script: 'latin',
    locale: 'tr',
    timezone: 'Asia/Istanbul',
    articlePath: '/turkce/articles/c8q1ze59n25o',
  },
  'ukchina-simp': {
    service: 'ukchina',
    variant: 'simp',
    text: '该计划的批评者说，这个政策不能解决住房短缺的问题',
    longText:
      '但在当今世界，尽管许多人已不再把步行作为一种主要的出行方式，但巴黎仍然是属于孤僻、哲学式观察者的理想城市。毕竟，法国人习惯于花时间以文学和哲学的方式观察和思考周围的环境',
    script: 'chinese',
    locale: 'zh-cn',
    timezone: 'GMT',
    articlePath: '/ukchina/articles/c0e8weny66ko/simp',
  },
  'ukchina-trad': {
    service: 'ukchina',
    variant: 'trad',
    text: '該計劃的批評者說，這個政策不能解決住房短缺的問題',
    longText:
      '但在當今世界，儘管許多人已不再把步行作為一種主要的出行方式，但巴黎仍然是屬於孤僻、哲學式觀察者的理想城市。畢竟，法國人習慣於花時間以文學和哲學的方式觀察和思考周圍的環境',
    script: 'chinese',
    locale: 'zh-tw',
    timezone: 'GMT',
    articlePath: '/ukchina/articles/c0e8weny66ko/trad',
  },
  ukrainian: {
    text: 'Троє американців помилково відсиділи 36 років. Тепер їх визнали невинними',
    longText:
      "Альфред Честнат, Ендр Стюарт і Ренсом Воткінс потрапили за ґрати ще у 1984 році. З'ясувалося, вони ні в чому не винні, ні в чому не винні",
    script: 'cyrillic',
    locale: 'uk',
    timezone: 'GMT',
    articlePath: '/ukrainian/articles/c0glz45kqz6o',
  },
  urdu: {
    text: 'وزیراعظم ریٹائرڈ جرنیل کو فوج کا سربراہ مقرر کر سکتے ہیں',
    longText:
      'پاکستان کے چیف جسٹس نے کہا ہے کہ اگر اٹارنی جنرل برّی فوج کے سربراہ کی مدتِ ملازمت میں توسیع کے معاملے پر جمعرات تک عدالت کو مطمئن نہ کر سکے تو عدالت قانون کے مطابق فیصلہ کر دے گی۔',
    script: 'arabic',
    dir: 'rtl',
    locale: 'ur',
    timezone: 'Asia/Karachi',
    articlePath: '/urdu/articles/cwgq7rzv172o',
  },
  uzbek: {
    text: 'Дариға Назарбоева Қозоғистон президентининг Британияга охирги сафарида отасига ҳамроҳлик',
    longText:
      'Ўзбекистон: 12 йиллик муҳожиратдан кейин Ватанга қайтган фаол вафот этди - Толиб Ёқубов мустақил Ўзбекистондаги илк ва энг таниқли инсон ҳуқуқлари ҳимоячиларидан бири эди. У Каримов даврида Ўзбекистонни тарк этишга мажбур бўлган, муҳожиратда экан, фуқароликдан маҳрум этилганди.',
    script: 'cyrillic',
    locale: 'uz',
    timezone: 'GMT',
    articlePath: '/uzbek/articles/cxj3rjxm6r0o',
  },
  uzbekCyr: {
    service: 'uzbek',
    variant: 'cyr',
    text: 'Дариға Назарбоева Қозоғистон президентининг Британияга охирги сафарида отасига ҳамроҳлик',
    longText:
      'Ўзбекистон: 12 йиллик муҳожиратдан кейин Ватанга қайтган фаол вафот этди - Толиб Ёқубов мустақил Ўзбекистондаги илк ва энг таниқли инсон ҳуқуқлари ҳимоячиларидан бири эди. У Каримов даврида Ўзбекистонни тарк этишга мажбур бўлган, муҳожиратда экан, фуқароликдан маҳрум этилганди.',
    script: 'cyrillic',
    locale: 'uz',
    timezone: 'GMT',
    articlePath: '/uzbek/articles/cxj3rjxm6r0o/cyr',
  },
  uzbekLat: {
    service: 'uzbek',
    variant: 'lat',
    text: "Darig'a Nazarboeva Qo'zog'iston prezidentining hayotiga oxiri safarda otasiga hamrohlik",
    longText:
      "O'zbekiston: 12 yil muhojiratdan keyin Vatanga qaytgan faol vafot etdi - Tolib Yoqubov O'zbekistondagi birinchi va eng tanish inson huquqlari himoyachilaridan biri edi. U Karimov davrida O'zbekistonni qo'llab-quvvatlash uchun zarur, muhojiratda ekan, harakatlanishdan foydalanishdi.",
    script: 'latin',
    locale: 'uz',
    timezone: 'GMT',
    articlePath: '/uzbek/articles/cxj3rjxm6r0o/lat',
  },
  vietnamese: {
    text: 'Ông Nazarbayev bất ngờ tuyên bố từ chức hôm 19/3/2019',
    longText:
      'Lợi nhuận tại các công ty công nghiệp Trung Quốc tiếp tục trượt giảm trong tháng 10, thể hiện sự suy giảm mạnh nhất từ 2011.',
    script: 'latinDiacritics',
    locale: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    articlePath: '/vietnamese/articles/c3y59g5zm19o',
  },
  yoruba: {
    text: 'Wo àwọn òrílẹ̀ èdè Mẹ́wàá tó láyọ̀ jùlọ Lágbàyé',
    longText:
      'Ni ipinlẹ Zamfara, ailesan owo tabua tawọn Gomina n gba ni owo ifẹyinti, mu ki awọn aṣofin wọgile ofin to ya owo yii sọtọ fun wọn.',
    script: 'latin',
    locale: 'yo',
    timezone: 'Africa/Lagos',
    articlePath: '/yoruba/articles/clw06m0nj8qo',
  },
  'zhongwen-simp': {
    service: 'zhongwen',
    variant: 'simp',
    text: '郑文杰：中国警方公布“嫖娼证据” 引发中港网友论战',
    longText:
      '香港区议会选举以民主派大胜结束。中国官方在大陆的媒体只发出简讯，告知公众选举结束，并未交代哪方获胜及失败。不过，连续两日，官方将矛头对准美国。',
    script: 'chinese',
    locale: 'zh-hans',
    timezone: 'GMT',
    articlePath: '/zhongwen/articles/c3xd4x9prgyo/simp',
  },
  'zhongwen-trad': {
    service: 'zhongwen',
    variant: 'trad',
    text: '鄭文傑：中國警方公布「嫖娼證據」 引發中港網友論戰',
    longText:
      '香港區議會選舉以民主派大勝結束。中國官方在大陸的媒體只發出簡訊，告知公眾選舉結束，並未交代哪方獲勝及失敗。不過，連續兩日，官方將矛頭對凖美國。',
    script: 'chinese',
    locale: 'zh-hant',
    timezone: 'GMT',
    articlePath: '/zhongwen/articles/c3xd4x9prgyo/trad',
  },
};

export default TEXT_VARIANTS;
