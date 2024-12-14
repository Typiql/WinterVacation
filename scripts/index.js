import './populateCards.js';
import './filter.js';
import { api } from "./Api.js";
import { generateCards } from "./populateCards.js";
import { initializeCardEvent } from "./imageModal.js";
import { initializeFilters } from "./filter.js";

api.getResortData()
  .then((data) => {
    generateCards(data);

    const swiper = new Swiper('.locations-swiper', {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 2,
      centeredSlides: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      breakpoints: {
        650: {
          slidesPerView: 3,
        },
      },
    });

    initializeCardEvent();
    initializeFilters(swiper);
  })
  .catch((error) => {
    console.error(error);
  });
