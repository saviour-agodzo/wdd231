export function setTitle(course) {
    document.querySelector("#course-title").textContent = course.title;
    document.title = `${course.title} | Course Enrollment`;
}

export function renderSections(sections) {
    const container = document.querySelector("#sections");
    container.replaceChildren();
    sections.forEach((section) => {
        const card = document.createElement("article");
        card.className = "section-card";
        const heading = document.createElement("h3");
        heading.textContent = `Section ${section.sectionNumber}`;
        const details = document.createElement("p");
        details.textContent = `${section.enrolled} of ${section.capacity} students · ${section.room}`;
        card.append(heading, details);
        container.append(card);
    });
}