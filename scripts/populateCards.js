export function generateCards(data) {
  const template = document.getElementById("card-template");
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  data.forEach((element) => {
    const card = template.content.cloneNode(true);

    const cardImage = card.querySelector(".card__image");
    const cardLocation = card.querySelector(".card__location");
    const cardTitle = card.querySelector(".card__title");

    const cardContainer = card.querySelector(".card");
    cardContainer.setAttribute("data-night-skiing", element.nightskiing);
    cardContainer.setAttribute("data-peak-elevation", element.peak_elevation);
    cardContainer.setAttribute("data-average-snowfall", element.avg_annual_snowfall);
    cardContainer.setAttribute("data-total-slopes", element.total_slopes);
    cardContainer.setAttribute("data-total-lifts", element.total_lifts);
    cardContainer.setAttribute("data-airport", element.airport);
    cardContainer.setAttribute("data-child-friendly", element.child_friendly);
    cardContainer.setAttribute("data-most-advanced-runs", element.most_advanced_runs || false);
    cardContainer.setAttribute("data-longest-run", element.longest_run || false);
    cardContainer.setAttribute("data-most-snowfall", element.most_snowfall || false);

    cardImage.src = `${element.image || "default.jpg"}`;
    cardImage.alt = `${element.resort} image`;
    cardLocation.textContent = `${element.city}, ${element.state}`;
    cardTitle.textContent = element.resort;

    const cardDescription = card.querySelector(".card__description");
    cardDescription.textContent = element.description;

    swiperWrapper.appendChild(card);
  });
}
