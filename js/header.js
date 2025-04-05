const body = document.querySelector("body");
const header = document.querySelector(".header");
const btnMenu = document.querySelector(".header__button-menu");

const toggleMenu = () => {
  header.classList.toggle("nav-visible");
  body.classList.toggle("overflow-hidden");
};
btnMenu.addEventListener("click", toggleMenu);

const langMenu = document.querySelector(".header__lang-menu");
const langDropdown = document.querySelector(".header__lang");
const selectedLangImg = document.querySelector(".header__lang img");

document.addEventListener("click", function (event) {
  if (!langDropdown.contains(event.target)) {
    langMenu.classList.remove("active");
  }
});

langDropdown.addEventListener("click", function () {
  langMenu.classList.toggle("active");
});

langMenu.addEventListener("click", function (event) {
  const targetItem = event.target.closest("li");
  if (targetItem) {
    const selectedLang = targetItem.querySelector("img").getAttribute("src");

    if (selectedLang) {
      selectedLangImg.setAttribute("src", selectedLang);
      localStorage.setItem("selectedLang", selectedLang);
    }
    langMenu.classList.remove("active");
  }
});

const savedLang = localStorage.getItem("selectedLang");
if (savedLang && savedLang !== "null") {
  selectedLangImg.setAttribute("src", savedLang);
}

const menuItems = document.querySelectorAll('.menu__item');

menuItems.forEach(item => {
  item.addEventListener('click', function (event) {
    // Переключаем класс active для отображения/скрытия подменю
    item.classList.toggle('active');

    // Закрываем все подменю, кроме текущего
    menuItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });

    // Предотвращаем всплытие события, чтобы клик не сработал на родительский элемент
    event.stopPropagation();
  });
});

// Закрываем все подменю при клике вне меню
document.addEventListener('click', function () {
  menuItems.forEach(item => {
    item.classList.remove('active');
  });
});

// Читаем параметры из URL и перенаправляем на нужную страницу
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category'); // Получаем параметр category

// Если категория есть в URL, обновляем контент или перенаправляем
if (category) {
  // Например, можно обновить контент на странице
  console.log('Category from URL:', category);

  // Или можно сделать редирект на другую страницу
  // window.location.href = `somepage.html?category=${category}`;

  // Заменить контент или сделать что-то другое, например:
  const filteredItems = document.querySelectorAll('.menu__item');
  filteredItems.forEach(item => {
    if (item.textContent.toLowerCase().includes(category.toLowerCase())) {
      item.classList.add('highlight'); // Добавляем класс для выделения элементов
    }
  });
}
