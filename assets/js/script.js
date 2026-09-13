'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



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

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

