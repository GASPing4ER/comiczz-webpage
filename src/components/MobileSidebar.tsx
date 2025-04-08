import { FORMATS } from "@/constants";
import { useFilter } from "@/hooks/useFilter";
import Image from "next/image";
import clsx from "clsx";
import { XIcon } from "lucide-react";

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const { format: activeFormat, setFormat } = useFilter();

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 h-full bg-black text-white w-64 z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex justify-between items-center p-4">
        <Image src="/logo.svg" width={84} height={72} alt="comiczz logo" />
        <button
          className="text-white text-2xl"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <XIcon />
        </button>
      </div>
      <ul className="space-y-6 p-4">
        {FORMATS.map((format) => (
          <li key={format.value}>
            <button
              onClick={() => {
                setFormat(format.value);
                onClose();
              }}
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
    </div>
  );
};

export default MobileSidebar;
