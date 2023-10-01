// jobStatus.js

// Function to retrieve job data from localStorage
function getSelectedJob() {
  const jobData = JSON.parse(localStorage.getItem("selectedJob"));

  // Check if job data exists
  if (jobData) {
    // Push the job data into the jobStatus array
    jobStatus.push(jobData);

    // Clear the job data from localStorage once it's retrieved
    localStorage.removeItem("selectedJob");
  }
}

// Call the function when the page loads
window.addEventListener("load", getSelectedJob);

export const jobStatus = [];
