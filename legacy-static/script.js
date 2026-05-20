(function () {
  "use strict";

  /* ─── Translations ─── */
  var i18n = {
    en: {
      "nav-home": "Home",
      "nav-portfolio": "Portfolio",
      "nav-about": "About",
      "nav-download": "Download Resume",

      "hero-title": 'I take <span class="text--accent">110-hour processes</span> and turn them into 10-minute ones.',
      "hero-status-label": "STATUS",
      "hero-status-value": "Open to your next ops hire — coffee on me if you’re in Paris",
      "hero-subtitle": "I’m Arnaud — Product Operations, builder-side. Currently right hand to the founder at HelloBible, scaling from 15k to 140k users in 14 months. I find the friction. I ship the system that removes it.",
      "hero-download": "Download Resume",
      "hero-see-work": "See what I’ve built",
      "hero-copy-email": "Copy Email",
      "hero-copied": "Copied!",

      "about-title": "About",
      "about-p1": "I’m a Product Operations Specialist who came up the builder way — from machine learning at <strong>Gozem</strong> (an African superapp) to Chief of Staff at <strong>Broke And Abroad</strong> (travel-tech), to now scaling product ops at <strong>HelloBible</strong> from 15k to 140k users.",
      "about-p2": "What I actually do day-to-day: I sit next to a founder, I watch what breaks, and I build the system that keeps it from breaking again. Sometimes that’s a Claude pipeline. Sometimes it’s a Zendesk macro. Sometimes it’s a 90-minute conversation that prevents the wrong feature from getting built.",
      "about-p3": "Background in Financial Data Intelligence (Rennes School of Business, MSc + Grande École). Based in Paris, fluent in English. Working on Bible-reading software is also a quiet mission I care about — I like building things that help people pause.",

      "principles-title": "How I work",
      "principles-subtitle": "Three principles that shape every system I build.",
      "principle-1-title": "Start with the friction, not with the tool.",
      "principle-1-body": "The shiniest stack means nothing if it solves the wrong problem. I watch how people actually work, write down where they curse, then pick the simplest thing that makes the cursing stop.",
      "principle-2-title": "If I can’t explain it in 90 seconds, it’s not done.",
      "principle-2-body": "Clarity is a deliverable. Every system I ship comes with a short Loom, a one-pager, or a back-of-envelope diagram — because a tool nobody understands won’t be maintained, and won’t be trusted.",
      "principle-3-title": "Boring systems that run beat clever systems that don’t.",
      "principle-3-body": "I’ll pick n8n over custom code when it gets the job done. Google Sheets over a “real” database when the team is three people. Compounding reliability beats showing off — every time.",

      "contact-title": "Let’s talk",
      "contact-text": "I’m open to Product Ops, Chief of Staff, and adjacent operations roles — especially at startups between Series A and E where one person can still see the whole picture. Paris-based, remote-friendly.",
      "contact-linkedin": "LinkedIn",
      "contact-download": "Download Resume",
      "contact-copied": "Copied!",

      "portfolio-title": "Portfolio",
      "portfolio-subtitle": "Selected work — operations systems I’ve built",

      "cs1-tag": "AI WORKFLOW AUTOMATION",
      "cs1-title": "YouVersion Reading Plans Translation Pipeline",
      "cs1-context": "HelloBible needed to localize YouVersion reading plans across 50+ languages — a process taking ~110 hours per language manually.",
      "cs1-result": '<strong>110 hours → 10 minutes per language.</strong> Scalable to 50+ languages. Now production-ready infrastructure.',

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
      "cs4-context": "Support agents (myself, solo) couldn’t quickly identify premium users when triaging tickets, causing slower response on high-priority cases.",
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
      "nav-about": "À propos",
      "nav-download": "Télécharger le CV",

      "hero-title": 'Je transforme des <span class="text--accent">processus de 110 heures</span> en processus de 10 minutes.',
      "hero-status-label": "STATUT",
      "hero-status-value": "Ouvert à votre prochain recrutement ops — café offert si vous êtes à Paris",
      "hero-subtitle": "Je suis Arnaud — Product Operations, côté builder. Actuellement bras droit du fondateur chez HelloBible, où je scale de 15k à 140k utilisateurs en 14 mois. J’identifie la friction. Je livre le système qui la fait disparaître.",
      "hero-download": "Télécharger le CV",
      "hero-see-work": "Voir ce que j’ai construit",
      "hero-copy-email": "Copier l’email",
      "hero-copied": "Copié !",

      "about-title": "À propos",
      "about-p1": "Je suis Product Operations Specialist, builder dans l’âme — du machine learning chez <strong>Gozem</strong> (superapp africaine) au poste de Chief of Staff chez <strong>Broke And Abroad</strong> (travel-tech), et aujourd’hui scaling des opérations produit chez <strong>HelloBible</strong> de 15k à 140k utilisateurs.",
      "about-p2": "Ce que je fais concrètement : je m’assieds à côté d’un fondateur, j’observe ce qui casse, et je construis le système qui empêche que ça recasse. Parfois c’est un pipeline Claude. Parfois une macro Zendesk. Parfois une conversation de 90 minutes qui évite de construire la mauvaise feature.",
      "about-p3": "Formation en Financial Data Intelligence (Rennes School of Business, MSc + Grande École). Basé à Paris, courant en anglais. Travailler sur une app de lecture biblique est aussi une mission discrète qui me touche — j’aime construire des choses qui aident les gens à faire une pause.",

      "principles-title": "Comment je travaille",
      "principles-subtitle": "Trois principes qui guident chaque système que je construis.",
      "principle-1-title": "Commencer par la friction, pas par l’outil.",
      "principle-1-body": "La stack la plus brillante ne sert à rien si elle résout le mauvais problème. J’observe comment les gens travaillent vraiment, je note où ils râlent, puis je choisis la chose la plus simple qui fait taire les râlements.",
      "principle-2-title": "Si je ne peux pas l’expliquer en 90 secondes, ce n’est pas fini.",
      "principle-2-body": "La clarté est un livrable. Chaque système que je livre vient avec une Loom courte, un one-pager ou un schéma au dos d’enveloppe — parce qu’un outil que personne ne comprend ne sera ni maintenu, ni adopté.",
      "principle-3-title": "Les systèmes ennuyeux qui tournent battent les systèmes brillants qui plantent.",
      "principle-3-body": "Je choisirai n8n plutôt que du code custom si ça fait le job. Google Sheets plutôt qu’une « vraie » base de données quand l’équipe fait trois personnes. La fiabilité qui compose bat l’esbroufe — à chaque fois.",

      "contact-title": "Parlons-en",
      "contact-text": "Je suis ouvert aux postes de Product Ops, Chief of Staff et opérations connexes — en particulier dans des startups entre Series A et E où une seule personne peut encore voir l’ensemble du tableau. Basé à Paris, ouvert au remote.",
      "contact-linkedin": "LinkedIn",
      "contact-download": "Télécharger le CV",
      "contact-copied": "Copié !",

      "portfolio-title": "Portfolio",
      "portfolio-subtitle": "Travaux sélectionnés — systèmes opérationnels que j’ai construits",

      "cs1-tag": "AUTOMATISATION DE WORKFLOW IA",
      "cs1-title": "Pipeline de Traduction des Plans de Lecture YouVersion",
      "cs1-context": "HelloBible devait localiser des plans de lecture YouVersion dans 50+ langues — un processus prenant ~110 heures par langue manuellement.",
      "cs1-result": '<strong>110 heures → 10 minutes par langue.</strong> Passé à l’échelle sur 50+ langues. Infrastructure prête pour la production.',

      "cs2-tag": "SYSTÈME D’ANALYSE UTILISATEUR",
      "cs2-title": "Pipeline Unifié de Feedback Client",
      "cs2-context": "Rapports de bugs et demandes éparpillés sur 5 canaux (email, Zendesk, WhatsApp beta, App Store, Play Store) sans vue unifiée pour l’équipe produit.",
      "cs2-result": '<strong>Source de vérité unique</strong> pour le feedback utilisateur. Alimente directement les priorités sprint. Temps de grooming du backlog réduit significativement.',

      "cs3-tag": "OUTILLAGE PERSONNEL",
      "cs3-title": "Deux Bots Telegram Utilisés Quotidiennement",
      "cs3-context": "Besoin de rappel instantané du contexte de travail et d’un moyen simple de rester à jour sur les tendances IA/tech sans doom-scrolling.",
      "cs3-result": '<strong>Outils quotidiens</strong> que j’utilise activement dans mon travail. Démontre ma capacité à identifier une friction personnelle et à livrer une solution fonctionnelle de bout en bout.',

      "cs4-tag": "OPÉRATIONS SUPPORT",
      "cs4-title": "Identification Instantanée des Utilisateurs Premium dans le Support",
      "cs4-context": "Les agents support (moi, seul) ne pouvaient pas identifier rapidement les utilisateurs premium lors du triage, causant des réponses plus lentes sur les cas prioritaires.",
      "cs4-result": '<strong>3 200+ tickets résolus.</strong> 80% de couverture macros. Utilisateurs premium identifiés en temps réel. Base pour le passage à l’échelle du support.',

      "skills-title": "Compétences & Outils",
      "skills-ai": "IA & Automatisation",
      "skills-product-ops": "Opérations Produit",
      "skills-data": "Données & Analytics",
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

  /* ─── Scroll reveal animations ─── */
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
