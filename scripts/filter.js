export function initializeFilters(swiper) {
  const dropdownItems = document.querySelectorAll('.dropdown__content-item');
  const liftsInput = document.getElementById("number-input-lifts");
  const slopesInput = document.getElementById("number-input-slopes");

  dropdownItems.forEach(item => {
    item.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "input") return;

      item.classList.toggle('selected');
      filterCards(swiper);
    });
  });

  [liftsInput, slopesInput].forEach(input => {
    input.addEventListener("input", () => filterCards(swiper));
  });
}

function filterCards(swiper) {
  const selectedFilters = Array.from(document.querySelectorAll(".dropdown__content-item.selected"))
    .map(item => item.textContent.trim());

  const liftsValue = selectedFilters.includes("Total Lifts")
    ? parseInt(document.getElementById("number-input-lifts").value, 10)
    : NaN;

  const slopesValue = selectedFilters.includes("Total Slopes")
    ? parseInt(document.getElementById("number-input-slopes").value, 10)
    : NaN;

  const selectedAirport = document.querySelector(".airport-filter.selected");
  const airportCode = selectedAirport ? selectedAirport.id.split('-')[1].toUpperCase() : null;

  const cards = document.querySelectorAll(".card");
  const visibleCards = [];

  cards.forEach(card => {
    let matches = true;

    const resortData = {
      totalLifts: parseInt(card.dataset.totalLifts, 10),
      totalSlopes: parseInt(card.dataset.totalSlopes, 10),
      difficultSlopes: parseInt(card.dataset.difficultSlopes, 10),
      peakElevation: parseInt(card.dataset.peakElevation, 10),
      avgAnnualSnowfall: parseInt(card.dataset.avgAnnualSnowfall, 10),
      nightSkiing: card.dataset.nightSkiing === "true",
      childFriendly: card.dataset.childFriendly === "true",
      mostSnowfall: card.dataset.mostSnowfall === "true",
      longestRun: card.dataset.longestRun === "true",
      mostAdvancedRuns: card.dataset.mostAdvancedRuns === "true",
      airport: card.dataset.airport.trim()
    };

    selectedFilters.forEach(filter => {
      switch (filter) {
        case "Child Friendly":
          if (!resortData.childFriendly) matches = false;
          break;
        case "Highest Peak":
          if (resortData.peakElevation < 12000) matches = false;
          break;
        case "Longest Run":
          if (!resortData.longestRun) matches = false;
          break;
        case "Night Skiing":
          if (!resortData.nightSkiing) matches = false;
          break;
        case "Most Advanced Runs":
          if (!resortData.mostAdvancedRuns) matches = false;
          break;
        case "Most Snowfall":
          if (!resortData.mostSnowfall) matches = false;
          break;
      }
    });

    if (airportCode && resortData.airport !== airportCode) {
      matches = false;
    }

    if (!isNaN(liftsValue) && resortData.totalLifts < liftsValue) matches = false;
    if (!isNaN(slopesValue) && resortData.totalSlopes < slopesValue) matches = false;

    const slide = card.closest('.swiper-slide');
    if (slide) {
      slide.style.display = matches ? "block" : "none";
      if (matches) {
        visibleCards.push(card);
      }
    }
  });

  if (swiper) {
    swiper.update();
  } else {
    console.error("Swiper instance is not defined.");
  }
}
