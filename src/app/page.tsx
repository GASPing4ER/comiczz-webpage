"use client";

import { ComicCard } from "@/components";
import { FORMATS } from "@/constants";
import useComics from "@/hooks/useComics";
import { useFilter } from "@/hooks/useFilter";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const LoadingSpinner = () => (
  <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
);

const RetryButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
  >
    Retry
  </button>
);

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
      <p className="text-[#828282] font-bold text-[18px] ml-2">
        Home &gt;{" "}
        {`${FORMATS.find((f) => f.value === format)?.label}${
          format !== "" ? "s" : ""
        }`}
      </p>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-8 text-red-500">
          {error}
          <RetryButton onClick={() => router.refresh()} />
        </div>
      )}

      {/* No comics found */}
      {comics.length === 0 && !loading && !error && (
        <p className="text-center">No comics found</p>
      )}

      {/* Comics Grid */}
      {comics.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center gap-6">
            {comics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>
          <div ref={ref} className="flex justify-center items-center py-10">
            {loadingMore && <LoadingSpinner />}
          </div>
        </>
      )}
    </div>
  );
}
