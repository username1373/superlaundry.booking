document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");
  const submitButton = bookingForm.querySelector("button[type='submit']");
  
  // Add a loading spinner to indicate form submission
  const showLoading = () => {
    submitButton.innerHTML = "Submitting..."; // Change button text to 'Submitting'
    submitButton.disabled = true; // Disable the button to prevent multiple submissions
  };

  const hideLoading = () => {
    submitButton.innerHTML = "Confirm Booking"; // Reset button text
    submitButton.disabled = false; // Re-enable the button
  };

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const option = document.getElementById("option").value;
    const loadSize = document.getElementById("load").value;
    const service = document.getElementById("service").value;
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const instructions = document.getElementById("instructions").value.trim();
    const payment = document.getElementById("payment").value;

    // Validate form
    if (!option || !loadSize || !service || !address || !email || !phone || !payment) {
      alert("Please fill in all the required fields!");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("option", option);
    formData.append("load", loadSize);
    formData.append("service", service);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("instructions", instructions ? instructions : "None");
    formData.append("payment", payment);

    // Show loading spinner and disable submit button
    showLoading();

    // Send the form data to Formspree
    fetch("https://formspree.io/f/xzzdgwyo", {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' } // Ensure proper response handling
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Form submission failed. Please try again.");
      }
    })
    .then(data => {
      alert("Booking confirmed! Your details have been submitted.");
      bookingForm.reset(); // Clear form after successful submission
      hideLoading(); // Reset button to original state
    })
    .catch((error) => {
      console.error("Error sending booking details: ", error);
      alert("There was an issue submitting your booking. Please try again.");
      hideLoading(); // Reset button if there's an error
    });
  });
});
