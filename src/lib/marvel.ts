import { createHash } from "crypto";

const API_PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY as string;

// Couldn't get private key from marvel developer website -> problems with authentication
const API_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY || "";

const getMarvelAuthParams = () => {
  if (!API_PRIVATE_KEY) {
    throw new Error(
      "Private key is missing. Please configure it in the environment variables."
    );
  }

  const ts = Date.now().toString();
  const hash = createHash("md5")
    .update(ts + API_PRIVATE_KEY + API_PUBLIC_KEY)
    .digest("hex");

  return {
    ts,
    api_key: API_PUBLIC_KEY,
    hash,
  };
};

// Helper function to build query params
const buildQueryParams = (params: Record<string, string>) => {
  return new URLSearchParams(params).toString();
};

// Base API URL
const api = `https://gateway.marvel.com/v1/public/comics`;

export const fetchComicsServer = async (
  offset = 0,
  limit = 20,
  format = ""
) => {
  const authParams = getMarvelAuthParams();

  const params = {
    ...authParams,
    limit: limit.toString(),
    offset: offset.toString(),
    format: format,
  };

  const query = buildQueryParams(params);
  const url = `${api}?${query}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch comics: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw new Error("Failed to fetch comics from the server.");
  }
};

export const fetchComics = async (offset = 0, limit = 20, format?: string) => {
  const params = new URLSearchParams({
    apikey: API_PUBLIC_KEY,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  if (format) {
    params.append("format", format);
  }

  const response = await fetch(`${api}?${params}`);

  if (!response.ok) {
    throw new Error(`Marvel API error: ${response.status}`);
  }

  return await response.json();
};
