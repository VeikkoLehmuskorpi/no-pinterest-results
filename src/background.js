/**
 * Blocks Google search results from Pinterest domains by appending the user's
 * search query
 */
chrome.webRequest.onBeforeRequest.addListener(
  function ({ url }) {
    const pinterestBlock = "-site:pinterest.*";

    // Abort if url already contains Pinterest blocking
    if (url.match(pinterestBlock)) return { redirectUrl: url };

    // Find the search query
    const query = url.match(/q=([^&]*&)/)[0].slice(0, -1);

    // Replace the URL with the modified query
    const modifiedQuery = `${query} ${pinterestBlock}&`;
    const modifiedUrl = url.replace(query, modifiedQuery);
    return { redirectUrl: modifiedUrl };
  },
  {
    urls: ["*://www.google.com/search?*"],
    types: ["main_frame"],
  },
  ["blocking"]
);
