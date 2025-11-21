const { useState, useEffect, useRef } = React;

// بيانات أركان الإسلام (نحتفظ بها ثابتة)
const arkanData = [
    {
        id: 1,
        title: "الشهادتان",
        description: "شهادة أن لا إله إلا الله وأن محمداً رسول الله",
        details: "هي المفتاح لدخول الإسلام، وتعتبر الركن الأساسي الذي يقوم عليه الدين"
    },
    {
        id: 2,
        title: "إقامة الصلاة",
        description: "الصلوات الخمس المفروضة في اليوم والليلة",
        details: "هي عماد الدين، وهي الصلة بين العبد وربه، تؤدى في أوقات محددة"
    },
    {
        id: 3,
        title: "إيتاء الزكاة",
        description: "إخراج جزء من المال للفقراء والمساكين",
        details: "تطهير للمال ونمو له، وتزكية للنفس، وإغناء للفقراء"
    },
    {
        id: 4,
        title: "صوم رمضان",
        description: "الصوم من طلوع الفجر إلى غروب الشمس طوال شهر رمضان",
        details: "يُعرِّف الصائم بالجوع والعطش ليتذكر نعمة الله ويشعر بمعاناة الفقراء"
    },
    {
        id: 5,
        title: "حج البيت",
        description: "الحج إلى مكة المكرمة مرة في العمر لمن استطاع إليه سبيلا",
        details: "تجسيد للوحدة الإسلامية ورمز للمساواة بين الناس"
    }
];

// بيانات الأحكام (نحتفظ بها ثابتة)
const ahkamData = [
    {
        id: 1,
        title: "طهارة الماء",
        description: "الأحكام المتعلقة بطهارة الماء واستخدامه للوضوء والغسل",
        category: "الطهارة"
    },
    {
        id: 2,
        title: "شروط الصلاة",
        description: "الشروط الواجب توافرها لصحة الصلاة",
        category: "الصلاة"
    },
    {
        id: 3,
        title: "أركان الصلاة",
        description: "الأركان الأساسية التي لا تصح الصلاة بدونها",
        category: "الصلاة"
    },
    {
        id: 4,
        title: "مبطلات الصيام",
        description: "الأمور التي تفطر الصائم وتفسد صومه",
        category: "الصيام"
    },
    {
        id: 5,
        title: "شروط الزكاة",
        description: "الشروط الواجب توافرها لوجوب الزكاة",
        category: "الزكاة"
    }
];

