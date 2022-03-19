// Variables
const cards = document.querySelector(".cards");

const renderCard = function (jobAd) {
  let newButton;
  if (jobAd.new == true) {
    newButton = `<button class="new-btn">New</button>`;
  } else {
    newButton = "";
  }

  let featureBtn;
  if (jobAd.featured == true) {
    featureBtn = `<button class="feature-btn">feature</button>`;
  } else {
    featureBtn = "";
  }
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
   
    <button>HTML</button> <button>CSS</button>
    <button>JavaScript</button>
 
  </div>
</div>
  `;
  cards.insertAdjacentHTML("beforeend", html);
};

// fetch("./data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((item) => {
//       renderCard(item);
//     });
//   });

async function fetchJobs() {
  let response = await fetch("./data.json");
  let data = await response.json();
  data.forEach((item) => {
    renderCard(item);
  });
}

fetchJobs();
