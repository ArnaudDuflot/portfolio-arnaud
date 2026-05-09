(function () {
  "use strict";

  /* ─── Translations ─── */
  var i18n = {
    en: {
      "nav-home": "Home",
      "nav-portfolio": "Portfolio",
      "nav-about": "About",
      "nav-download": "Download Resume",

      "hero-title": 'Hi, I\'m Arnaud Duflot, a <span class="text--accent">Product Operations Specialist</span> building AI-powered workflows.',
      "hero-status-label": "STATUS:",
      "hero-status-value": "Open to opportunities",
      "hero-subtitle": "Currently scaling product operations at HelloBible (15k → 140k users in 14 months).",
      "hero-download": "Download Resume",
      "hero-see-work": "See My Work",
      "hero-copy-email": "Copy Email",
      "hero-copied": "Copied!",

      "about-title": "About",
      "about-p1": "I'm a Product Operations Specialist with hands-on AI workflow expertise. I identify operational frictions and build the systems that resolve them \u2014 from automation scripts to QA frameworks to cross-functional process design.",
      "about-p2": 'Currently right hand to the founder at <strong>HelloBible</strong>, where I scale product operations across QA, support, KPIs, and AI tooling. Before that, I was Chief of Staff at <strong>Broke And Abroad</strong> (travel-tech) and built ML churn models at <strong>Gozem</strong> (African superapp).',
      "about-p3": 'Background in Financial Data Intelligence (Rennes School of Business, MSc + Grande \u00c9cole program). Based in Paris, fluent in English.',

      "contact-title": "Let's talk",
      "contact-text": "Open to Product Ops, Chief of Staff, and adjacent operations roles. Based in Paris, open to remote.",
      "contact-linkedin": "LinkedIn",
      "contact-download": "Download Resume",
      "contact-copied": "Copied!",

      "portfolio-title": "Portfolio",
      "portfolio-subtitle": "Selected work \u2014 operations systems I've built",

      "cs1-tag": "AI WORKFLOW AUTOMATION",
      "cs1-title": "YouVersion Reading Plans Translation Pipeline",
      "cs1-context": "HelloBible needed to localize YouVersion reading plans across 50+ languages \u2014 a process taking ~110 hours per language manually.",
      "cs1-result": '<strong>110 hours \u2192 10 minutes per language.</strong> Scalable to 50+ languages. Now production-ready infrastructure.',

      "cs2-tag": "USER INSIGHT SYSTEM",
      "cs2-title": "Cross-Channel Voice of Customer Pipeline",
      "cs2-context": "Bug reports and feature requests scattered across 5 channels (email, Zendesk, WhatsApp beta, App Store, Play Store) with no unified view for the product team.",
      "cs2-result": '<strong>Single source of truth</strong> for user feedback. Directly informs sprint priorities. Reduced backlog grooming time significantly.',

      "cs3-tag": "PERSONAL TOOLING",
      "cs3-title": "Two Telegram Bots Used Daily on the Job",
      "cs3-context": "Needed instant recall of work context and a low-friction way to stay ahead on AI/tech trends without doom-scrolling.",
      "cs3-result": '<strong>Daily-driver tools</strong> I actively use on the job. Demonstrates ability to identify a personal friction and ship a working solution end-to-end.',

      "cs4-tag": "SUPPORT OPS",
      "cs4-title": "Instant Premium User Identification in Support",
      "cs4-context": "Support agents (myself, solo) couldn\u2019t quickly identify premium users when triaging tickets, causing slower response on high-priority cases.",
      "cs4-result": '<strong>3,200+ tickets resolved.</strong> 80% macro coverage. Premium users identified in real-time. Foundation for future support scaling.',

      "skills-title": "Skills & Tools",
      "skills-ai": "AI & Automation",
      "skills-product-ops": "Product Operations",
      "skills-data": "Data & Analytics",
      "skills-support": "Support & CRM",
    },
    fr: {
      "nav-home": "Accueil",
      "nav-portfolio": "Portfolio",
      "nav-about": "\u00c0 propos",
      "nav-download": "T\u00e9l\u00e9charger le CV",

      "hero-title": 'Bonjour, je suis Arnaud Duflot, <span class="text--accent">Product Operations Specialist</span> sp\u00e9cialis\u00e9 dans les workflows IA.',
      "hero-status-label": "STATUT :",
      "hero-status-value": "Ouvert aux opportunit\u00e9s",
      "hero-subtitle": "Je scale actuellement les op\u00e9rations produit chez HelloBible (15k \u2192 140k utilisateurs en 14 mois).",
      "hero-download": "T\u00e9l\u00e9charger le CV",
      "hero-see-work": "Voir mon travail",
      "hero-copy-email": "Copier l\u2019email",
      "hero-copied": "Copi\u00e9 !",

      "about-title": "\u00c0 propos",
      "about-p1": "Je suis Product Operations Specialist avec une expertise pratique en workflows IA. J\u2019identifie les frictions op\u00e9rationnelles et construis les syst\u00e8mes qui les r\u00e9solvent \u2014 de l\u2019automatisation aux frameworks QA en passant par la conception de processus cross-fonctionnels.",
      "about-p2": 'Actuellement bras droit du fondateur chez <strong>HelloBible</strong>, o\u00f9 je scale les op\u00e9rations produit \u00e0 travers le QA, le support, les KPIs et les outils IA. Avant cela, j\u2019\u00e9tais Chief of Staff chez <strong>Broke And Abroad</strong> (travel-tech) et j\u2019ai construit des mod\u00e8les ML de churn chez <strong>Gozem</strong> (superapp africaine).',
      "about-p3": 'Formation en Financial Data Intelligence (Rennes School of Business, MSc + programme Grande \u00c9cole). Bas\u00e9 \u00e0 Paris, courant en anglais.',

      "contact-title": "Parlons-en",
      "contact-text": "Ouvert aux postes de Product Ops, Chief of Staff et op\u00e9rations connexes. Bas\u00e9 \u00e0 Paris, ouvert au remote.",
      "contact-linkedin": "LinkedIn",
      "contact-download": "T\u00e9l\u00e9charger le CV",
      "contact-copied": "Copi\u00e9 !",

      "portfolio-title": "Portfolio",
      "portfolio-subtitle": "Travaux s\u00e9lectionn\u00e9s \u2014 syst\u00e8mes op\u00e9rationnels que j\u2019ai construits",

      "cs1-tag": "AUTOMATISATION DE WORKFLOW IA",
      "cs1-title": "Pipeline de Traduction des Plans de Lecture YouVersion",
      "cs1-context": "HelloBible devait localiser des plans de lecture YouVersion dans 50+ langues \u2014 un processus prenant ~110 heures par langue manuellement.",
      "cs1-result": '<strong>110 heures \u2192 10 minutes par langue.</strong> Pass\u00e9 \u00e0 l\u2019\u00e9chelle sur 50+ langues. Infrastructure pr\u00eate pour la production.',

      "cs2-tag": "SYST\u00c8ME D\u2019ANALYSE UTILISATEUR",
      "cs2-title": "Pipeline Unifi\u00e9 de Feedback Client",
      "cs2-context": "Rapports de bugs et demandes \u00e9parpill\u00e9s sur 5 canaux (email, Zendesk, WhatsApp beta, App Store, Play Store) sans vue unifi\u00e9e pour l\u2019\u00e9quipe produit.",
      "cs2-result": '<strong>Source de v\u00e9rit\u00e9 unique</strong> pour le feedback utilisateur. Alimente directement les priorit\u00e9s sprint. Temps de grooming du backlog r\u00e9duit significativement.',

      "cs3-tag": "OUTILLAGE PERSONNEL",
      "cs3-title": "Deux Bots Telegram Utilis\u00e9s Quotidiennement",
      "cs3-context": "Besoin de rappel instantan\u00e9 du contexte de travail et d\u2019un moyen simple de rester \u00e0 jour sur les tendances IA/tech sans doom-scrolling.",
      "cs3-result": '<strong>Outils quotidiens</strong> que j\u2019utilise activement dans mon travail. D\u00e9montre ma capacit\u00e9 \u00e0 identifier une friction personnelle et \u00e0 livrer une solution fonctionnelle de bout en bout.',

      "cs4-tag": "OP\u00c9RATIONS SUPPORT",
      "cs4-title": "Identification Instantan\u00e9e des Utilisateurs Premium dans le Support",
      "cs4-context": "Les agents support (moi, seul) ne pouvaient pas identifier rapidement les utilisateurs premium lors du triage, causant des r\u00e9ponses plus lentes sur les cas prioritaires.",
      "cs4-result": '<strong>3 200+ tickets r\u00e9solus.</strong> 80% de couverture macros. Utilisateurs premium identifi\u00e9s en temps r\u00e9el. Base pour le passage \u00e0 l\u2019\u00e9chelle du support.',

      "skills-title": "Comp\u00e9tences & Outils",
      "skills-ai": "IA & Automatisation",
      "skills-product-ops": "Op\u00e9rations Produit",
      "skills-data": "Donn\u00e9es & Analytics",
      "skills-support": "Support & CRM",
    }
  };

  /* ─── Language switcher ─── */
  var currentLang;

  function getInitialLang() {
    var stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "fr") return stored;
    return "en";
  }

  function applyLang(lang) {
    var keys = i18n[lang];
    if (!keys) return;
    currentLang = lang;
    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (keys[key] !== undefined) {
        el.innerHTML = keys[key];
      }
    });

    document.documentElement.lang = lang === "fr" ? "fr" : "en";

    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.textContent = lang === "fr" ? "🇬🇧 English" : "🇫🇷 Français";
    }
  }

  function toggleLang() {
    var next = currentLang === "en" ? "fr" : "en";
    applyLang(next);
  }

  /* Init */
  applyLang(getInitialLang());

  var langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", toggleLang);
  }

  /* ─── Burger menu ─── */
  var burger = document.querySelector(".nav__burger");
  var nav = document.querySelector(".nav");
  var navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  var navHeight = 64;

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("nav--open");
      burger.classList.toggle("active");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (nav) nav.classList.remove("nav--open");
      if (burger) {
        burger.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ─── Copy email to clipboard ─── */
  var emailAddress = "duflot.arnaud@gmail.com";

  function setupCopyButton(btnId, toastId) {
    var btn = document.getElementById(btnId);
    var toast = document.getElementById(toastId);
    if (!btn || !toast) return;

    btn.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailAddress).then(function () {
          showCopied(toast);
        }).catch(function () {
          fallbackCopy(emailAddress, toast);
        });
      } else {
        fallbackCopy(emailAddress, toast);
      }
    });
  }

  function fallbackCopy(text, toast) {
    var input = document.createElement("input");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
      showCopied(toast);
    } catch (e) {}
    document.body.removeChild(input);
  }

  function showCopied(toast) {
    toast.classList.add("visible");
    setTimeout(function () {
      toast.classList.remove("visible");
    }, 2000);
  }

  setupCopyButton("copyEmailBtn", "copyToast");
  setupCopyButton("copyEmailContact", "copyToastContact");

  /* ─── Smooth scroll ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: top,
        behavior: "smooth"
      });
    });
  });
})();
