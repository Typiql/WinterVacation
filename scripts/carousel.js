const locationsHolder = document.querySelector(".locations-holder");
const cards = document.querySelectorAll(".card");
const leftArrow = document.querySelector("#left-arrow");
const rightArrow = document.querySelector("#right-arrow");

const TOTAL_CARDS = cards.length;
const VISIBLE_CARDS = 4;

const shiftCardContent = (direction) => {
  const cardContents = Array.from(cards).map((card) => card.innerHTML);

  cards.forEach((card, index) => {
    let newIndex;

    if (direction === "right") {
      newIndex = (index + 1) % TOTAL_CARDS;
    } else if (direction === "left") {
      newIndex = (index - 1 + TOTAL_CARDS) % TOTAL_CARDS;
    }

    card.innerHTML = cardContents[newIndex];
  });
};

export const setupCarousel = () => {
  rightArrow.addEventListener("click", () => {
    shiftCardContent("right");
  });

  leftArrow.addEventListener("click", () => {
    shiftCardContent("left");
  });
};
