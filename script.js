document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "admin" && password === "admin") {
      alert("Login successful!");
      window.location.href = "travel.html"; // Redirect to moon.html
    } else {
      errorMessage.style.display = "block"; // Show the error message
    }
  });
});
