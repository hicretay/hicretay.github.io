'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables - removed filtering functionality
// No longer needed since all projects are displayed without filters


// work duration variables
const durationElements = document.querySelectorAll("[data-duration]");
const experienceYearsElements = document.querySelectorAll("[data-years-since]");

// parse a "YYYY-MM" value into a date
const parseMonth = function (value) {
  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

// month count, counting both the first and the last month (LinkedIn style)
const monthsBetween = function (start, end) {
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
}

// format a month count as "2 years 7 months"
const formatDuration = function (totalMonths) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);

  return parts.join(" ") || "1 month";
}

// fill every duration element from its start date (and end date, when the role is over)
for (let i = 0; i < durationElements.length; i++) {
  const elem = durationElements[i];
  const start = parseMonth(elem.dataset.start);
  const end = elem.dataset.end ? parseMonth(elem.dataset.end) : new Date();

  elem.textContent = `(${formatDuration(Math.max(monthsBetween(start, end), 1))})`;
}

// fill every "years of experience" element from the date given
for (let i = 0; i < experienceYearsElements.length; i++) {
  const elem = experienceYearsElements[i];
  const years = Math.floor(monthsBetween(parseMonth(elem.dataset.yearsSince), new Date()) / 12);

  elem.textContent = years;
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const target = this.innerHTML.toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.toggle("active", pages[j].dataset.page === target);
    }

    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.toggle("active", navigationLinks[j] === this);
    }

    window.scrollTo(0, 0);

  });
}



// project image lightbox — card images open enlarged instead of navigating away
const lightbox = document.querySelector("[data-lightbox-box]");

if (lightbox) {
  const triggers = Array.from(document.querySelectorAll("[data-lightbox]"));
  const lightboxImg = lightbox.querySelector("[data-lightbox-img]");
  const lightboxCaption = lightbox.querySelector("[data-lightbox-caption]");
  let current = 0;
  let lastFocused = null;

  const show = function (index) {
    current = (index + triggers.length) % triggers.length;
    const trigger = triggers[current];
    lightboxImg.src = trigger.dataset.lightboxSrc;
    lightboxImg.alt = trigger.dataset.lightboxTitle;
    lightboxCaption.textContent = trigger.dataset.lightboxTitle;
  };

  const open = function (index) {
    lastFocused = document.activeElement;
    show(index);
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    requestAnimationFrame(function () {
      lightbox.classList.add("open");
    });
    lightbox.querySelector("[data-lightbox-close]").focus();
  };

  const close = function () {
    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
    setTimeout(function () {
      lightbox.hidden = true;
      lightboxImg.removeAttribute("src");
    }, 200);
    if (lastFocused) lastFocused.focus();
  };

  triggers.forEach(function (trigger, index) {
    trigger.addEventListener("click", function () {
      open(index);
    });
  });

  lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (btn) {
    btn.addEventListener("click", close);
  });

  lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", function () {
    show(current - 1);
  });

  lightbox.querySelector("[data-lightbox-next]").addEventListener("click", function () {
    show(current + 1);
  });

  document.addEventListener("keydown", function (event) {
    if (lightbox.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });
}
