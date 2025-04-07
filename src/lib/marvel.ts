import { createHash } from "crypto";

const API_PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY as string;
const API_PRIVATE_KEY = "";

const getMarvelAuthParams = () => {
  const ts = new Date().toISOString();
  const hash = createHash("md5")
    .update(ts + API_PRIVATE_KEY + API_PUBLIC_KEY)
    .digest("hex");

  return {
    ts,
    api_key: API_PUBLIC_KEY,
    hash,
  };
};
const api = `https://gateway.marvel.com/v1/public/comics`;

export const fetchComicsServer = async (
  offset = 0,
  limit = 20,
  format?: string
) => {
  const authParams = getMarvelAuthParams();
  const formatFilter = format ? `&format=${format}` : "";

  const response = await fetch(
    `${api}?limit=${limit}&offset=${offset}${formatFilter}&${new URLSearchParams(
      authParams
    )}`
  );

  if (!response.ok) throw new Error("Failed to fetch comics");
  return response.json();
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
