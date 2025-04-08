"use client";

import { FORMATS } from "@/constants";
import { useFilter } from "@/hooks/useFilter";
import Image from "next/image";

const Header = () => {
  const { format: activeFormat, setFormat } = useFilter();
  return (
    <header className="bg-black text-white py-[23px] px-[250px]">
      <div className="flex items-center gap-[60px]">
        <Image src="/logo.svg" width={84} height={72} alt="comiczz logo" />
        <nav>
          <ul className="flex space-x-[60px]">
            {FORMATS.map((format) => (
              <li key={format.value}>
                <button
                  onClick={() => setFormat(format.value)}
                  className={`${
                    activeFormat === format.value ? "text-[#DD2C2C]" : ""
                  } nav-item`}
                >
                  {format.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
