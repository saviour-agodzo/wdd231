const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true,
        description: "Learn programming fundamentals by writing, testing, and improving small programs.",
        certificate: "Web and Computer Programming",
        technology: ["Python", "Visual Studio Code"]
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true,
        description: "Build accessible web pages with foundational HTML and CSS.",
        certificate: "Web and Computer Programming",
        technology: ["HTML", "CSS", "Visual Studio Code"]
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true,
        description: "Use functions, data structures, and problem-solving techniques to write clear programs.",
        certificate: "Web and Computer Programming",
        technology: ["Python", "Visual Studio Code"]
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false,
        description: "Apply object-oriented programming principles to organize and build software.",
        certificate: "Web and Computer Programming",
        technology: ["C#", ".NET", "Visual Studio"]
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false,
        description: "Create responsive, accessible websites using semantic HTML, CSS, and JavaScript.",
        certificate: "Web and Computer Programming",
        technology: ["HTML", "CSS", "JavaScript", "GitHub Pages"]
    },
    {
        subject: "WDD",
        number: 330,
        title: "Web Frontend Development II",
        credits: 3,
        completed: false,
        description: "Develop richer client-side web experiences with modern JavaScript and web APIs.",
        certificate: "Web and Computer Programming",
        technology: ["JavaScript", "Web APIs", "HTML", "CSS"]
    }
];

const courseList = document.querySelector("#course-list");
const creditTotal = document.querySelector("#credit-total");
const filterButtons = document.querySelectorAll(".filter-button");
const courseDetails = document.querySelector("#course-details");

function displayCourseDetails(course) {
    courseDetails.replaceChildren();

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "dialog-close";
    closeButton.setAttribute("aria-label", "Close course details");
    closeButton.textContent = "×";

    const subjectNumber = document.createElement("h2");
    subjectNumber.id = "course-dialog-title";
    subjectNumber.textContent = `${course.subject} ${course.number}`;

    const title = document.createElement("h3");
    title.textContent = course.title;

    const credits = document.createElement("p");
    credits.innerHTML = `<strong>Credits:</strong> ${course.credits}`;

    const description = document.createElement("p");
    description.textContent = course.description;

    const certificate = document.createElement("p");
    certificate.innerHTML = `<strong>Certificate:</strong> ${course.certificate}`;

    const technologies = document.createElement("p");
    technologies.innerHTML = `<strong>Technologies:</strong> ${course.technology.join(", ")}`;

    courseDetails.append(
        closeButton,
        subjectNumber,
        title,
        credits,
        description,
        certificate,
        technologies
    );

    courseDetails.showModal();
    closeButton.focus();

    closeButton.addEventListener("click", () => courseDetails.close());
}

courseDetails.addEventListener("click", (event) => {
    if (event.target === courseDetails) {
        courseDetails.close();
    }
});

function renderCourses(filter = "all") {
    const visibleCourses = filter === "all"
        ? courses
        : courses.filter((course) => course.subject === filter);

    courseList.replaceChildren(...visibleCourses.map((course) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = `course-card${course.completed ? " completed" : ""}`;

        const details = document.createElement("span");
        details.textContent =
            `${course.subject} ${course.number}: ${course.title} · ${course.credits} credits`;
        card.append(details);

        if (course.completed) {
            const status = document.createElement("span");
            status.className = "course-status";
            status.textContent = "✓ Completed";
            card.append(status);
        }

        card.addEventListener("click", () => displayCourseDetails(course));
        return card;
    }));

    const credits = visibleCourses.reduce(
        (sum, course) => sum + course.credits,
        0
    );
    creditTotal.textContent = `${visibleCourses.length} courses · ${credits} credits`;
}

filterButtons.forEach((button) => button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(selected));
    });

    renderCourses(button.dataset.filter);
}));

renderCourses();