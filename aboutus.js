document.addEventListener("DOMContentLoaded", function () {
  const allInputs = document.querySelectorAll(".form-input");

  allInputs.forEach(function (inputBox) {
    inputBox.addEventListener("input", function () {
      inputBox.style.height = "auto";
      inputBox.style.height = inputBox.scrollHeight + "px";
    });
  });

  const feedbackForm = document.getElementById("feedbackForm");
  const nameInput = document.getElementById("fb-name");
  const emailInput = document.getElementById("fb-email");
  const messageInput = document.getElementById("fb-message");
  const successMessage = document.querySelector(".feedback-success");

  if (!feedbackForm || !nameInput || !emailInput || !messageInput || !successMessage) {
    return;
  }

  feedbackForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const feedback = messageInput.value.trim();

    if (name === "" || email === "" || feedback === "") {
      alert("Please fill in all fields");
      return;
    }

    const domainPart = email.split("@")[1];
    if (domainPart && domainPart.split(".").length !== 2) {
      alert("Please enter a valid email with one domain extension");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const supabaseUrl = "https://tdoiwxffaoxexompcqmp.supabase.co/rest/v1/feedback";
    const apiKey = "sb_publishable_YBxg6PdcA9I9_b5efyupmg_FbUI3fqg";
w
    try {

      const response = await fetch(supabaseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": (apiKey),
          "Authorization": `Bearer ${apiKey}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          feedback: feedback
        })
      });

      if (!response.ok) {
        alert("Error submitting feedback. Please try again later.");
        return;
      }

      feedbackForm.classList.add("hidden");
      successMessage.classList.add("show");
    } catch (error) {
      alert("Error submitting feedback. Please try again later.");
    }
  });
});
