const byuiCourse = {
    title: "WDD 231: Web Frontend Development I",
    sections: [
        { sectionNumber: 1, room: "Online", enrolled: 24, capacity: 30 },
        { sectionNumber: 2, room: "Online", enrolled: 28, capacity: 30 },
        { sectionNumber: 3, room: "Online", enrolled: 19, capacity: 25 },
        { sectionNumber: 4, room: "Online", enrolled: 22, capacity: 25 }
    ],
    changeEnrollment(sectionNumber, add = true) {
        const section = this.sections.find((item) => item.sectionNumber === sectionNumber);
        if (!section) return { ok: false, message: "Choose a valid section." };
        if (add && section.enrolled >= section.capacity) {
            return { ok: false, message: `Section ${sectionNumber} is full.` };
        }
        if (!add && section.enrolled <= 0) {
            return { ok: false, message: `Section ${sectionNumber} has no students to drop.` };
        }
        section.enrolled += add ? 1 : -1;
        return { ok: true, message: `Section ${sectionNumber}: ${add ? "student enrolled" : "student dropped"}.` };
    }
};

export default byuiCourse;