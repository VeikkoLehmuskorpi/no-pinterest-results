document.addEventListener("DOMContentLoaded", () => {
  const stateElem = document.querySelector("#state");
  const toggleBtn = document.querySelector("#toggle");

  // Update state label
  const updateStateLabel = () => {
    const isEnabled = chrome.extension.getBackgroundPage().enabled;
    stateElem.textContent = isEnabled ? "Enabled" : "Disabled";
    toggleBtn.checked = isEnabled;
  };

  // Toggle the extension state
  const toggleExtensionState = (isEnabled) => {
    chrome.extension.getBackgroundPage().enabled = isEnabled ? true : false;

    updateStateLabel();
  };

  // Set the initial state label
  updateStateLabel();

  toggleBtn.addEventListener("click", () => {
    toggleExtensionState(toggleBtn.checked);
  });
});
