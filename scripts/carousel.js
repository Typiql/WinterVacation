export const initializeSwiper = () => {
  const swiper = new Swiper('.locations-swiper', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
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
  });
};
