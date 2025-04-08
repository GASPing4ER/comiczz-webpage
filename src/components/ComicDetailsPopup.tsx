"use client";

import { IFComic } from "@/types/marvel";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { getLowestPrice, getReleaseYear } from "@/lib/utils";
import { useState } from "react";

type ComicDetailsPopupProps = {
  comic: IFComic;
};

const ComicDetailsPopup = ({ comic }: ComicDetailsPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    thumbnail,
    title,
    dates,
    format,
    pageCount,
    characters,
    creators,
    diamondCode,
    prices,
  } = comic;

  const renderListItems = (items: { name: string }[], label: string) => {
    if (items.length === 0) return null;

    return (
      <p className="line-clamp-1">
        <strong>{label}: </strong>
        {items.map((item, i) => (
          <span key={item.name}>
            {item.name}
            {i < items.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    );
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="comic-button w-full"
      >
        More info
      </DialogTrigger>
      <DialogContent className="bg-white w-[643px] min-h-[270px] flex gap-4 p-6">
        <div className="flex-shrink-0 -ml-2 self-center">
          <Image
            src={`${thumbnail.path}.${thumbnail.extension}`}
            width={161}
            height={242}
            alt={`Cover of ${title}`}
            className="comic-thumbnail"
          />
        </div>

        <div className="flex flex-col justify-between flex-grow gap-4">
          <div>
            <DialogTitle className="text-lg font-bold mb-4">
              {title}
            </DialogTitle>

            <div className="text-sm space-y-2">
              <DetailItem
                label="Year of release"
                value={getReleaseYear(dates)}
              />
              {format && <DetailItem label="Format" value={format} />}
              <DetailItem label="Pages" value={pageCount} />
              {renderListItems(characters.items, "Characters")}
              {renderListItems(creators.items, "Creators")}
              {diamondCode && (
                <DetailItem label="Diamond Code" value={diamondCode} />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold">
              {getLowestPrice(prices)} €
            </span>
            <button onClick={handleClose} className="comic-button w-[140px]">
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type DetailsItemsProps = {
  label: string;
  value?: string | number;
};

const DetailItem = ({ label, value }: DetailsItemsProps) =>
  value ? (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  ) : null;

export default ComicDetailsPopup;
