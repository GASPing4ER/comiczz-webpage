"use client";

import { FORMATS } from "@/constants";
import { useFilter } from "@/hooks/useFilter";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { MobileSidebar } from "@/components";
import { MenuIcon } from "lucide-react";

const Header = () => {
  const { format: activeFormat, setFormat } = useFilter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-black text-white py-[23px] px-[20px] lg:px-[250px] relative">
      <div className="flex items-center md:justify-baseline gap-12">
        <Image src="/logo.svg" width={84} height={72} alt="comiczz logo" />

        {/* Hamburger icon for mobile */}
        <button
          className="ml-auto lg:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
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

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </header>
  );
};

export default Header;
