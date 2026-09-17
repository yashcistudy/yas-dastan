/**
 * All Persian copy for the experience lives here so writing stays editable
 * without touching components.
 *
 * Content rule for this project: every fact, title, number and quote below
 * comes from the files Yas provided (content report, scenarios, briefs,
 * catalogues, blog skill). Nothing is invented. Missing information is marked
 * with a comment instead of being filled in.
 */

export const chapters = [
  { id: 'start', label: 'ورود' },
  { id: 'about', label: 'من کی هستم؟' },
  { id: 'projects', label: 'پروژه‌ها' },
  { id: 'process', label: 'روش کار من' },
  { id: 'contact', label: 'تماس' }
]

/**
 * One place for the contact details, so the email is changed once and used by
 * every call to action.
 */
export const CONTACT_EMAIL = 'yasamin002d@gmail.com'
export const CONTACT_PHONE = '۰۹۱۰۳۴۵۳۵۱۹'
export const CONTACT_PHONE_RAW = '+989103453519'
const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('پیشنهاد همکاری')}`

export const hero = {
  hello: 'سلام!',
  // Read by screen readers and search engines, since the visible H1 is just a greeting.
  seoTitle: 'یاس دستان، طراح تجربه، کپی‌رایتر و استراتژیست محتوا',
  name: 'من یاس هستم.',
  role: 'طراح، کپی‌رایتر و استراتژیست محتوا؛',
  welcome: 'به پورتفولیوی من خوش اومدید!',
  note: 'اینجا میز کار منه. هنوز همه‌چیز سر جاش نیست. نشانگر رو روی کاغذها بکشید تا ببینید فکرها چطور مرتب می‌شن.',
  ctaPrimary: { label: 'پیشنهاد همکاری', href: '#contact' },
  ctaSecondary: { label: 'دانلود رزومه (PDF)', href: './yas-dastan-cv.pdf' },
  organizedLine: 'میز مرتب شد. همین کار رو با محتوا هم می‌کنم: از پراکندگی تا ساختار.',
  progressLabel: 'مرتب‌شده',
  resetLabel: 'دوباره به‌هم بریز',
  scrollHint: 'بقیه‌ش پایین‌تره'
}

/**
 * Desk fragments. Each one is a real piece of Yas's work.
 * `group` decides where the fragment lands once the visitor organizes the desk,
 * and mirrors the working method shown in the «روش کار من» chapter.
 */
export const fragments = [
  { id: 'f1', group: 'idea', text: 'تو کدوم مدل بازیکنی؟', source: 'سناریو ریلز چهرهٔ واقعی پلیرها' },
  { id: 'f2', group: 'idea', text: 'نیم ساعته دارین بازی انتخاب می‌کنین! بسه دیگه!', source: 'سناریو معرفی ۴ بازی دورهمی' },
  { id: 'f3', group: 'idea', text: 'روز اول کاری یا با یه پوشه فایل شروع می‌شه… یا با یه مأموریت!', source: 'سناریو ریلز گیمیفیکیشن آنبوردینگ' },
  { id: 'f4', group: 'story', text: 'رضا سه ساله توی این شرکته، ولی بیشتر از رضا به آب‌سردکن توجه می‌شه.', source: 'سناریو ریلز رضا، کارمند نامرئی' },
  { id: 'f5', group: 'story', text: 'قانون‌دان اعصاب‌خردکن!', source: 'تایپوگرافی ریلز پلیرها' },
  { id: 'f6', group: 'story', text: 'خائن معصوم!', source: 'تایپوگرافی ریلز پلیرها' },
  { id: 'f7', group: 'story', text: 'چیزی که گم شده بود فقط یک قطعه نبود؛ فهم مشترک بود.', source: 'پروندهٔ قطعه گمشده، کادک' },
  { id: 'f8', group: 'system', text: 'از شنیدن تا تجربه', source: 'بریف کاتالوگ بازی‌وارسازی مهرایان' },
  { id: 'f9', group: 'system', text: 'GB BLOG: Concordia', source: 'اسکیل بلاگ‌نویسی گیک‌بازی' },
  { id: 'f10', group: 'system', text: 'بازی هدف نیست؛ روشی‌ست برای ساختن موقعیتِ مشارکت.', source: 'بریف کاتالوگ مهرایان' },
  { id: 'f11', group: 'result', text: 'تاس بریز، جایزه بگیر!', source: 'کمپین جفت شیش ۱۴۰۲' },
  { id: 'f12', group: 'result', text: '۶ قطعه لگو، ۱ میلیون سازه!', source: 'چالش اردک لگویی' },
  { id: 'f13', group: 'result', text: '«دورهمیم چی بازی کنیم؟» ۱۳۰ هزار بازدید', source: 'گزارش محتوا، اینستاگرام' },
  { id: 'f14', group: 'result', text: '۵۶۷ هزار بازدید در یک سال', source: 'گزارش محتوا، یوتیوب' }
]

export const fragmentGroups = [
  { id: 'idea', label: 'ایده', color: 'var(--ochre)' },
  { id: 'story', label: 'روایت', color: 'var(--brick)' },
  { id: 'system', label: 'ساختار', color: 'var(--olive)' },
  { id: 'result', label: 'نتیجه', color: 'var(--rust)' }
]

export const about = {
  kicker: 'فصل دوم',
  title: 'من کی هستم؟',
  lead: 'من متن رو با یک هدف می‌نویسم: فهمیده بشه.',
  story: [
    'کار من از یک جای شلوغ شروع می‌شه: یک عالمه اطلاعات، چند تا نظر متفاوت، یک محصول که خودش رو کامل توضیح نمی‌ده و مخاطبی که فرصت کمی برای فهمیدن داره.',
    'کاری که می‌کنم اینه: می‌گردم دنبال معنی. بعد تصمیم می‌گیرم مخاطب اول چی ببینه، بعد چی بفهمه، کجا حس اعتماد کنه و کجا بخنده و بمونه.',
    'برای من پیام یعنی تجربه. یک ویدیو، یک دفترچهٔ قانون، یک صفحهٔ کاتالوگ و یک بازی سازمانی، همه‌شون یک کار مشترک می‌کنن: آدم رو از نقطهٔ «نمی‌دونم این چیه» می‌رسونن به نقطهٔ «فهمیدم و می‌خوام امتحانش کنم».'
  ],
  skills: [
    'استراتژی محتوا',
    'مدیریت کمپین',
    'کپی‌رایتینگ',
    'سناریونویسی ریلز و ویدیو',
    'UX رایتینگ',
    'روایت برند',
    'بازی‌وارسازی',
    'دفترچهٔ قانون و راهنمای بازی',
    'گزارش و تحلیل عملکرد محتوا'
  ]
}

export const process = {
  kicker: 'فصل چهارم',
  title: 'روش کار من',
  lead: 'همون اتفاقی که اول این صفحه افتاد، روش کار منه. چیزهای پراکنده وارد می‌شن و یک مسیر روشن بیرون میاد.',
  steps: [
    {
      id: 'raw',
      title: 'ایدهٔ خام',
      text: 'هر چیزی که هست جمع می‌شه: حرف تیم، سؤال مخاطب، بازی روی میز، دادهٔ پنل.',
      example: 'برای ریلز «چی بازی کنیم؟» نقطهٔ شروع یک جملهٔ تکراری بین آدم‌ها بود: نیم ساعته داریم بازی انتخاب می‌کنیم.'
    },
    {
      id: 'research',
      title: 'تحقیق',
      text: 'قبل از نوشتن، منبع می‌خونم. قانون بازی، فایل مشتری، آمار کانال و کاری که قبلاً جواب داده.',
      example: 'برای مقاله‌های گیک‌بازی یک پروتکل تحقیق نوشتم تا هر مقاله قبل از نوشتن، منبع و نسخهٔ درست بازی رو تأیید کنه.'
    },
    {
      id: 'strategy',
      title: 'استراتژی',
      text: 'تصمیم می‌گیرم این محتوا برای کیه، چه کاری باید بکنه و کجا منتشر می‌شه.',
      example: 'در بریف کاتالوگ مهرایان، ترتیب روایت قبل از متن تعیین شد: تعریف، سه کاربرد، نقش مهرایان، شروع همکاری.'
    },
    {
      id: 'story',
      title: 'روایت',
      text: 'موضوع تبدیل به آدم، صحنه و لحن می‌شه. همین‌جاست که متن قابل حس شدن می‌شه.',
      example: 'رضای کارمند نامرئی، شخصیتی بود برای توضیح چیزی که با اسلاید توضیح داده نمی‌شد.'
    },
    {
      id: 'experience',
      title: 'تجربه',
      text: 'روایت وارد قالب می‌شه: ریلز، ویدیوی بلند، دفترچه، کاتالوگ یا بازی سازمانی.',
      example: 'پروندهٔ قطعه گمشده برای کادک، در چند مرحله گروه‌ها رو به هم می‌رسونه تا اطلاعات ناقص کنار هم معنی پیدا کنه.'
    },
    {
      id: 'result',
      title: 'نتیجه',
      text: 'عدد و بازخورد رو نگاه می‌کنم و دفعهٔ بعد را بر اساسش تصحیح می‌کنم.',
      example: 'گزارش روند آپارات نشان داد بازدید و مدت تماشا با هم بالا رفتن، یعنی رشد از جنس کلیک سطحی نبود.'
    }
  ]
}

export const contact = {
  kicker: 'فصل آخر',
  title: 'بقیه‌ش با شما',
  lines: [
    'اگر تا اینجا اومدید، یعنی یک چیزی توی این مسیر براتون جالب بوده. خوشحال می‌شم بشنوم چی بود.',
    'اگر پروژه‌ای دارید که هنوز شکل نگرفته و پر از تکه‌های پراکنده‌ست، دقیقاً همون‌جایی‌ست که کار من شروع می‌شه.'
  ],
  actions: [
    { label: 'پیشنهاد همکاری', href: mailto, primary: true },
    { label: 'دانلود رزومه (PDF)', href: './yas-dastan-cv.pdf', primary: false }
  ],
  form: {
    endpoint: 'https://formspree.io/f/mljdeegg',
    title: 'بگویید دنبال چه چیزی هستید',
    lead: 'یک فرم کوتاه. نقش‌ها همان کارهایی‌ست که در همین صفحه دیدید، پس می‌دانم دربارهٔ چه چیزی حرف می‌زنیم.',
    roles: [
      'استراتژی و تقویم محتوا',
      'سناریو و کارگردانی ویدیو',
      'کپی‌رایتینگ و روایت برند',
      'UX رایتینگ و متن محصول',
      'بازی‌وارسازی و تجربهٔ تعاملی',
      'کاتالوگ، بریف و مستند سازمانی',
      'سئو و محتوای متنی',
      'چیز دیگری در ذهن دارم'
    ],
    fields: {
      name: 'اسم شما',
      contact: 'ایمیل یا شمارهٔ تماس',
      role: 'موضوع همکاری',
      message: 'کوتاه بگویید ماجرا چیست'
    },
    submit: 'بفرست',
    sending: 'در حال ارسال…',
    success: 'رسید. زود جواب می‌دهم.',
    error: 'ارسال نشد. می‌توانید مستقیم ایمیل بزنید یا پیام بدهید.'
  },
  channels: [
    { label: 'کانال آپارات گیک‌بازی', href: 'https://www.aparat.com/geekbazi' },
    { label: 'اینستاگرام گیک‌بازی', href: 'https://www.instagram.com/geek.bazi/' },
    { label: 'سایت امید حیدری', href: 'https://yashcistudy.github.io/omidheidariv2/' },
    { label: 'لینکدین', href: 'https://www.linkedin.com/in/yas-dastan-127910333' },
    { label: 'ایمیل', href: `mailto:${CONTACT_EMAIL}` }
    // add Yas's personal Instagram here once confirmed
  ],
  footerLine: 'من متن رو با یک هدف می‌نویسم: فهمیده بشه.',
  signature: 'طراحی تجربه و روایت: یاس دستان'
  // add verified availability line (full time / project based) before publishing

}

/**
 * «Who I am» as a small interaction instead of three summary cards. Each answer
 * is in my own voice and points at work that exists on this page.
 */
export const aboutGame = {
  title: 'چی می‌خوایید از من بپرسید؟',
  hint: 'یکی از این سوال‌ها رو بزنید، جواب می‌دم',
  empty: 'هر سوالی رو بزنید، جوابش رو همین‌جا می‌نویسم.',
  done: 'همهٔ سوال‌ها رو پرسیدید. بقیهٔ جواب‌ها توی پروژه‌های پایینه.',
  prompts: [
    {
      q: 'از کجا شروع می‌کنی؟',
      a: 'از منبع. قانون بازی رو می‌خونم، فایل مشتری رو می‌خونم، عدد پنل رو نگاه می‌کنم، بعد می‌نویسم. برای مقاله‌های گیک‌بازی یه پروتکل تحقیق نوشتم تا این مرحله جا نمونه.',
      source: 'اسکیل بلاگ‌نویسی گیک‌بازی، در آرشیو قابل دانلوده'
    },
    {
      q: 'با متن پیچیده چی کار می‌کنی؟',
      a: 'مرتبش می‌کنم. دفترچهٔ قانون سنگین رو کوتاه نمی‌کنم؛ ترتیبش رو عوض می‌کنم تا بازیکن با هر صفحه یه قدم جلوتر بره.',
      source: 'شش دفترچهٔ قانون فارسی، در بخش گیک‌بازی'
    },
    {
      q: 'چطور مطمئن می‌شی پیام رسیده؟',
      a: 'مخاطب رو می‌برم توی موقعیت. رضای کارمند نامرئی رو ساختم تا گیمیفیکیشن سازمانی دیده بشه، نه شنیده.',
      source: 'سناریوی ریلز رضا، در بخش گیک‌بازی'
    },
    {
      q: 'کار تموم شد، بعد؟',
      a: 'می‌نویسمش تا دوباره قابل تکرار بشه. تقویم تولید، بریف گرافیست و گزارش روند کانال همین‌طور ساخته شدن.',
      source: 'بخش سیستم‌های محتوایی همین صفحه'
    },
    {
      q: 'چرا بازی؟',
      a: 'چون بازی به مخاطب نقش می‌ده. آدمی که انتخاب می‌کنه و نتیجهٔ انتخابش رو می‌بینه، پیام رو یادش می‌مونه.',
      source: 'بریف بازی‌وارسازی مهرایان'
    }
  ]
}
