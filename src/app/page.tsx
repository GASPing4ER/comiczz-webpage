"use client";

import { ComicCard } from "@/components";
import { FORMATS } from "@/constants";
import useComics from "@/hooks/useComics";
import { useFilter } from "@/hooks/useFilter";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { format } = useFilter();
  const { comics, loading, error, loadMore, loadingMore } = useComics(format);
  const router = useRouter();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadingMore, loadMore]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
        <button
          onClick={() => router.refresh()}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 flex flex-col gap-[23px]">
      <p className="text-[#828282] font-bold text-[18px] -ml-10">
        Home - {FORMATS.find((f) => f.value === format)?.label}
      </p>
      {comics.length === 0 ? (
        <p className="text-center">No comics found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[18px]">
            {comics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>
          <div ref={ref} className="flex justify-center items-center py-10">
            {loadingMore && (
              <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
