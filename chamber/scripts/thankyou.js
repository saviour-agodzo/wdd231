const params = new URLSearchParams(window.location.search);

const submittedFields = {
    "submitted-first-name": "firstName",
    "submitted-last-name": "lastName",
    "submitted-email": "email",
    "submitted-phone": "phone",
    "submitted-organization": "organization",
    "submitted-title": "organizationTitle",
    "submitted-membership": "membershipLevel",
    "submitted-description": "description"
};

Object.entries(submittedFields).forEach(([elementId, parameterName]) => {
    const element = document.getElementById(elementId);
    const value = params.get(parameterName);
    element.textContent = value || "Not provided";
});

const membershipNames = {
    np: "NP Membership",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold: "Gold Membership"
};
const submittedMembership = params.get("membershipLevel");
document.querySelector("#submitted-membership").textContent = membershipNames[submittedMembership] || "Not provided";

const timestampValue = params.get("timestamp");
const timestampOutput = document.querySelector("#submitted-timestamp");
if (timestampValue) {
    const submittedDate = new Date(timestampValue);
    timestampOutput.textContent = Number.isNaN(submittedDate.getTime())
        ? timestampValue
        : submittedDate.toLocaleString();
} else {
    timestampOutput.textContent = "Not available";
}