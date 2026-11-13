export function setSectionSelection(sections) {
    const select = document.querySelector("#sectionNumber");
    select.replaceChildren();
    sections.forEach((section) => {
        const option = document.createElement("option");
        option.value = section.sectionNumber;
        option.textContent = `Section ${section.sectionNumber}`;
        select.append(option);
    });
}