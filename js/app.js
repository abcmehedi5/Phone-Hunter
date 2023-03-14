const loadPhones = async (search, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  // slice phones
  // show all
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  //  display no phone found
  const noPhone = document.getElementById("no-found-massage");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
    spinnerToggle(false);
  } else {
    noPhone.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card">
        <img src=${phone.image} class="card-img-top w-75 m-auto p-5" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
                <button onClick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
    `;
    phoneContainer.appendChild(phoneDiv);
    // stop loader
    spinnerToggle(false);
  });
};

// process search
const processSearch = (dataLimit) => {
  // start loader
  spinnerToggle(true);
  const searchFiled = document.getElementById("search-filed");
  const searchText = searchFiled.value;
  loadPhones(searchText, dataLimit);
};

// search handler
document.getElementById("btn-search").addEventListener("click", () => {
  processSearch(10);
});
// handle enter key input value
document
  .getElementById("search-filed")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });
// toggle spinner
const spinnerToggle = (isLoading) => {
  const loadingSection = document.getElementById("loader");
  if (isLoading) {
    loadingSection.classList.remove("d-none");
  } else {
    loadingSection.classList.add("d-none");
  }
};

// handle show more btn
document.getElementById("btn-show-all").addEventListener("click", () => {
  processSearch();
});

//  handle phone details button
const loadPhoneDetails = async(id)=>{
const url = `https://openapi.programming-hero.com/api/phone/${id}`
const res = await fetch(url)
const data = await res.json()
phoneDetailsDisplay(data.data);
console.log(data.data);
}

// phone details display
const phoneDetailsDisplay=(phone)=>{
  const modalTitle = document.getElementById('phoneDetailsModalLabel')
  modalTitle.innerText = phone.name
  const modalBody = document.getElementById('ModalBody')
  modalBody.innerHTML =`
  <p>Released Date: ${phone.releaseDate}<p/>
  <img src=${phone.image} alt="">
  <p>Memory: ${phone.mainFeatures.memory}<p/>
  `
}
