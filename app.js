
const fileInput = document.getElementById("videoInput");
const uploadBox = document.getElementById("uploadBox");
const videoSection = document.getElementById("videoSection");
const videoPreview = document.getElementById("videoPreview");
const videoName = document.getElementById("videoName");
const generateBtn = document.getElementById("generateBtn");
const statusText = document.getElementById("status");

let selectedVideo = null;
let videoURL = null;

// Open file picker
uploadBox.addEventListener("click", () => {
    fileInput.click();
});

// Handle video selection
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        loadVideo(file);
    }
});

// Load selected video
function loadVideo(file) {
    if (!file.type.startsWith("video/")) {
        statusText.textContent = "Please select a valid video file.";
        return;
    }

    selectedVideo = file;

    if (videoURL) {
        URL.revokeObjectURL(videoURL);
    }

    videoURL = URL.createObjectURL(file);

    videoPreview.src = videoURL;
    videoName.textContent = "Selected: " + file.name;

    videoSection.style.display = "block";

    statusText.textContent = "Video uploaded successfully!";
}

// Drag and drop functionality
uploadBox.addEventListener("dragover", (event) => {
    event.preventDefault();
    uploadBox.classList.add("dragover");
});

uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("dragover");
});

uploadBox.addEventListener("drop", (event) => {
    event.preventDefault();

    uploadBox.classList.remove("dragover");

    const file = event.dataTransfer.files[0];

    if (file) {
        loadVideo(file);
    }
});

// Generate clips
generateBtn.addEventListener("click", () => {
    if (!selectedVideo) {
        statusText.textContent = "Please upload a video first!";
        return;
    }

    const clipLength = document.getElementById("clipLength").value;
    const clipFormat = document.getElementById("clipFormat").value;

    statusText.textContent =
        "Your video is ready for processing! " +
        "Clip length: " + clipLength +
        " | Format: " + clipFormat +
        ". AI processing is not connected yet.";
});
