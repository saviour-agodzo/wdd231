import byuiCourse from "./course.mjs";
import { setSectionSelection } from "./sections.mjs";
import { renderSections, setTitle } from "./output.mjs";

setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);

function updateEnrollment(add) {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    const result = byuiCourse.changeEnrollment(sectionNum, add);
    document.querySelector("#status").textContent = result.message;
    renderSections(byuiCourse.sections);
}

document.querySelector("#enrollStudent").addEventListener("click", () => updateEnrollment(true));
document.querySelector("#dropStudent").addEventListener("click", () => updateEnrollment(false));