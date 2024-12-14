import { api } from "./Api.js";

const dropdownItems = document.querySelectorAll('.dropdown__content-item');
const cardsContainer = document.querySelector('.locations-holder');

let resortData = [];

// Fetch resort data and ensure dropdown interaction is enabled only after data is loaded
async function fetchResortData() {
  try {
    resortData = await api.getResortData();
    console.log("Fetched Resort Data:", resortData); // Log fetched data to verify
    enableDropdownInteraction(); // Enable dropdown interaction after data is loaded
  } catch (error) {
    console.error('Error fetching resort data:', error);
  }
}

// Add click event listeners to each dropdown item
function enableDropdownInteraction() {
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      dropdownItems.forEach((el) => el.classList.remove('selected'));
      item.classList.add('selected');

      const filterValue = item.textContent.trim();
      if (filterValue === 'Night Skiing') {
        filterNightSkiing();
      }
    });
  });
}

// Filter resorts where nightskiing is "Yes"
function filterNightSkiing() {
  const filteredResorts = resortData.filter((resort) => resort.nightskiing === 'Yes');
  console.log("Filtered Resorts:", filteredResorts); // Log filtered results
  displayFilteredResorts(filteredResorts); // Update the cards on the page
}

// Display the filtered resorts
function displayFilteredResorts(filteredResorts) {
  console.log("Updating Cards with Resorts:", filteredResorts); // Debug log
  cardsContainer.innerHTML = ''; // Clear existing cards

  if (!filteredResorts.length) {
    console.log("No resorts found for the selected filter.");
    cardsContainer.innerHTML = '<p>No resorts match this filter.</p>'; // Optional: Display a message
    return;
  }

  filteredResorts.forEach((resort) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card__image" style="background-image: url('./images/${resort.image || 'default.jpg'}');"></div>
      <div class="card-text-container">
        <h3 class="card__title">${resort.resort}</h3>
        <p class="card__location">${resort.city}, ${resort.state}</p>
        <p class="card__description">
          <strong>Night Skiing:</strong> ${resort.nightskiing}<br>
          <strong>Peak Elevation:</strong> ${resort.peak_elevation}<br>
          <strong>Average Snowfall:</strong> ${resort.avg_annual_snowfall}"<br>
          <strong>Total Slopes:</strong> ${resort.total_slopes}<br>
          <strong>Total Lifts:</strong> ${resort.total_lifts}
        </p>
      </div>
    `;
    console.log("Appending card for:", resort.resort); // Debug log
    cardsContainer.appendChild(card);
  });
}



// Fetch resort data when the script runs
fetchResortData();
