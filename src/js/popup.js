document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector("#toggle");

  // Update checkbox state
  const updateCheckboxState = () => {
    const isEnabled = chrome.extension.getBackgroundPage().enabled;
    toggleBtn.checked = isEnabled;
  };

  // Toggle the extension state
  const toggleExtensionState = (isEnabled) => {
    chrome.extension.getBackgroundPage().enabled = isEnabled ? true : false;

    updateCheckboxState();
  };

  // Set the initial checkbox state
  updateCheckboxState();

  // Toggle the extension state on click
  toggleBtn.addEventListener("click", () => {
    toggleExtensionState(toggleBtn.checked);
  });
});
