import { fetchComics } from "@/lib/marvel";
import { IFComic } from "@/types/marvel";
import { useEffect, useState } from "react";

const useComics = (format: string) => {
  const [comics, setComics] = useState<IFComic[]>([]); // Initialize with empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  };
};

export default useComics;
