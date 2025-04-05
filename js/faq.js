const questions = document.querySelectorAll(".faq__question");
const answers = document.querySelectorAll(".faq__answer");
questions.forEach((item) => {
  item.addEventListener("click", () => {
    const activeContent = document.querySelector("#" + item.dataset.tab);

    if (activeContent.classList.contains("active")) {
      activeContent.classList.remove("active");
      item.classList.remove("active");
      activeContent.style.maxHeight = 0;
    } else {
      answers.forEach((element) => {
        element.classList.remove("active");
        element.style.maxHeight = 0;
      });
      questions.forEach((question) => {
        question.classList.remove("active");
      });
      item.classList.add("active");
      activeContent.classList.add("active");
      activeContent.style.maxHeight = activeContent.scrollHeight + "px";
    }
  });
});