// بيانات السور القرآنية كاملة (114 سورة)
const surahsData = [
    {
        id: 1,
        name: "الفاتحة",
        verses: 7,
        type: "مكية",
        order: 1,
        pages: [1]
    },
    {
        id: 2,
        name: "البقرة",
        verses: 286,
        type: "مدنية", 
        order: 2,
        pages: [2, 49]
    },
    {
        id: 3,
        name: "آل عمران",
        verses: 200,
        type: "مدنية",
        order: 3,
        pages: [50, 76]
    },
    {
        id: 4,
        name: "النساء",
        verses: 176,
        type: "مدنية",
        order: 4,
        pages: [77, 106]
    },
    {
        id: 5,
        name: "المائدة",
        verses: 120,
        type: "مدنية",
        order: 5,
        pages: [106, 127]
    },
    {
        id: 6,
        name: "الأنعام",
        verses: 165,
        type: "مكية",
        order: 6,
        pages: [128, 150]
    },
    {
        id: 7,
        name: "الأعراف",
        verses: 206,
        type: "مكية",
        order: 7,
        pages: [151, 176]
    },
    {
        id: 8,
        name: "الأنفال",
        verses: 75,
        type: "مدنية",
        order: 8,
        pages: [176, 186]
    },
    {
        id: 9,
        name: "التوبة",
        verses: 129,
        type: "مدنية",
        order: 9,
        pages: [187, 207]
    },
    {
        id: 10,
        name: "يونس",
        verses: 109,
        type: "مكية",
        order: 10,
        pages: [208, 221]
    },
    {
        id: 11,
        name: "هود",
        verses: 123,
        type: "مكية",
        order: 11,
        pages: [221, 235]
    },
    {
        id: 12,
        name: "يوسف",
        verses: 111,
        type: "مكية",
        order: 12,
        pages: [235, 248]
    },
    {
        id: 13,
        name: "الرعد",
        verses: 43,
        type: "مدنية",
        order: 13,
        pages: [249, 255]
    },
    {
        id: 14,
        name: "إبراهيم",
        verses: 52,
        type: "مكية",
        order: 14,
        pages: [255, 261]
    },
    {
        id: 15,
        name: "الحجر",
        verses: 99,
        type: "مكية",
        order: 15,
        pages: [262, 267]
    },
    {
        id: 16,
        name: "النحل",
        verses: 128,
        type: "مكية",
        order: 16,
        pages: [267, 281]
    },
    {
        id: 17,
        name: "الإسراء",
        verses: 111,
        type: "مكية",
        order: 17,
        pages: [282, 293]
    },
    {
        id: 18,
        name: "الكهف",
        verses: 110,
        type: "مكية",
        order: 18,
        pages: [293, 304]
    },
    {
        id: 19,
        name: "مريم",
        verses: 98,
        type: "مكية",
        order: 19,
        pages: [305, 312]
    },
    {
        id: 20,
        name: "طه",
        verses: 135,
        type: "مكية",
        order: 20,
        pages: [312, 321]
    },
    {
        id: 21,
        name: "الأنبياء",
        verses: 112,
        type: "مكية",
        order: 21,
        pages: [322, 331]
    },
    {
        id: 22,
        name: "الحج",
        verses: 78,
        type: "مدنية",
        order: 22,
        pages: [332, 341]
    },
    {
        id: 23,
        name: "المؤمنون",
        verses: 118,
        type: "مكية",
        order: 23,
        pages: [342, 349]
    },
    {
        id: 24,
        name: "النور",
        verses: 64,
        type: "مدنية",
        order: 24,
        pages: [350, 359]
    },
    {
        id: 25,
        name: "الفرقان",
        verses: 77,
        type: "مكية",
        order: 25,
        pages: [359, 366]
    },
    {
        id: 26,
        name: "الشعراء",
        verses: 227,
        type: "مكية",
        order: 26,
        pages: [367, 376]
    },
    {
        id: 27,
        name: "النمل",
        verses: 93,
        type: "مكية",
        order: 27,
        pages: [377, 385]
    },
    {
        id: 28,
        name: "القصص",
        verses: 88,
        type: "مكية",
        order: 28,
        pages: [385, 396]
    },
    {
        id: 29,
        name: "العنكبوت",
        verses: 69,
        type: "مكية",
        order: 29,
        pages: [396, 404]
    },
    {
        id: 30,
        name: "الروم",
        verses: 60,
        type: "مكية",
        order: 30,
        pages: [404, 410]
    }
];

// دالة لجلب آيات السورة من API
const fetchSurahVerses = async (surahNumber) => {
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);
        const data = await response.json();
        
        if (data.code === 200) {
            return data.data.ayahs;
        }
    } catch (error) {
        console.error('Error fetching verses:', error);
        // بيانات افتراضية للطوارئ
        return Array.from({ length: surahsData.find(s => s.order === surahNumber)?.verses || 0 }, (_, i) => ({
            number: i + 1,
            numberInSurah: i + 1,
            text: `آية ${i + 1} من السورة ${surahNumber} - سيتم تحميل النص الحقيقي قريباً`
        }));
    }
    return [];
};

// دالة لجلب الأذكار من API
const fetchAzkar = async (category) => {
    try {
        // استخدام API مجاني للأذكار
        const response = await fetch(`https://raw.githubusercontent.com/osamayy/azkar-api/main/data/azkar.json`);
        const data = await response.json();
        
        if (data && data.content) {
            // تصفية الأذكار حسب الفئة
            let filteredAzkar = [];
            
            if (category === 'morning') {
                filteredAzkar = data.content.morning || [];
            } else if (category === 'evening') {
                filteredAzkar = data.content.evening || [];
            } else if (category === 'sleep') {
                filteredAzkar = data.content.sleep || [];
            } else if (category === 'prayer') {
                filteredAzkar = data.content.prayer || [];
            }
            
            return filteredAzkar.map((zekr, index) => ({
                id: index + 1,
                text: zekr.zekr,
                reference: zekr.reference || "مصدر عام",
                count: zekr.count || 1
            }));
        }
    } catch (error) {
        console.error('Error fetching azkar:', error);
        // بيانات افتراضية في حالة فشل الاتصال
        return getDefaultAzkar(category);
    }
    return [];
};

