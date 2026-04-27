// Auto-grow textareas: expands in height as user types
document.addEventListener('DOMContentLoaded', function () {
  const textareas = document.querySelectorAll('.form-input');

  textareas.forEach(function (ta) {
    ta.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  });

  // Feedback form submit handler
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const nameVal = document.getElementById('fb-name').value.trim();
      const emailVal = document.getElementById('fb-email').value.trim();
      const msgVal = document.getElementById('fb-message').value.trim();

      if(nameVal === "" || emailVal === "" || msgVal === "") {
        alert("Please fill in all fields");
        return;
      }
      if(emailVal.indexOf("@") === -1) {
        alert("Please enter a valid email address");
        return;
      }

      const formData = new FormData(this);

      const response = await fetch("aboutus.php", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        this.classList.add('hidden');
        document.querySelector('.feedback-success').classList.add('show');
      }
    });
  }
});