// Variables
const cards = document.querySelector(".cards");

const clearButton = document.querySelector(".clear-button");

const filterContainer = document.querySelector(".filter-container");

const filterOptions = document.querySelector(".filter-options");

let tagsArray = [];
let filters = [];

// Render card
const renderCard = function (array) {
  array.forEach((jobAd) => {
    let newButton = "";
    if (jobAd.new == true) {
      newButton += `<button class="new-btn">New</button>`;
    } else {
      newButton = "";
    }

    let featureBtn = "";
    if (jobAd.featured == true) {
      featureBtn += `<button class="feature-btn">feature</button>`;
    } else {
      featureBtn = "";
    }

    let languages = "";
    jobAd.languages.forEach((lang) => {
      languages += `<button class="tag language">${lang}</button>`;
    });

    let tools = "";
    jobAd.tools.forEach((tool) => {
      tools += `<button class="tag tool">${tool}</button>`;
    });

    let html = `
        <div class="card">
                 
        <div class="item-start">
          <img class="logo" src="${jobAd.logo}" alt="" />
      
          <div class="item-start-content">
            <span class="company">${jobAd.company}</span>
           ${newButton}
           ${featureBtn}
            <h3 class="position">${jobAd.position}</h3>
            <span class="postedAt">${jobAd.postedAt}</span> .
            <span class="contract">${jobAd.contract}</span> .
            <span class="location">${jobAd.location}</span>
          </div>
        </div>
      
        <div class="tags item-end">
          <button class="tag role">${jobAd.role}</button>
          <button class="tag level">${jobAd.level}</button>
          ${languages}
          ${tools}
        </div>
      </div>
        `;
    cards.insertAdjacentHTML("beforeend", html);
  });

  let tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.addEventListener("click", makeFilterButton);
  });
};

const makeFilterButton = function (e) {
  let button = document.createElement("button");
  button.classList.add("filter-button");
  let span = document.createElement("span");
  span.textContent = e.target.textContent;
  let img = document.createElement("img");
  img.className = "icon-remove";
  img.setAttribute("src", "images/icon-remove.svg");
  img.setAttribute("alt", "remove icon");
  button.appendChild(span);
  button.appendChild(img);
  filterOptions.appendChild(button);
  filterContainer.style.display = "flex";

  let removeIcons = document.querySelectorAll(".icon-remove");
  removeIcons.forEach((icon) => {
    icon.addEventListener("click", removeFilterOption);
  });
};

const removeFilterOption = function (e) {
  e.target.parentElement.remove();
  if (filterOptions.lastChild == null) {
    removeAllFilters();
  }
};

// Fetch Jobs

let jobsArray = [];
async function fetchJobs() {
  let response = await fetch("./data.json");
  let data = await response.json();
  jobsArray = data;
  console.log("jobsArray: ", jobsArray);
  renderCard(jobsArray);
}

// remove filter container when clear button clicks
const removeAllFilters = function () {
  filterOptions.innerHTML = "";
  filterContainer.style.display = "none";
  renderCard(jobsArray);
};

clearButton.addEventListener("click", removeAllFilters);

// Page first loads
window.addEventListener("DOMContentLoaded", function () {
  fetchJobs();
  filterOptions.innerHTML = "";
  filterContainer.style.display = "none";
});
