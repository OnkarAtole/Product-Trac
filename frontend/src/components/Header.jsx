import React from "react";
import StoreIcon from "@mui/icons-material/Store";

export default function Header() {
  return (
    <div className="bg-[#86e6a2] h-[80px] flex items-center px-6 w-full mb-10">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <StoreIcon className="text-[70px] text-white" />
        <h1 className="text-[20px] text-white font-bold">Product Trac</h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="ml-auto flex items-center">
        <button className="bg-[#aff2c3] text-white px-4 py-2 rounded-lg font-semibold backdrop-opacity-40 hover:scale-110"onClick={() => window.location.reload()}>
          Refresh
        </button>
      </div>

    </div>
  );
}