// بيانات افتراضية للأذكار في حالة فشل الاتصال بالـ API
const getDefaultAzkar = (category) => {
    const defaultAzkar = {
        morning: [
            {
                id: 1,
                text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ: اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضِ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
                reference: "سورة البقرة: 255",
                count: 1
            }
        ],
        evening: [
            {
                id: 1,
                text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
                reference: "رواه مسلم",
                count: 1
            }
        ],
        sleep: [
            {
                id: 1,
                text: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
                reference: "رواه البخاري",
                count: 1
            }
        ],
        prayer: [
            {
                id: 1,
                text: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ",
                reference: "متفق عليه",
                count: 33
            }
        ]
    };
    
    return defaultAzkar[category] || [];
};

// دالة لجلب الأحاديث من API
const fetchHadith = async () => {
    try {
        // استخدام API مجاني للأحاديث
        const response = await fetch(`https://api.hadith.sutanlab.id/books/bukhari?range=1-10`);
        const data = await response.json();
        
        if (data.code === 200 && data.data) {
            return data.data.hadiths.map((hadith, index) => ({
                id: index + 1,
                text: hadith.arab,
                reference: `رواه البخاري - ${hadith.number}`,
                category: "أحاديث"
            }));
        }
    } catch (error) {
        console.error('Error fetching hadith:', error);
        // بيانات افتراضية في حالة فشل الاتصال
        return [
            {
                id: 1,
                text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى",
                reference: "رواه البخاري ومسلم",
                category: "نية"
            },
            {
                id: 2,
                text: "من حسن إسلام المرء تركه ما لا يعنيه",
                reference: "رواه الترمذي",
                category: "أخلاق"
            }
        ];
    }
    return [];
};

