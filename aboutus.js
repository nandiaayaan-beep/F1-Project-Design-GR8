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
      // Validate email format using regex (allows all valid TLDs including country codes)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        alert("Please enter a valid email address");
        return;
      }
      // Prevent domain stacking (multiple TLDs like .com.net)
      const domainPart = emailVal.split('@')[1];
      if (domainPart && domainPart.split('.').length > 2) {
        alert("Please enter a valid email with only one domain extension");
        return;
      }

      const formData = new FormData(this);

const response = await fetch("https://tdoiwxffaoxexompcqmp.supabase.co/rest/v1/feedback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "apikey": "sb_publishable_YBxg6PdcA9I9_b5efyupmg_FbUI3fqg",
    "Authorization": "Bearer sb_publishable_YBxg6PdcA9I9_b5efyupmg_FbUI3fqg",
    "Prefer": "return=minimal"
  },
  body: JSON.stringify({
    name: nameVal,
    email: emailVal,
    feedback: msgVal
  })
});

      if (response.ok) {
        this.classList.add('hidden');
        document.querySelector('.feedback-success').classList.add('show');
      }
    });
  }
});