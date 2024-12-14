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

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let matches = true;

    selectedFilters.forEach(filter => {
      switch (filter) {
        case "Child Friendly":
          if (card.dataset.childFriendly !== "true") matches = false;
          break;
        case "Highest Peak":
          if (parseInt(card.dataset.highestPeak, 10) < 4000) matches = false;
          break;
        case "Longest Run":
          if (parseInt(card.dataset.longestRun, 10) < 10) matches = false;
          break;
        case "Night Skiing":
          if (card.dataset.nightSkiing !== "true") matches = false;
          break;
        case "Most Advanced Runs":
          if (parseInt(card.dataset.advancedRuns, 10) < 5) matches = false;
          break;
        case "Most Snowfall":
          if (parseInt(card.dataset.snowfall, 10) < 200) matches = false;
          break;
      }
    });

    if (!isNaN(liftsValue) && parseInt(card.dataset.totalLifts, 10) < liftsValue) matches = false;
    if (!isNaN(slopesValue) && parseInt(card.dataset.totalSlopes, 10) < slopesValue) matches = false;

    const slide = card.closest('.swiper-slide');
    if (slide) {
      slide.style.display = matches ? "block" : "none";
    }
  });

  if (swiper) {
    swiper.update();
  } else {
    console.error("Swiper instance is not defined.");
  }
}
