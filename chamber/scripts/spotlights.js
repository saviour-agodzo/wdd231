const spotlightContainer = document.querySelector("#spotlight-list");
const spotlightStatus = document.querySelector("#spotlights-status");
const memberDataUrl = new URL("../data/members.json", document.currentScript.src);

function shuffle(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled;
}

function makeSpotlight(member) {
    const article = document.createElement("article");
    article.className = "spotlight-card";

    const logo = document.createElement("img");
    logo.src = new URL(`../images/${member.image}`, memberDataUrl).href;
    logo.alt = `${member.name} logo`;
    logo.width = 640;
    logo.height = 360;
    logo.loading = "lazy";

    const heading = document.createElement("h3");
    heading.textContent = member.name;

    const tier = document.createElement("p");
    tier.className = "spotlight-tier";
    tier.textContent = `${["", "Silver", "Gold"][member.membership]} member`;

    const details = document.createElement("address");
    details.className = "spotlight-details";
    details.append(document.createTextNode(member.address));
    details.append(document.createElement("br"), document.createTextNode(member.phone));

    const website = document.createElement("a");
    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener noreferrer";
    website.textContent = member.website.replace(/^https?:\/\//, "");
    details.append(document.createElement("br"), website);

    article.append(logo, heading, tier, details);
    return article;
}

async function loadSpotlights() {
    try {
        const response = await fetch(memberDataUrl);
        if (!response.ok) throw new Error(`Member data request failed (${response.status})`);
        const members = await response.json();
        const eligibleMembers = shuffle(members.filter((member) => member.membership === 2 || member.membership === 3));
        const count = Math.min(eligibleMembers.length, Math.random() < 0.5 ? 2 : 3);

        if (count < 2) throw new Error("At least two silver or gold members are required for spotlights.");

        spotlightContainer.replaceChildren(...eligibleMembers.slice(0, count).map(makeSpotlight));
        spotlightStatus.textContent = "Featured silver and gold members";
    } catch (error) {
        spotlightStatus.textContent = "Member spotlights could not be loaded. Check data/members.json and the member image files.";
        console.error(error);
    }
}

loadSpotlights();