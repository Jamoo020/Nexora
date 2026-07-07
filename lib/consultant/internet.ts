const SERPAPI_KEY = process.env.SERPAPI_KEY;
const BING_API_KEY = process.env.BING_API_KEY;

export function shouldSearch(text: string) {
  const normalized = text.toLowerCase();
  return normalized.includes("cost") || normalized.includes("trends") || normalized.includes("how much") || normalized.includes("latest") || normalized.includes("market") || normalized.includes("compare");
}

export async function searchWeb(query: string) {
  if (SERPAPI_KEY) {
    return searchWithSerpApi(query);
  }
  if (BING_API_KEY) {
    return searchWithBing(query);
  }
  return "";
}

async function searchWithSerpApi(query: string) {
  const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&num=3&api_key=${SERPAPI_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    return `Unable to fetch search results from SerpAPI (${response.status}).`;
  }
  const data = await response.json();
  const results = (data.organic_results || []).slice(0, 3).map((item: any) => `- ${item.title}: ${item.snippet} (${item.link})`);
  return `Live market data from search:\n${results.join("\n")}`;
}

async function searchWithBing(query: string) {
  if (!BING_API_KEY) {
    return "Bing search is not configured.";
  }

  const url = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}&count=3`;
  const response = await fetch(url, {
    headers: { "Ocp-Apim-Subscription-Key": BING_API_KEY },
  });
  if (!response.ok) {
    return `Unable to fetch search results from Bing (${response.status}).`;
  }
  const data = await response.json();
  const results = (data.webPages?.value || []).slice(0, 3).map((item: any) => `- ${item.name}: ${item.snippet} (${item.url})`);
  return `Live market data from search:\n${results.join("\n")}`;
}
