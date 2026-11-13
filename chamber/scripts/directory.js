const directory = document.querySelector("#member-directory");
const statusMessage = document.querySelector("#directory-status");
const viewButtons = document.querySelectorAll(".view-button");
const memberDataUrl = new URL("../data/members.json", document.currentScript.src);

function makeMemberCard(member) {
    const article = document.createElement("article");
    article.className = "member-card";

    const image = document.createElement("img");
    image.src = new URL(`../images/${member.image}`, memberDataUrl).href;
    image.alt = `${member.name} logo`;
    image.width = 640;
    image.height = 360;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "member-card-content";

    const heading = document.createElement("h3");
    heading.textContent = member.name;

    const category = document.createElement("p");
    category.className = "category";
    category.textContent = member.category;

    const address = document.createElement("address");
    address.append(document.createTextNode(`${member.address} · ${member.phone}`));

    const website = document.createElement("a");
    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener noreferrer";
    website.textContent = member.website.replace(/^https?:\/\//, "");
    address.append(document.createElement("br"), website);

    const membership = document.createElement("span");
    membership.className = "membership";
    membership.textContent = `${["Member", "Silver", "Gold"][member.membership - 1]} member`;

    content.append(heading, category, address, membership);
    article.append(image, content);

    return article;
}

async function loadMembers() {
    try {
        const response = await fetch(memberDataUrl);
        if (!response.ok) {
            throw new Error(`Member data request failed (${response.status})`);
        }

        const members = await response.json();
        if (!Array.isArray(members) || members.length === 0) {
            throw new Error("The member data file must contain a non-empty array of businesses.");
        }

        directory.replaceChildren(...members.map(makeMemberCard));
        statusMessage.textContent = members.length >= 7
            ? `${members.length} local businesses`
            : `${members.length} members loaded. Add at least seven businesses to meet the assignment requirement.`;
    } catch (error) {
        statusMessage.textContent =
            "Member listings could not be loaded. Run this page through a local web server and check that data/members.json is available.";
        console.error(error);
    }
}

function setView(view) {
    const isGrid = view === "grid";

    directory.classList.toggle("grid-view", isGrid);
    directory.classList.toggle("list-view", !isGrid);

    viewButtons.forEach((button) => {
        const selected = button.dataset.view === view;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
    });
}

viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setView(button.dataset.view);
    });
});

setView("grid");
loadMembers();