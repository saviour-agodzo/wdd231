const courses = [
    { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: false },
    { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: false },
    { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: false },
    { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false },
    { subject: "WDD", number: 231, title: "Web Frontend Development I", credits: 2, completed: false },
    { subject: "WDD", number: 330, title: "Web Frontend Development II", credits: 3, completed: false }
];

const courseList = document.querySelector("#course-list");
const creditTotal = document.querySelector("#credit-total");
const filterButtons = document.querySelectorAll(".filter-button");

function renderCourses(filter = "all") {
    const visibleCourses = filter === "all" ? courses : courses.filter((course) => course.subject === filter);
    courseList.replaceChildren(...visibleCourses.map((course) => {
        const card = document.createElement("div");
        card.className = `course-card${course.completed ? " completed" : ""}`;
        card.textContent = `${course.subject} ${course.number}: ${course.title} · ${course.credits} credits`;
        return card;
    }));
    const credits = visibleCourses.reduce((sum, course) => sum + course.credits, 0);
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