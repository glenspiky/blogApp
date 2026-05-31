import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroButton() {
  return (
    <Button
      asChild
      className="bg-[#009e66] hover:bg-[#008554] text-white font-sans text-xl font-medium px-6 py-4 h-auto rounded-xl cursor-pointer group transition-colors duration-200"
    >
      <Link href="/blogs" className="flex items-center gap-3">
        Explore Stories
        {/* A premium, thin, sharp geometric arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </Button>
  );
}
