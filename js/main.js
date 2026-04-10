document.addEventListener('DOMContentLoaded', () => {
  // スクロールアニメーション
  const animateTargets = document.querySelectorAll(
    '.about__content, .app-card, .indicator-card, .link-item, .section__heading'
  );

  animateTargets.forEach((el) => {
    el.classList.add('fade-in-target');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animateTargets.forEach((el) => observer.observe(el));

  // ナビゲーション: スクロールで背景切り替え + アクティブリンク
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', () => {
    // ナビ背景
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    // アクティブセクション判定
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 80;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('nav__link--active');
      }
    });
  });

  // 言語切り替え
  const i18n = {
    en: {
      hero_subtitle: 'Indie Developer / Android Apps & MT4 Indicators',
      about_catchcopy: 'Making small & fun apps',
      about_desc: 'I develop Android apps with Kotlin and MT4 indicators with MQL4.<br>I aim to create tools that bring a little convenience and joy to people in niche markets.',
      badge_released: 'Released',
      badge_testing: 'Testing',
      badge_dev: 'In Dev',
      jellydo_desc: 'Cozy ToDo list app',
      spinbill_desc: 'Bill splitting app',
      medaka_desc: 'Medaka fish breeding & sales manager',
      clackforge_desc: 'Mechanical keyboard sound calculator',
      acupofmystery_desc: 'Newspaper mystery game in a cafe',
      kogare_desc: 'Slow communication letter app',
      play_badge: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
      indicators_lead: 'Developing & selling indicators for MT4 (MetaTrader 4).',
      badge_new: 'NEW',
      badge_free: 'Free',
      smc_desc: 'Auto-draws 6 SMC (Smart Money Concept) elements + alert notifications',
      cppol_desc: 'Currency Strength Polar Chart — view up to 30 pairs at a glance',
      cppow_desc: 'Currency Pair Volatility Ranking — rate of change for up to 30 pairs',
      cppowfree_desc: 'Free edition of CP-POW — supports up to 5 pairs',
      pialt_desc: 'Price Movement Alert — Alert/Push/Sound on pip threshold',
      udmtf_desc: 'Multi-TimeFrame Direction — see pips difference across all timeframes',
      indicators_platform: 'Available on GogoJungle',
    },
    ja: {
      hero_subtitle: '個人開発者 / Android Apps & MT4 Indicators',
      about_catchcopy: '小さくて楽しいアプリを作っています',
      about_desc: 'Android / Kotlin でアプリ開発、MQL4 で MT4 インジケーター開発をしています。<br>ニッチな市場で、誰かの「ちょっと便利」や「ちょっと楽しい」を届けるものを目指しています。',
      badge_released: 'リリース済',
      badge_testing: 'テスト中',
      badge_dev: '開発中',
      jellydo_desc: '癒し系ToDoリストアプリ',
      spinbill_desc: '割り勘アプリ',
      medaka_desc: 'メダカ飼育・販売管理アプリ',
      clackforge_desc: '打鍵音カスタム電卓アプリ',
      acupofmystery_desc: '喫茶店で謎を解く新聞ミステリーゲーム',
      kogare_desc: 'ゆっくり届くコミュニケーションアプリ',
      play_badge: 'https://play.google.com/intl/en_us/badges/static/images/badges/ja_badge_web_generic.png',
      indicators_lead: 'MT4（MetaTrader 4）向けインジケーターを開発・販売しています。',
      badge_new: 'NEW',
      badge_free: '無料',
      smc_desc: 'SMC（スマートマネーコンセプト）の6要素を全自動描画＋アラート通知',
      cppol_desc: '通貨強弱ポーラーチャート — 最大30通貨ペアの強弱を一覧表示',
      cppow_desc: '通貨ペア変動率ランキング — 最大30通貨ペアの変化率を表示',
      cppowfree_desc: 'CP-POWの無料版 — 最大5通貨ペア対応',
      pialt_desc: '価格変動アラート — Pips設定越えでAlert/Push/Sound通知',
      udmtf_desc: 'マルチタイムフレーム方向表示 — 全時間足のPips差を一目で確認',
      indicators_platform: 'GogoJungleにて販売中',
    }
  };

  let currentLang = 'ja';
  const langToggle = document.getElementById('lang-toggle');

  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ja' ? 'en' : 'ja';
    langToggle.textContent = currentLang === 'ja' ? 'EN' : 'JA';
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = i18n[currentLang][key];
      if (!text) return;

      if (el.hasAttribute('data-i18n-attr')) {
        el.setAttribute(el.getAttribute('data-i18n-attr'), text);
      } else {
        el.innerHTML = text;
      }
    });
  });
});
