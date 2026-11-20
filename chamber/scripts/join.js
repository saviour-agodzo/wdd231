const timestampField = document.querySelector("#timestamp");
timestampField.value = new Date().toISOString();

document.querySelectorAll("[data-modal-target]").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const dialog = document.getElementById(link.dataset.modalTarget);
        if (dialog) dialog.showModal();
    });
});

document.querySelectorAll(".benefit-dialog").forEach((dialog) => {
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });
});