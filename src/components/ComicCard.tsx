import { IFComic } from "@/types/marvel";
import Image from "next/image";
import { ComicDetailsPopup } from "@/components";
import { getLowestPrice } from "@/lib/utils";

type ComicCardProps = {
  comic: IFComic;
};

const ComicCard = ({ comic }: ComicCardProps) => {
  const { thumbnail, title, prices } = comic;
  const price = getLowestPrice(prices);

  return (
    <div className="w-[207px] h-[395px] border-2 border-black rounded-[5px] flex flex-col items-center justify-between p-4 text-center">
      <div className="flex flex-col gap-2">
        <Image
          src={`${thumbnail.path}.${thumbnail.extension}`}
          width={161}
          height={242}
          alt="Comic thumbnail"
          className="comic-thumbnail"
        />
        <h2 className="font-bold text-[15px] line-clamp-2">{title}</h2>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-[19px] font-bold">{price} €</p>
        <ComicDetailsPopup comic={comic} />
      </div>
    </div>
  );
};

export default ComicCard;
