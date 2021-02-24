/**
 * Blocks Google search results from Pinterest domains by appending the user's
 * search query
 */
chrome.webRequest.onBeforeRequest.addListener(
  function ({ url }) {
    const pinterestBlock = '-site:pinterest.*';

    // Get the original search query
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    const query = searchParams.get('q');

    // Abort if query already contains the Pinterest block
    if (query.includes(pinterestBlock)) return;

    // Prepend the Pinterest block to the query
    const modifiedQuery = `${pinterestBlock} ${query}`;
    const modifiedSearchParams = new URLSearchParams(searchParams.toString());
    modifiedSearchParams.set('q', modifiedQuery);

    // Build a new redirect URL with the modified query parameters
    const modifiedUrl = `${urlObj.origin}${
      urlObj.pathname
    }?${modifiedSearchParams.toString()}`;

    return { redirectUrl: modifiedUrl };
  },
  {
    urls: ['*://www.google.com/search?*'],
    types: ['main_frame'],
  },
  ['blocking'],
);
