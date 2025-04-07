export interface Thumbnail {
  path: string;
  extension: string;
}

export interface ComicDate {
  type: string;
  date: string;
}

export interface ComicPrice {
  type: string;
  price: number;
}

export interface ResourceList {
  available: number;
  returned: number;
  collectionURI: string;
  items: Array<{
    resourceURI: string;
    name: string;
    role?: string;
  }>;
}

export interface IFComic {
  id: number;
  title: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  format: string;
  pageCount: number;
  thumbnail: Thumbnail;
  dates: ComicDate[];
  prices: ComicPrice[];
  creators: ResourceList;
  characters: ResourceList;
}
