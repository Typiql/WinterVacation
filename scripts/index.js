import './populateCards.js';
import './filter.js';
import { api } from './Api.js';
import { generateCards } from './populateCards.js';
import { initializeCardEvent } from './imageModal.js';
import { initializeFilters } from './filter.js';
import { initializeMap } from './map.js';

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
    initializeMap(data);
  })
  .catch((error) => {
    console.error('Error fetching resort data:', error);
  });


  // I was tired and didnt feel like selecting all of the <a> elements so this selects all and makes the transition smooth. --Alex
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetID = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetID);

      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });