const reviewsContainer = document.querySelector(".reviews__list");
const paginationContainer = document.querySelector(".reviews__pagination");
const showMoreButton = document.getElementById("showMore");
const sortSelect = document.getElementById("sortSelect");

let reviews = [];
let currentPage = 1;
const itemsPerPage = 10;
let loadMode = false;

sortSelect.addEventListener("change", function () {
  currentPage = 1;
  loadMode = false;
  displayReviews();
  setupPagination();
});

async function fetchReviews() {
  try {
    const response = await fetch("api/reviews.json");
    if (!response.ok) throw new Error("Помилка завантаження даних");

    const data = await response.json();
    if (Array.isArray(data)) {
      reviews = data;
    } else if (data && Array.isArray(data.reviews)) {
      reviews = data.reviews;
    } else {
      throw new Error("Невірна структура JSON даних");
    }

    displayReviews();
    setupPagination();
  } catch (error) {
    console.error("Помилка:", error);
  }
}

function sortReviews() {
  const sortBy = sortSelect.value;

  if (sortBy === "rating") {
    reviews.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "date") {
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}

function createReviewElement(review) {
  const reviewItem = document.createElement("li");

  const starsBlock = document.createElement("div");
  starsBlock.classList.add("reviews-item-block__stars");
  for (let j = 0; j < review.rating; j++) {
    let starImg = document.createElement("img");
    starImg.src = "img/reviews/star.png";
    starImg.alt = "Star";
    starImg.title = "Rating Star";
    starsBlock.appendChild(starImg);
  }

  reviewItem.innerHTML = `
    <div class="reviews-item__block">
      ${starsBlock.outerHTML}
      <p class="reviews-item-block__category">${review.course_category}</p>
    </div>
    <div class="reviews-item__info">
      <p class="reviews-item-info__review">"${review.review}"</p>
      <div class="reviews-item-info__detail">
        <div class="reviews-item-info__text">
          <p class="reviews-item-info__name">${review.user.name}</p>
          <p class="reviews-item-info__date">${review.date}</p>
        </div>
        <div class="image reviews-item-info__image">
          <img src="img/reviews/icon.png" alt="Icon" title="User Icon" />
        </div>
      </div>
    </div>
  `;

  return reviewItem;
}

function displayReviews() {
  sortReviews();

  if (!loadMode) {
    reviewsContainer.innerHTML = "";

    let start = (currentPage - 1) * itemsPerPage;
    let end = Math.min(start + itemsPerPage, reviews.length);
    let paginatedReviews = reviews.slice(start, end);

    paginatedReviews.forEach((review) => {
      const reviewItem = createReviewElement(review);
      reviewsContainer.appendChild(reviewItem);
    });
  } else {
    let start = reviewsContainer.childElementCount;
    let end = Math.min(start + itemsPerPage, reviews.length);
    let newReviews = reviews.slice(start, end);

    newReviews.forEach((review) => {
      const reviewItem = createReviewElement(review);
      reviewsContainer.appendChild(reviewItem);
    });
  }

  updatePagination();
}

function setupPagination() {
  paginationContainer.innerHTML = "";
  let pageCount = Math.ceil(reviews.length / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    let button = document.createElement("button");
    button.textContent = i;
    button.classList.add("pagination-button");
    if (i === currentPage) button.classList.add("active");

    button.addEventListener("click", function () {
      loadMode = false;
      currentPage = i;
      displayReviews();
    });

    paginationContainer.appendChild(button);
  }

  updatePagination();
}

function updatePagination() {
  document.querySelectorAll(".pagination-button").forEach((btn, index) => {
    btn.classList.toggle("active", index + 1 === currentPage);
  });

  let allItemsShown = reviewsContainer.childElementCount >= reviews.length;

  showMoreButton.style.display = allItemsShown ? "none" : "block";
}

showMoreButton.addEventListener("click", function () {
  loadMode = true;
  currentPage++;
  displayReviews();
});

fetchReviews();
