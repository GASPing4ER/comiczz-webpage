import { IFComic } from "@/types/marvel";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { getLowestPrice, getReleaseYear } from "@/lib/utils";

type ComicDetailsPopupProps = {
  comic: IFComic;
};

const ComicDetailsPopup = ({ comic }: ComicDetailsPopupProps) => {
  return (
    <Dialog>
      <DialogTrigger className="comic-button w-full">More info</DialogTrigger>
      <DialogContent className="bg-white w-[643px] min-h-[270px] flex gap-[17px]">
        <Image
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          width={161}
          height={242}
          alt="thumbnail"
          className="comic-thumbnail -ml-2 self-center"
        />
        <div className="w-full flex flex-col justify-between gap-2">
          <DialogTitle className="text-[17px] font-bold">
            {comic.title}
          </DialogTitle>
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
                {comic.characters.items.map((character, i) => (
                  <span key={character.name}>
                    {character.name}
                    {i < comic.characters.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
            {comic.creators.items.length > 0 && (
              <p className="line-clamp-1">
                <strong>Creators:</strong>{" "}
                {comic.creators.items.map((creator, i) => (
                  <span key={creator.name}>
                    {creator.name}
                    {i < comic.creators.items.length - 1 ? ", " : ""}
                  </span>
                ))}
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
            <button className="comic-button w-[140px]">Close</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComicDetailsPopup;
