// Get the registration form and input fields
const form = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const github = document.getElementById("github");
const avatar = document.getElementById("avatar");

// Listen for the form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("githubError").textContent = "";
    document.getElementById("avatarError").textContent = "";

    // Get the values entered by the user
    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const githubValue = github.value.trim();
    const avatarFile = avatar.files[0];

    let valid = true;

    // Validate full name
    if (nameValue === "") {
        document.getElementById("nameError").textContent =
            "Please enter your full name.";
        valid = false;
    }

    // Validate email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        document.getElementById("emailError").textContent =
            "Please enter a valid email address.";
        valid = false;
    }

    // Validate GitHub username
    const githubPattern = /^@[A-Za-z0-9-]+$/;

    if (!githubPattern.test(githubValue)) {
        document.getElementById("githubError").textContent =
            "GitHub username must start with @ and contain only letters, numbers or hyphens.";
        valid = false;
    }

    // Validate uploaded avatar
    if (!avatarFile) {
        document.getElementById("avatarError").textContent =
            "Please upload your avatar.";
        valid = false;

    } else {
        const allowedTypes = ["image/jpeg", "image/png"];

        if (!allowedTypes.includes(avatarFile.type)) {
            document.getElementById("avatarError").textContent =
                "Only JPG, JPEG and PNG images are allowed.";
            valid = false;
        }

        if (avatarFile.size >= 500 * 1024) {
            document.getElementById("avatarError").textContent =
                "Your image must be smaller than 500KB.";
            valid = false;
        }
    }

    // Save registration details if all fields are valid
    if (valid) {
        saveRegistration(nameValue, emailValue, githubValue, avatarFile);
    }
});


// Function to save registration details
function saveRegistration(name, email, github, avatarFile) {

    const reader = new FileReader();

    reader.onload = function() {

        // Check that the image was read successfully
        if (!reader.result) {
            document.getElementById("avatarError").textContent =
                "Unable to read your image. Please try again.";
            return;
        }

        // Create an object containing the user's information
        const userData = {
            fullName: name,
            email: email,
            github: github,
            avatar: reader.result
        };

        // Store registration information in localStorage
        localStorage.setItem("registrationData", JSON.stringify(userData));

        // Redirect to the ticket page
        window.location.href = "ticket.html";
    };

    // Read the uploaded image
    reader.readAsDataURL(avatarFile);
}