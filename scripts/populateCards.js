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

    cardImage.src = `./images/${element.image || "default.jpg"}`;
    cardImage.alt = `${element.resort} image`;
    cardLocation.textContent = `${element.city}, ${element.state}`;
    cardTitle.textContent = element.resort;

    const cardDescription = card.querySelector(".card__description");
    cardDescription.innerHTML = `
      <strong>Night Skiing:</strong> ${element.nightskiing}<br>
      <strong>Peak Elevation:</strong> ${element.peak_elevation}<br>
      <strong>Average Snowfall:</strong> ${element.avg_annual_snowfall}"<br>
      <strong>Total Slopes:</strong> ${element.total_slopes}<br>
      <strong>Total Lifts:</strong> ${element.total_lifts}
    `;

    swiperWrapper.appendChild(card);
  });
}
