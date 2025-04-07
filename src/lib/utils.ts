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
