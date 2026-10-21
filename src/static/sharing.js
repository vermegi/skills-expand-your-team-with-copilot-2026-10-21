export function createSharingControls(name) {
  const activityUrl = new URL(window.location.pathname, window.location.origin);
  activityUrl.searchParams.set("activity", name);
  const url = activityUrl.href;
  const text = `Join me at ${name} at Mergington High School!`;

  const controls = document.createElement("div");
  controls.className = "activity-sharing";
  controls.setAttribute("role", "group");
  controls.setAttribute("aria-label", `Share ${name}`);

  const label = document.createElement("span");
  label.textContent = "Share:";
  controls.appendChild(label);

  const destinations = [
    ["WhatsApp", "https://wa.me/", { text: `${text} ${url}` }],
    ["Facebook", "https://www.facebook.com/sharer/sharer.php", { u: url }],
    ["X", "https://twitter.com/intent/tweet", { text, url }],
  ];

  destinations.forEach(([platform, endpoint, parameters]) => {
    const shareUrl = new URL(endpoint);
    shareUrl.search = new URLSearchParams(parameters).toString();
    const link = document.createElement("a");
    link.href = shareUrl.href;
    link.textContent = platform;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Share ${name} on ${platform} (opens a new tab)`);
    controls.appendChild(link);
  });

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.textContent = "Copy link";
  copyButton.setAttribute("aria-label", `Copy link to ${name}`);

  const status = document.createElement("span");
  status.className = "share-status";
  status.setAttribute("role", "status");

  const manualLink = document.createElement("input");
  manualLink.type = "text";
  manualLink.readOnly = true;
  manualLink.value = url;
  manualLink.className = "share-link-input hidden";
  manualLink.setAttribute("aria-label", `Link to ${name}`);

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(url);
      manualLink.classList.add("hidden");
      status.textContent = "Link copied!";
    } catch {
      manualLink.classList.remove("hidden");
      manualLink.focus();
      manualLink.select();
      status.textContent = "Copy the selected link to share this activity.";
    }
  });

  controls.append(copyButton, manualLink, status);
  return controls;
}
