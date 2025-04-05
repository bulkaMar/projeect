const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close__btn");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const durationFilter = document.getElementById("duration-filter");
const noResultsMessage = document.createElement("p");
noResultsMessage.textContent = "Unfortunately, no courses are available.";
noResultsMessage.classList.add("no-results");

function openModal(course) {
  fetch("api/courses-info.json")
    .then((response) => response.json())
    .then((infoData) => {
      const courseInfo = infoData[course.id];

      document.querySelector(".modal-content__title").textContent =
        course.title;
      document.querySelector(
        ".modal-content__category"
      ).innerHTML = `<strong>Category:</strong> ${course.category}`;
      document.querySelector(
        ".modal-content__price"
      ).innerHTML = `<strong>Price:</strong> ${course.price}`;
      document.querySelector(
        ".modal-content__duration"
      ).innerHTML = `<strong>Duration:</strong> ${course.duration}`;
      document.querySelector(
        ".modal-content__instructor"
      ).innerHTML = `<strong>Instructor:</strong> ${course.instructor}`;

      document.querySelector(".modal-info__image--img").src = course.image;
      document.querySelector(".modal-info__image--img").alt = course.title;
      document.querySelector(".modal-content__description").textContent =
        courseInfo.description;

      modal.style.display = "flex";
    })
    .catch((error) => console.error("Error loading course info:", error));
}

function closeModal() {
  modal.style.display = "none";
}

closeModalBtn.addEventListener("click", closeModal);

const coursesList = document.querySelector(".courses-card__list");

function displayCourses(filteredCourses) {
  coursesList.innerHTML = "";
  if (filteredCourses.length === 0) {
    coursesList.appendChild(noResultsMessage);
    return;
  }

  filteredCourses.forEach((course) => {
    const courseItem = document.createElement("li");
    courseItem.classList.add("courses-card-item");

    courseItem.innerHTML = `
      <div class="courses-card-item__detail">
        <div class="courses-card-item__info">
          <p class="courses-card-item__text">${course.category}</p>
          <p class="courses-card-item__text">${course.price}</p>
        </div>
        <div class="image courses-card-item__image">
          <img src="${course.image}" alt="${course.title}" title="${course.title}" />
        </div>
      </div>
      <p class="courses-card-item__duration">${course.duration}</p>
      <p class="courses-card-item__title">${course.title}</p>
    `;

    courseItem.addEventListener("click", () => openModal(course));

    coursesList.appendChild(courseItem);
  });
}

fetch("api/courses.json")
  .then((response) => response.json())
  .then((coursesData) => {
    const courses = coursesData.courses;
    displayCourses(courses);

    function filterCourses() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedCategory = categoryFilter.value.toLowerCase();
      const selectedPrice = parseFloat(priceFilter.value);
      const selectedDuration = durationFilter.value.toLowerCase();

      const filteredCourses = courses.filter((course) => {
        const matchesSearch =
          course.title.toLowerCase().includes(searchTerm) ||
          course.category.toLowerCase().includes(searchTerm) ||
          course.instructor.toLowerCase().includes(searchTerm);
        const matchesCategory =
          selectedCategory === "all" ||
          course.category.toLowerCase() === selectedCategory;
        const coursePrice = parseFloat(course.price.replace("$", ""));
        const matchesPrice =
          isNaN(selectedPrice) || coursePrice <= selectedPrice;
        const matchesDuration =
          selectedDuration === "all" ||
          course.duration.toLowerCase() === selectedDuration;

        return (
          matchesSearch && matchesCategory && matchesPrice && matchesDuration
        );
      });

      displayCourses(filteredCourses);

      const urlParams = new URLSearchParams();
      if (selectedCategory !== "all")
        urlParams.set("category", selectedCategory);
      if (selectedPrice) urlParams.set("price", selectedPrice);
      if (selectedDuration !== "all")
        urlParams.set("duration", selectedDuration);

      window.history.pushState({}, "", `?${urlParams.toString()}`);
    }

    searchInput.addEventListener("input", filterCourses);
    categoryFilter.addEventListener("change", filterCourses);
    priceFilter.addEventListener("change", filterCourses);
    durationFilter.addEventListener("change", filterCourses);

    const params = new URLSearchParams(window.location.search);
    if (params.has("category")) {
      categoryFilter.value = params.get("category");
    }
    if (params.has("price")) {
      priceFilter.value = params.get("price");
    }
    if (params.has("duration")) {
      durationFilter.value = params.get("duration");
    }
    filterCourses(); 
  })
  .catch((error) => console.error("Error loading courses.json:", error));

const style = document.createElement("style");
style.innerHTML = `
  .no-results {
    margin-top: 40px;
    width: 100%;
    position: absolute;
    display: flex;
    font-family: "Roboto", sans-serif;
    font-size: 35px;
    font-weight: 500;
    color: #13c1fb;
  }
`;
document.head.appendChild(style);

document.getElementById("filter-toggle").addEventListener("click", function () {
  const filters = document.getElementById("filters");
  const content = document.querySelector(".courses__card");
  const filterBlock = document.querySelector(".courses__filters");
  const coursesDropdown = document.querySelector(".courses__dropdowns");

  const isSmallScreen = window.innerWidth < 800;
  const isSmallerScreen = window.innerWidth < 500;

  if (!filters.classList.contains("show")) {
    filters.classList.add("show");
    content.style.flex = "1 1 70%";
    filterBlock.style.flex = isSmallerScreen
      ? "1 1 100%"
      : isSmallScreen
      ? "1 1 40%"
      : "1 1 15%";
    filterBlock.style.width = "100%";
    filters.style.display = "flex";
    filters.style.flexDirection = "column";

    coursesDropdown.style.display = "block";
    setTimeout(() => (coursesDropdown.style.opacity = 1), 10);
  } else {
    filters.classList.remove("show");
    content.style.flex = "1 1 100%";
    filterBlock.style.width = "20px";
    filterBlock.style.flex = "1 1 0%";

    coursesDropdown.style.opacity = 0;
    setTimeout(() => (coursesDropdown.style.display = "none"), 300);
  }
});
