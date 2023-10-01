import jobs from "./jobs/jobs";

console.log(jobs);

// Define the activeJobs array to store accepted jobs
const activeJobs = [];

// Get references to job list elements
const jobListElement = document.getElementById("jobList");
const eventsElement = document.getElementById("jobStatus");

// Function to randomly select and display a job
function getRandomJob() {
  const randomIndex = Math.floor(Math.random() * jobs.length);
  const randomJob = jobs[randomIndex];

  // Create a job element and display the job information
  const jobElement = document.createElement("div");
  jobElement.innerHTML = `
      <p>${randomJob.title}</p>
      <p>${randomJob.description}</p>
      <p>Requirements: ${randomJob.requirements}</p>
      <p>Difficulty: ${randomJob.difficulty}</p>
      <p>Pay: ${randomJob.pay}</p>
      <button>Details</button>
      <button class="job-button">Accept</button>
  `;

  // Append the job element to the jobList
  jobListElement.appendChild(jobElement);

  // Add event listener to the "Accept" button for this job
  const acceptButton = jobElement.querySelector(".job-button");
  acceptButton.addEventListener("click", () =>
    acceptJob(randomJob, jobElement)
  );
}

// Call getRandomJob to display a random job
getRandomJob();
getRandomJob();

// Function to handle job acceptance
function acceptJob(job, jobElement) {
  // Extract job information from the job
  const jobTitle = job.title;
  const jobDesc = job.description;
  const jobRequirements = job.requirements;
  const jobDifficulty = job.difficulty;
  const jobTime = job.time;
  const jobPay = job.pay;
  const jobRep = job.rep;
  const jobThreat = job.threat;

  // Create an object to represent the job
  const jobData = {
    title: jobTitle,
    desc: jobDesc,
    req: jobRequirements,
    dif: jobDifficulty,
    time: jobTime,
    pay: jobPay,
    rep: jobRep,
    threat: jobThreat,
    status: 0
    // Add other properties you need here
  };

  // Function to update job status and check if time is over
  function updateJobStatus(job) {
    if (job.status < 100) {
      job.status += 1; // Increment the status (you can adjust this value)
      setTimeout(() => updateJobStatus(job), 60000); // Update every 1 minute (adjust as needed)
    }
  }

  // Remove the job element from the job list if it exists
  jobElement.remove();

  // Push the job data into the activeJobs array
  activeJobs.push(jobData);
  console.log("Job Accepted:", jobData);

  // Display the active jobs in the EVENTS section
  displayActiveJobs();
}

// Function to display active jobs in the EVENTS section
function displayActiveJobs() {
  // Clear the existing content in the events section
  eventsElement.innerHTML = "";

  // Loop through the activeJobs array and display each job
  activeJobs.forEach((jobData, index) => {
    const jobElement = document.createElement("div");
    jobElement.innerHTML = `
      <p>${jobData.title}</p>
      <p>Time: <span>${jobData.time}%</span></p>
      <p>Required: <span>${jobData.req}</span></p>
      <p>Difficulty: <span>${jobData.dif}</span></p>
      <button class="details-button" data-index="${index}">Details</button>
    `;

    // Add event listener to the "Details" button for this job
    const detailsButton = jobElement.querySelector(".details-button");
    detailsButton.addEventListener("click", () => showJobDetails(index));

    // Append the job element to the events section
    eventsElement.appendChild(jobElement);
  });
}

// Function to show job details
function showJobDetails(index) {
  // Retrieve the job data from activeJobs
  const jobData = activeJobs[index];

  // You can display job details however you like, for example, in a modal or alert
  alert(
    `Job Title: ${jobData.title}\nJob Description: ${jobData.desc}\nStatus: ${jobData.status}%`
  );
}
