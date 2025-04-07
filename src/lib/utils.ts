import { IFComic } from "@/types/marvel";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLowestPrice = (prices?: IFComic["prices"]): number | null => {
  if (!prices || prices.length === 0) return null;

  // Filter out invalid prices and convert to numbers
  const sortedPrices = prices.sort((a, b) => a.price - b.price);

  return sortedPrices[0].price;
};

export const getReleaseYear = (dates: IFComic["dates"]) => {
  const dateTypesToTry = [
    "onsaleDate", // Primary preferred date
    "focDate", // Final order cutoff date
    "unlimitedDate", // Marvel Unlimited release
    "digitalPurchaseDate", // Digital release
    dates[0]?.type, // Any available date as last resort
  ].filter(Boolean); // Remove undefined values

  for (const dateType of dateTypesToTry) {
    const dateObj = dates.find((d) => d.type === dateType);
    if (dateObj?.date) {
      return new Date(dateObj.date).getFullYear().toString();
    }
  }

  return "Year unknown"; // Final fallback
};
