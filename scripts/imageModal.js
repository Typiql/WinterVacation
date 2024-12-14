const modal = document.querySelector("#view-image-modal");
const modalImage = modal.querySelector(".modal__image");
const modalCaption = modal.querySelector(".modal__caption");
const closeBtn = modal.querySelector("#view-image-modal-close-btn");
const modalTitle = modal.querySelector(".modal__title");

export function openModal(event) {
  const card = event.currentTarget;
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardDescription = card.querySelector(".card__description");

  modalImage.src = cardImage.src;
  modalImage.alt = cardImage.alt || "";
  modalCaption.textContent = cardDescription.textContent;
  modalTitle.textContent = cardTitle.textContent;

  modal.classList.add("modal_opened");

  document.addEventListener("keydown", handleEscKey);
  modal.addEventListener("click", handleClickOutside);
  closeBtn.addEventListener("click", closeModal);
}

export function closeModal() {
  modal.classList.remove("modal_opened");

  document.removeEventListener("keydown", handleEscKey);
  modal.removeEventListener("click", handleClickOutside);
  closeBtn.removeEventListener("click", closeModal);
}

function handleEscKey(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

function handleClickOutside(event) {
  const modalContent = modal.querySelector(".modal__container");
  if (!modalContent) {
    console.error("Modal container not found.");
    return;
  }
  if (!modalContent.contains(event.target)) {
    closeModal();
  }
}

export function initializeCardEvent() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", openModal);
  });
}

