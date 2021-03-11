/**
 * Blocks Google search results from Pinterest domains by appending the user's
 * search query
 */
chrome.webRequest.onBeforeRequest.addListener(
  function ({ url }) {
    // Check if the extension is in enabled state
    const isEnabled = chrome.extension.getBackgroundPage().enabled;
    if (!isEnabled) return;

    const pinterestBlock = "-site:pinterest.*";

    // Get the original search query
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    const query = searchParams.get("q");

    // Abort if query already contains the Pinterest block
    if (query.includes(pinterestBlock)) return;

    // Prepend the Pinterest block to the query
    const modifiedQuery = `${query} ${pinterestBlock}`;
    const modifiedSearchParams = new URLSearchParams(searchParams.toString());
    modifiedSearchParams.set("q", modifiedQuery);

    // Build a new redirect URL with the modified query parameters
    const modifiedUrl = `${urlObj.origin}${
      urlObj.pathname
    }?${modifiedSearchParams.toString()}`;

    return { redirectUrl: modifiedUrl };
  },
  {
    urls: ["*://www.google.com/search?*"],
    types: ["main_frame"],
  },
  ["blocking"]
);

/**
 * Toggles the extension state when the browser action icon is clicked
 */
chrome.browserAction.onClicked.addListener(function (_tab) {
  chrome.extension.getBackgroundPage().enabled = !chrome.extension.getBackgroundPage()
    .enabled;
  const isEnabled = chrome.extension.getBackgroundPage().enabled;
  chrome.browserAction.setTitle({
    title: `Pinterest blocking is ${isEnabled ? "ENABLED" : "DISABLED"}`,
  });
  chrome.browserAction.setIcon({
    path: isEnabled
      ? {
          16: "src/img/icons/icon16.png",
          48: "src/img/icons/icon48.png",
        }
      : {
          16: "src/img/icons/icon16-disabled.png",
          48: "src/img/icons/icon48-disabled.png",
        },
  });
});
