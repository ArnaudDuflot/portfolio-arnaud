/**
 * Portfolio Arnaud Duflot — Minimal JavaScript
 * Handles: mobile burger menu, smooth scroll offset for sticky nav
 */

(function () {
  "use strict";

  var burger = document.querySelector(".nav__burger");
  var nav = document.querySelector(".nav");
  var navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  var navHeight = 64;

  /* Burger menu toggle */
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("nav--open");
      burger.classList.toggle("active");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* Close mobile menu on link click */
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (nav) {
        nav.classList.remove("nav--open");
      }
      if (burger) {
        burger.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* Copy email to clipboard */
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

  /* Smooth scroll with sticky nav offset */
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
        behavior: "smooth",
      });
    });
  });
})();
