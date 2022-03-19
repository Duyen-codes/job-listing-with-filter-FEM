// Variables
const cards = document.querySelector(".cards");

const clearButton = document.querySelector(".clear-button");

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
      languages += `<button class="language">${lang}</button>`;
    });

    let tools = "";
    jobAd.tools.forEach((tool) => {
      tools += `<button class="tool">${tool}</button>`;
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
      
        <div class="item-end">
        
          <button class="role">${jobAd.role}</button>
       
          <button class="level">${jobAd.level}</button>
         
          ${languages}
          ${tools}
        </div>
      </div>
        `;
    cards.insertAdjacentHTML("beforeend", html);
  });
};

// fetch("./data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((item) => {
//       renderCard(item);
//     });
//   });

let jobsArray = [];
async function fetchJobs() {
  let response = await fetch("./data.json");
  let data = await response.json();
  jobsArray = data;
  console.log("jobsArray: ", jobsArray);
  renderCard(jobsArray);
}

fetchJobs();

clearButton.addEventListener("click", function () {
  renderCard(jobsArray);
});
