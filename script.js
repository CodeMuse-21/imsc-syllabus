function loadSemester(semNumber) {
  fetch(`data/semester${semNumber}.json`)
    .then((response) => response.json())
    .then((data) => displaySemester(data))
    .catch((error) => console.error("Error loading JSON:", error));
}

function displaySemester(data) {
  const container = document.getElementById("syllabus-container");
  container.innerHTML = ""; // Clear previous

  const heading = document.createElement("h2");
  heading.textContent = `Semester ${data.semester} — Total Credits: ${data.total_credits}`;
  container.appendChild(heading);

  data.courses.forEach((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.classList.add("course");

    // Course Button
    const courseBtn = document.createElement("button");
    courseBtn.textContent = course.title;
    courseBtn.className = "course-btn";
    courseDiv.appendChild(courseBtn);

    // Hidden Module Section
    const moduleSection = document.createElement("div");
    moduleSection.classList.add("module-section", "hidden");

    const moduleBtnContainer = document.createElement("div");
    moduleBtnContainer.classList.add("module-btn-container");
    const moduleText = document.createElement("p");
    moduleText.classList.add("module-text");

    // Create module buttons
    if (course.modules) {
      course.modules.forEach((mod, i) => {
        const btn = document.createElement("button");
        btn.textContent = `Module ${i + 1}`;
        btn.className = "module-btn";
        btn.addEventListener("click", () => {
          moduleText.textContent = `Module ${i + 1}: ${mod}`;
        });
        moduleBtnContainer.appendChild(btn);
      });
    }

    moduleSection.appendChild(moduleBtnContainer);
    moduleSection.appendChild(moduleText);

    // For VAC options
    if (course.options) {
      const optionsPara = document.createElement("p");
      optionsPara.textContent = "Options: " + course.options.join(", ");
      optionsPara.className = "module-text";
      moduleSection.appendChild(optionsPara);
    }

    courseBtn.addEventListener("click", () => {
      moduleSection.classList.toggle("hidden");
    });

    courseDiv.appendChild(moduleSection);
    container.appendChild(courseDiv);
  });
}

// 🔁 Add event listeners to semester buttons
document.querySelectorAll(".sem-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const sem = tab.dataset.sem;
    loadSemester(sem);
  });
});

// 🚀 Load Semester 1 on first open
window.onload = () => loadSemester(1);
