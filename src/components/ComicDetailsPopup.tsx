import { IFComic } from "@/types/marvel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";
import { getLowestPrice, getReleaseYear } from "@/lib/utils";

type ComicDetailsPopupProps = {
  comic: IFComic;
};

const ComicDetailsPopup = ({ comic }: ComicDetailsPopupProps) => {
  return (
    <Dialog>
      <DialogTrigger className="bg-[#DD2C2C] text-white font-bold text-[17px] p-[5px] rounded-[5px] w-full cursor-pointer">
        More info
      </DialogTrigger>
      <DialogContent className="bg-white w-[643px] min-h-[270px] flex gap-[17px]">
        <Image
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          width={161}
          height={242}
          alt="thumbnail"
          className="w-[161px] h-[242px] object-cover -ml-2 self-center"
        />
        <div className="w-full flex flex-col justify-between gap-2">
          <DialogTitle className="text-[17px] font-bold">
            {comic.title}
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="text-[15px] flex flex-col gap-2">
            <p>
              <strong>Year of release:</strong> {getReleaseYear(comic.dates)}
            </p>
            {comic.format !== "" && (
              <p>
                <strong>Format:</strong> {comic.format}
              </p>
            )}
            <p>
              <strong>Pages:</strong> {comic.pageCount}
            </p>
            {comic.characters.items.length > 0 && (
              <p className="line-clamp-1">
                <strong>Characters: </strong>
                {comic.characters.items.map(
                  (character) => `${character.name}, `
                )}
              </p>
            )}
            {comic.creators.items.length > 0 && (
              <p className="line-clamp-1">
                <strong>Creators:</strong>{" "}
                {comic.creators.items.map((character) => `${character.name}, `)}
              </p>
            )}
            {comic.diamondCode && (
              <p>
                <strong>DiamondCode:</strong> {comic.diamondCode}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[19px] font-bold">
              {getLowestPrice(comic.prices)} €
            </p>
            <button className="bg-[#DD2C2C] text-white p-[5px] w-[140px] rounded-[5px] font-bold text-[17px]">
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComicDetailsPopup;
