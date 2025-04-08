import { fetchComics } from "@/lib/marvel";
import { IFComic } from "@/types/marvel";
import { useEffect, useState } from "react";

const useComics = (format: string) => {
  const [comics, setComics] = useState<IFComic[]>([]); // Initialize with empty array
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const res = await fetchComics(offset + 20, 20, format);
      const newComics = res.data.results;

      setComics((prev) => {
        const existingIds = new Set(prev.map((comic) => comic.id));
        const filteredNewComics = newComics.filter(
          (comic: IFComic) => !existingIds.has(comic.id)
        );
        return [...prev, ...filteredNewComics];
      });

      setOffset((prev) => prev + 20);
    } catch (err) {
      console.error("Load more error:", err); // Log the full error
      setError("Failed to load more comics");
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const getComics = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchComics(0, 20, format);
        setComics(res.data.results);
        console.log(res.data.results);
      } catch (err) {
        setError("Failed to load comics. Please try again later.");
        console.error("Error fetching comics:", err);
      } finally {
        setLoading(false);
      }
    };

    getComics();
  }, [format]);
  return {
    comics,
    loading,
    error,
    loadMore,
    loadingMore,
  };
};

export default useComics;
