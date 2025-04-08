"use client";

import { FORMATS } from "@/constants";
import { useFilter } from "@/hooks/useFilter";
import Image from "next/image";
import clsx from "clsx";

const Header = () => {
  const { format: activeFormat, setFormat } = useFilter();

  return (
    <header className="bg-black text-white py-[23px] px-[250px]">
      <div className="flex items-center justify-between">
        <Image src="/logo.svg" width={84} height={72} alt="comiczz logo" />
        <nav>
          <ul className="flex space-x-12">
            {FORMATS.map((format) => (
              <li key={format.value}>
                <button
                  onClick={() => setFormat(format.value)}
                  className={clsx(
                    "nav-item",
                    activeFormat === format.value && "text-red-600"
                  )}
                  aria-label={`Select ${format.label}`}
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
