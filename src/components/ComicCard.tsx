import { IFComic } from "@/types/marvel";
import Image from "next/image";

type ComicCardProps = {
  comic: IFComic;
};
const ComicCard = ({ comic }: ComicCardProps) => {
  return (
    <div className="w-[207px] h-[395px] border-2 border-black flex flex-col items-center justify-between py-[12px] px-[21px] text-center">
      <div className="flex flex-col gap-[9px]">
        <Image
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          width={161}
          height={242}
          alt="thumbnail"
          className="w-[161px] h-[242px] object-cover"
        />
        <h2 className="font-bold text-[15px] line-clamp-2">{comic.title}</h2>
      </div>
      <div className="flex flex-col gap-[9px] w-full">
        <p className="text-[19px] font-bold">{comic.prices[0].price} €</p>
        <button className="bg-[#DD2C2C] text-white font-bold text-[17px] p-[5px] rounded-[5px] w-full cursor-pointer">
          More info
        </button>
      </div>
    </div>
  );
};

export default ComicCard;
