const loadCourses = async () => {
    try {
      const response = await fetch("api/courses.json");
      const data = await response.json();
  
      const courses = data.courses;
  
      if (!Array.isArray(courses)) {
        throw new Error("Expected an array of courses");
      }
  
      const sliderList = document.querySelector(".slider-content__list");
  
      courses.forEach((course) => {
        const courseItem = document.createElement("div");
        courseItem.classList.add("slider-content__item");
  
        courseItem.innerHTML = `
                  <div class="image slider-content-item__image">
                      <img src="${course.image || "img/slider/card.png"}" alt="${
          course.title
        }" title="${course.title}" />
                  </div>
                  <div class="slider-content-item__info">
                      <p class="slider-content-item__duration">${
                        course.duration
                      }</p>
                      <p class="slider-content-item__price">${course.price}</p>
                  </div>
                  <p class="title slider-content-item__title">${course.title}</p>
                  <div class="slider-content-item__info">
                      <p class="title slider-content-item__category">${
                        course.category
                      }</p>
                      <p class="title slider-content-item__instructor">${
                        course.instructor
                      }</p>
                  </div>
              `;
  
        sliderList.appendChild(courseItem);
      });
  
      initSlider();
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };
  
  window.addEventListener("load", loadCourses);
  
  const initSlider = () => {
      const slideButtons = document.querySelectorAll(".slider-content__button");
      const sliderList = document.querySelector(".slider-content__list");
  
      if (!sliderList) return;
  
      const updateScrollAmount = () => {
          const cardWidth = 200;
          const gap = 10;
          const containerWidth = sliderList.clientWidth;
          const itemsPerScroll = window.innerWidth < 600 ? 1 : Math.floor(containerWidth / (cardWidth + gap)) || 1;
          return (cardWidth + gap) * itemsPerScroll;
      };
  
      let scrollAmount = updateScrollAmount();
  
      const handleResize = () => {
          scrollAmount = updateScrollAmount();
          sliderList.style.scrollSnapType = window.innerWidth < 600 ? "x mandatory" : "none";
          sliderList.style.scrollBehavior = "smooth";
      };
  
      window.addEventListener("resize", handleResize);
      handleResize();
  
      slideButtons[0].style.display = "none";
  
      slideButtons.forEach((button) => {
          button.addEventListener("click", () => {
              const direction = button.id === "prev-slide" ? -1 : 1;
              sliderList.scrollBy({ left: scrollAmount * direction, behavior: "smooth" });
          });
      });
  
      const handleSlideButtons = () => {
          const maxScrollLeft = sliderList.scrollWidth - sliderList.clientWidth;
          slideButtons[0].style.display = sliderList.scrollLeft <= 0 ? "none" : "block";
          slideButtons[1].style.display = sliderList.scrollLeft >= maxScrollLeft ? "none" : "block";
      };
  
      sliderList.addEventListener("scroll", handleSlideButtons);
      handleSlideButtons();
  };
