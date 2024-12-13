const dropdownItems = document.querySelectorAll('.dropdown__content-item');

dropdownItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle('selected');
  })
})