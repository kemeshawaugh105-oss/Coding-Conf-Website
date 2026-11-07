// Retrieve the registration information from localStorage
const storedData = localStorage.getItem("registrationData");

// Check whether registration information exists
if (storedData === null) {

    // Redirect visitors without registration data to the home page
    window.location.href = "index.html";

} else {

    // Convert stored information into a JavaScript object
    const userData = JSON.parse(storedData);

    // Display the participant's name
    document.getElementById("congratulations").textContent =
        "Congrats, " + userData.fullName + "! Your ticket is ready.";

    document.getElementById("ticketName").textContent =
        userData.fullName;

    // Display the uploaded avatar
    document.getElementById("ticketAvatar").src =
        userData.avatar;

    // Create the GitHub profile link
    const githubLink = document.createElement("a");

    const githubUsername = userData.github.substring(1);

    githubLink.href = "https://github.com/" + githubUsername;
    githubLink.textContent = userData.github;
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";

    document.getElementById("ticketGithub").appendChild(githubLink);

    // Generate a ticket number if one does not already exist
    if (!userData.ticketNumber) {

        userData.ticketNumber =
            Math.floor(10000 + Math.random() * 90000);

        // Save the ticket number
        localStorage.setItem(
            "registrationData",
            JSON.stringify(userData)
        );
    }

    // Display the ticket number
    document.getElementById("ticketNumber").textContent =
        "Ticket Number: #" + String(userData.ticketNumber).padStart(5, "0");
}