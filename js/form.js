const form = document.querySelector("#registrationForm");
const phoneInput = document.querySelector("#phone");
const countryCodeSelect = document.querySelector("#countryCode");
const messageContainer = document.querySelector("#message");
const courseSelect = document.getElementById("course");

fetch("api/courses.json")
  .then((response) => response.json())
  .then((data) => {
    const courses = data.courses;
    let course = [...new Set(courses.map((course) => course.title))];

    courseSelect.innerHTML = '<option value="">Select a course</option>';

    course.forEach((course) => {
      let option = document.createElement("option");
      option.value = course;
      option.textContent = course;
      courseSelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
    courseSelect.innerHTML =
      '<option value="">Failed to load courses</option>';
  });

form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const phoneNumber = phoneInput.value.trim();
  const fullPhoneNumber = countryCodeSelect.value + phoneNumber;

  const phoneRegex = /^[0-9]{7,12}$/;
  if (!phoneRegex.test(phoneNumber)) {
    messageContainer.innerHTML =
      "<p style='color: red;'>Incorrect phone number!</p>";
    setTimeout(() => (messageContainer.innerHTML = ""), 3000);
    return;
  }

  const formData = new FormData(form);
  formData.append("fullPhone", fullPhoneNumber);

  fetch("https://formspree.io/f/xkggavgw", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        messageContainer.innerHTML =
          "<p style='color: green;'>Your form has been successfully submitted!</p>";
        form.reset();
      } else {
        messageContainer.innerHTML =
          "<p style='color: red;'>Something went wrong. Try again.</p>";
      }
    })
    .catch(() => {
      messageContainer.innerHTML =
        "<p style='color: red;'>Network error. Please try again later.</p>";
    })
    .finally(() => {
      setTimeout(() => (messageContainer.innerHTML = ""), 3000);
    });
});