// مكون الهيدر
const Header = ({ currentPage, setCurrentPage }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'الرئيسية', icon: 'fas fa-home' },
        { id: 'azkar', label: 'الأذكار', icon: 'fas fa-pray' },
        { id: 'hadith', label: 'الأحاديث', icon: 'fas fa-book' },
        { id: 'arkan', label: 'أركان الإسلام', icon: 'fas fa-mosque' },
        { id: 'ahkam', label: 'الأحكام', icon: 'fas fa-scale-balanced' },
        { id: 'quran', label: 'القرآن', icon: 'fas fa-quran' },
        { id: 'prayer', label: 'أوقات الصلاة', icon: 'fas fa-clock' }
    ];

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <i className="fas fa-mosque"></i>
                        <h1>استقامة</h1>
                    </div>
                    
                    <button 
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    
                    <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
                        {navItems.map(item => (
                            <a
                                key={item.id}
                                href="#"
                                className={currentPage === item.id ? 'active' : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(item.id);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <i className={item.icon}></i> {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

// مكون البطاقة
const ZekrCard = ({ zekr, onCountChange }) => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        onCountChange(zekr.id, newCount);
    };

    const handleDecrement = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            onCountChange(zekr.id, newCount);
        }
    };

    return (
        <div className="zekr-card fade-in">
            <div className="zekr-text">{zekr.text}</div>
            <div className="zekr-reference">{zekr.reference}</div>
            <div className="counter">
                <button className="count-btn" onClick={handleDecrement}>-</button>
                <span className="count-display">{count}</span>
                <button className="count-btn" onClick={handleIncrement}>+</button>
            </div>
        </div>
    );
};

// مكون أوقات الصلاة
const PrayerTimes = () => {
    const [currentTime, setCurrentTime] = useState(moment());
    const [prayerTimes, setPrayerTimes] = useState({
        fajr: '04:30',
        sunrise: '06:00',
        dhuhr: '12:15',
        asr: '15:45',
        maghrib: '18:30',
        isha: '20:00'
    });
    const [nextPrayer, setNextPrayer] = useState({ prayer: 'fajr', time: '04:30' });
    const [timeRemaining, setTimeRemaining] = useState('');
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);

    // دالة للحصول على موقع المستخدم
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    setLocationError(null);
                    fetchPrayerTimes(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setLocationError('فشل في الحصول على الموقع. سيتم استخدام موقع افتراضي.');
                    // استخدام موقع افتراضي (مكة المكرمة)
                    fetchPrayerTimes(21.4225, 39.8262);
                }
            );
        } else {
            setLocationError('المتصفح لا يدعم خدمة تحديد الموقع. سيتم استخدام موقع افتراضي.');
            fetchPrayerTimes(21.4225, 39.8262); // مكة المكرمة
        }
    };

    // دالة للحصول على أوقات الصلاة الحقيقية (API)
    const fetchPrayerTimes = async (lat, lng) => {
        try {
            // استخدام API مجاني لأوقات الصلاة مع الإحداثيات
            const today = moment().format('DD-MM-YYYY');
            const response = await fetch(`https://api.aladhan.com/v1/timings/${today}?latitude=${lat}&longitude=${lng}&method=2`);
            const data = await response.json();
            
            if (data.code === 200) {
                const timings = data.data.timings;
                setPrayerTimes({
                    fajr: timings.Fajr,
                    sunrise: timings.Sunrise,
                    dhuhr: timings.Dhuhr,
                    asr: timings.Asr,
                    maghrib: timings.Maghrib,
                    isha: timings.Isha
                });
                
                // حساب الصلاة التالية
                calculateNextPrayer(timings);
            }
        } catch (error) {
            console.error('Error fetching prayer times:', error);
            // استخدام أوقات افتراضية في حالة فشل الاتصال
            calculateNextPrayer(prayerTimes);
        }
    };

    // حساب الصلاة التالية والوقت المتبقي
    const calculateNextPrayer = (times) => {
        const now = currentTime.format('HH:mm');
        const prayers = [
            { name: 'fajr', time: times.fajr || times.Fajr },
            { name: 'dhuhr', time: times.dhuhr || times.Dhuhr },
            { name: 'asr', time: times.asr || times.Asr },
            { name: 'maghrib', time: times.maghrib || times.Maghrib },
            { name: 'isha', time: times.isha || times.Isha }
        ];
        
        let nextPrayerFound = false;
        
        for (let prayer of prayers) {
            if (prayer.time > now) {
                setNextPrayer({ prayer: prayer.name, time: prayer.time });
                nextPrayerFound = true;
                
                // حساب الوقت المتبقي
                const prayerTime = moment(prayer.time, 'HH:mm');
                const diff = prayerTime.diff(currentTime);
                const duration = moment.duration(diff);
                
                const hours = Math.floor(duration.asHours());
                const minutes = duration.minutes();
                const seconds = duration.seconds();
                
                setTimeRemaining(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                break;
            }
        }
        
        // إذا لم نجد صلاة قادمة (بعد العشاء)، نعود للفجر
        if (!nextPrayerFound) {
            setNextPrayer({ prayer: 'fajr', time: times.fajr || times.Fajr });
            
            // حساب الوقت المتبقي للفجر (اليوم التالي)
            const fajrTime = moment(times.fajr || times.Fajr, 'HH:mm').add(1, 'day');
            const diff = fajrTime.diff(currentTime);
            const duration = moment.duration(diff);
            
            const hours = Math.floor(duration.asHours());
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            
            setTimeRemaining(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
    };

    useEffect(() => {
        getUserLocation();
        
        const timer = setInterval(() => {
            setCurrentTime(moment());
            if (userLocation) {
                calculateNextPrayer(prayerTimes);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [userLocation]);

    return (
        <div className="prayer-times">
            <div className="container">
                <h3 className="section-title" style={{color: 'white'}}>أوقات الصلاة</h3>
                
                {locationError && (
                    <div className="location-error">
                        <i className="fas fa-exclamation-triangle"></i> {locationError}
                    </div>
                )}
                
                {userLocation && (
                    <div className="location-info">
                        <i className="fas fa-location-dot"></i> 
                        يتم عرض أوقات الصلاة حسب موقعك الجغرافي
                    </div>
                )}
                
                <div className="prayer-container">
                    {Object.entries(prayerTimes).map(([prayer, time]) => (
                        <div 
                            key={prayer} 
                            className={`prayer-item ${nextPrayer.prayer === prayer ? 'active' : ''}`}
                        >
                            <div className="prayer-name">
                                {prayer === 'fajr' && 'الفجر'}
                                {prayer === 'sunrise' && 'الشروق'}
                                {prayer === 'dhuhr' && 'الظهر'}
                                {prayer === 'asr' && 'العصر'}
                                {prayer === 'maghrib' && 'المغرب'}
                                {prayer === 'isha' && 'العشاء'}
                            </div>
                            <div className="prayer-time">{time}</div>
                        </div>
                    ))}
                </div>
                
                <div className="next-prayer-timer">
                    <div>الصلاة القادمة: 
                        {nextPrayer.prayer === 'fajr' && ' الفجر'}
                        {nextPrayer.prayer === 'dhuhr' && ' الظهر'}
                        {nextPrayer.prayer === 'asr' && ' العصر'}
                        {nextPrayer.prayer === 'maghrib' && ' المغرب'}
                        {nextPrayer.prayer === 'isha' && ' العشاء'}
                    </div>
                    <div className="timer">{timeRemaining}</div>
                    <div>التوقيت الحالي: {currentTime.format('HH:mm:ss')}</div>
                </div>
            </div>
        </div>
    );
};

// مكون سورة القرآن (بدون صوتيات)
const SurahCard = ({ surah, onSurahSelect }) => {
    return (
        <div className="surah-card fade-in" onClick={() => onSurahSelect(surah)}>
            <div className="surah-header">
                <div className="surah-number">{surah.order}</div>
                <div className="surah-name">سورة {surah.name}</div>
            </div>
            
            <div className="surah-details">
                <div>عدد الآيات: {surah.verses}</div>
                <div>نوع السورة: {surah.type}</div>
                <div>الصفحات: {surah.pages.join(' - ')}</div>
            </div>
            
            <button className="btn" style={{width: '100%'}}>
                <i className="fas fa-book-open"></i> قراءة السورة
            </button>
        </div>
    );
};

// مكون عرض السورة مع الآيات
const SurahWithVerses = ({ surah, onBack }) => {
    const [verses, setVerses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const versesPerPage = 20;

    useEffect(() => {
        const loadVerses = async () => {
            setLoading(true);
            const versesData = await fetchSurahVerses(surah.order);
            setVerses(versesData);
            setLoading(false);
        };

        if (surah) {
            loadVerses();
        }
    }, [surah]);

    // حساب الآيات للصفحة الحالية
    const indexOfLastVerse = currentPage * versesPerPage;
    const indexOfFirstVerse = indexOfLastVerse - versesPerPage;
    const currentVerses = verses.slice(indexOfFirstVerse, indexOfLastVerse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(verses.length / versesPerPage);

    return (
        <div className="surah-details-page">
            <div className="surah-header-card">
                <button className="back-btn" onClick={onBack}>
                    <i className="fas fa-arrow-right"></i> العودة للقائمة
                </button>
                <div className="surah-info">
                    <h2>سورة {surah.name}</h2>
                    <div className="surah-meta">
                        <span>عدد الآيات: {surah.verses}</span>
                        <span>نوع السورة: {surah.type}</span>
                        <span>الصفحات: {surah.pages.join(' - ')}</span>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading">
                    <i className="fas fa-spinner fa-spin"></i> جاري تحميل الآيات...
                </div>
            ) : (
                <>
                    <div className="verses-container">
                        {currentVerses.map((verse) => (
                            <div key={verse.number} className="verse-card">
                                <div className="verse-number">{verse.numberInSurah}</div>
                                <div className="verse-text">{verse.text}</div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button 
                                onClick={() => paginate(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className="page-btn"
                            >
                                <i className="fas fa-chevron-right"></i> السابق
                            </button>
                            
                            <span className="page-info">
                                صفحة {currentPage} من {totalPages}
                            </span>
                            
                            <button 
                                onClick={() => paginate(currentPage + 1)} 
                                disabled={currentPage === totalPages}
                                className="page-btn"
                            >
                                التالي <i className="fas fa-chevron-left"></i>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// الصفحة الرئيسية
const HomePage = ({ setCurrentPage }) => {
    const features = [
        {
            icon: 'fas fa-pray',
            title: 'الأذكار اليومية',
            description: 'أذكار الصباح والمساء وأذكار النوم وأذكار الصلاة',
            link: 'azkar'
        },
        {
            icon: 'fas fa-book',
            title: 'الأحاديث النبوية',
            description: 'مجموعة مختارة من الأحاديث الصحيحة',
            link: 'hadith'
        },
        {
            icon: 'fas fa-mosque',
            title: 'أركان الإسلام',
            description: 'تعرف على أركان الإسلام الخمسة بالتفصيل',
            link: 'arkan'
        },
        {
            icon: 'fas fa-scale-balanced',
            title: 'الأحكام الفقهية',
            description: 'أهم الأحكام الفقهية في العبادات والمعاملات',
            link: 'ahkam'
        },
        {
            icon: 'fas fa-quran',
            title: 'القرآن الكريم',
            description: 'قراءة القرآن الكريم كاملاً مع التفسير',
            link: 'quran'
        },
        {
            icon: 'fas fa-clock',
            title: 'أوقات الصلاة',
            description: 'مواقيت الصلاة حسب توقيت مدينتك',
            link: 'prayer'
        }
    ];

    return (
        <div>
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h2>مرحباً بكم في استقامة</h2>
                        <p>موقع متكامل للأذكار اليومية، الأحاديث النبوية، أركان الإسلام، وأحكام الفقه. اجعل ذكر الله جزءاً من يومك مع استقامة.</p>
                        <button 
                            className="btn"
                            onClick={() => setCurrentPage('azkar')}
                        >
                            ابدأ بالأذكار
                        </button>
                    </div>
                </div>
            </section>

            <PrayerTimes />

            <section className="section">
                <div className="container">
                    <h2 className="section-title">خدمات الموقع</h2>
                    <div className="cards-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="card fade-in">
                                <div className="card-icon">
                                    <i className={feature.icon}></i>
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                                <button 
                                    className="btn btn-outline"
                                    onClick={() => setCurrentPage(feature.link)}
                                >
                                    ابدأ الآن
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// صفحة الأذكار
const AzkarPage = () => {
    const [activeCategory, setActiveCategory] = useState('morning');
    const [counts, setCounts] = useState({});
    const [azkar, setAzkar] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCountChange = (zekrId, count) => {
        setCounts(prev => ({
            ...prev,
            [zekrId]: count
        }));
    };

    const categories = [
        { id: 'morning', label: 'أذكار الصباح', icon: 'fas fa-sun' },
        { id: 'evening', label: 'أذكار المساء', icon: 'fas fa-moon' },
        { id: 'sleep', label: 'أذكار النوم', icon: 'fas fa-bed' },
        { id: 'prayer', label: 'أذكار الصلاة', icon: 'fas fa-pray' }
    ];

    useEffect(() => {
        const loadAzkar = async () => {
            setLoading(true);
            const azkarData = await fetchAzkar(activeCategory);
            setAzkar(azkarData);
            setLoading(false);
        };

        loadAzkar();
    }, [activeCategory]);

    return (
        <div className="section">
            <div className="container">
                <h2 className="section-title">الأذكار اليومية</h2>
                
                <div className="categories">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <i className={category.icon}></i> {category.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="loading">
                        <i className="fas fa-spinner fa-spin"></i> جاري تحميل الأذكار...
                    </div>
                ) : (
                    <div>
                        {azkar.map(zekr => (
                            <ZekrCard
                                key={zekr.id}
                                zekr={zekr}
                                onCountChange={handleCountChange}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// صفحة الأحاديث
const HadithPage = () => {
    const [hadiths, setHadiths] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadHadiths = async () => {
            setLoading(true);
            const hadithData = await fetchHadith();
            setHadiths(hadithData);
            setLoading(false);
        };

        loadHadiths();
    }, []);

    return (
        <div className="section">
            <div className="container">
                <h2 className="section-title">الأحاديث النبوية</h2>
                
                {loading ? (
                    <div className="loading">
                        <i className="fas fa-spinner fa-spin"></i> جاري تحميل الأحاديث...
                    </div>
                ) : (
                    <div className="cards-grid">
                        {hadiths.map(hadith => (
                            <div key={hadith.id} className="card fade-in">
                                <div className="card-icon">
                                    <i className="fas fa-quote-right"></i>
                                </div>
                                <p className="zekr-text">{hadith.text}</p>
                                <div className="zekr-reference">{hadith.reference}</div>
                                <div style={{marginTop: '15px', padding: '8px 15px', background: '#f8f9fa', borderRadius: '8px', display: 'inline-block'}}>
                                    {hadith.category}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// صفحة أركان الإسلام
const ArkanPage = () => {
    return (
        <div className="section">
            <div className="container">
                <h2 className="section-title">أركان الإسلام</h2>
                <div className="cards-grid">
                    {arkanData.map(arkan => (
                        <div key={arkan.id} className="card fade-in">
                            <div className="card-icon">
                                <i className="fas fa-star"></i>
                            </div>
                            <h3>{arkan.title}</h3>
                            <p style={{fontWeight: 'bold', color: 'var(--primary)'}}>{arkan.description}</p>
                            <p>{arkan.details}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// صفحة الأحكام
const AhkamPage = () => {
    return (
        <div className="section">
            <div className="container">
                <h2 className="section-title">الأحكام الفقهية</h2>
                <div className="cards-grid">
                    {ahkamData.map(ahkam => (
                        <div key={ahkam.id} className="card fade-in">
                            <div className="card-icon">
                                <i className="fas fa-scale-balanced"></i>
                            </div>
                            <h3>{ahkam.title}</h3>
                            <p>{ahkam.description}</p>
                            <div style={{marginTop: '15px', padding: '8px 15px', background: 'var(--primary-light)', color: 'white', borderRadius: '8px', display: 'inline-block'}}>
                                {ahkam.category}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// صفحة القرآن
const QuranPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSurahs, setFilteredSurahs] = useState(surahsData);
    const [selectedSurah, setSelectedSurah] = useState(null);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredSurahs(surahsData);
        } else {
            const filtered = surahsData.filter(surah => 
                surah.name.includes(searchTerm)
            );
            setFilteredSurahs(filtered);
        }
    }, [searchTerm]);

    if (selectedSurah) {
        return <SurahWithVerses surah={selectedSurah} onBack={() => setSelectedSurah(null)} />;
    }

    return (
        <div className="section">
            <div className="container">
                <h2 className="section-title">القرآن الكريم</h2>
                
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="ابحث عن سورة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="quran-grid">
                    {filteredSurahs.map((surah) => (
                        <SurahCard 
                            key={surah.id} 
                            surah={surah} 
                            onSurahSelect={setSelectedSurah}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// صفحة أوقات الصلاة
const PrayerPage = () => {
    return (
        <div className="section">
            <div className="container">
                <h2 className="section-title">أوقات الصلاة</h2>
                <PrayerTimes />
                <div className="card" style={{textAlign: 'center', marginTop: '2rem'}}>
                    <h3>إعدادات الموقع</h3>
                    <p>يتم عرض أوقات الصلاة حسب موقعك الجغرافي الحالي</p>
                    <button 
                        className="btn" 
                        style={{marginTop: '15px'}}
                        onClick={() => window.location.reload()}
                    >
                        <i className="fas fa-refresh"></i> تحديث الموقع
                    </button>
                </div>
            </div>
        </div>
    );
};

// الفوتر
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>عن استقامة</h3>
                        <p>موقع استقامة هو منصة إسلامية شاملة تهدف إلى مساعدة المسلمين على الالتزام بذكر الله وتعلم أمور دينهم بشكل صحيح وسهل.</p>
                    </div>
                    
                    <div className="footer-column">
                        <h3>روابط سريعة</h3>
                        <ul>
                            <li><a href="#"><i className="fas fa-home"></i> الرئيسية</a></li>
                            <li><a href="#"><i className="fas fa-pray"></i> الأذكار</a></li>
                            <li><a href="#"><i className="fas fa-book"></i> الأحاديث</a></li>
                            <li><a href="#"><i className="fas fa-mosque"></i> أركان الإسلام</a></li>
                            <li><a href="#"><i className="fas fa-scale-balanced"></i> الأحكام</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-column">
                        <h3>اتصل بنا</h3>
                        <ul>
                            <li><i className="fas fa-phone"></i> +201007166173 [يوسف خالد]</li>
                            <li><i className="fas fa-phone"></i> +201004779310 [محمود امام]</li>  
                            <li><i className="fas fa-envelope"></i> yk3804073@gmail.com</li>
                            <li><i className="fas fa-envelope"></i> zeref5482@gmail.com</li>
                            <li><i className="fas fa-location-dot"></i> مصر</li>
                        </ul>
                    </div>
                </div>
                
                <div className="copyright">
                    <p>حقوق الطبع والنشر محفوظة لدى 【يوسف خالد & محمود امام] © 2024</p> 
                </div>
            </div>
        </footer>
    );
};

// المكون الرئيسي
const App = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'azkar':
                return <AzkarPage />;
            case 'hadith':
                return <HadithPage />;
            case 'arkan':
                return <ArkanPage />;
            case 'ahkam':
                return <AhkamPage />;
            case 'quran':
                return <QuranPage />;
            case 'prayer':
                return <PrayerPage />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div>
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main>
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

// render the App
ReactDOM.render(<App />, document.getElementById('root'));
