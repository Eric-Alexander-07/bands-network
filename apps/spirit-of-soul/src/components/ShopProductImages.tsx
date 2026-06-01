"use client";

import { useState } from "react";

interface Props {
  front: string;
  back: string;
  name: string;
}

export default function ShopProductImages({ front, back, name }: Props) {
  const [active, setActive] = useState<"front" | "back">("front");

  return (
    <div className="shop-img-viewer">
      <div className="shop-img-main">
        <img
          key={active}
          src={active === "front" ? front : back}
          alt={`${name} — ${active === "front" ? "Vorderseite" : "Rückseite"}`}
          className="shop-img-active"
        />
      </div>
      <div className="shop-img-thumbs">
        <button
          className={`shop-img-thumb${active === "front" ? " active" : ""}`}
          onClick={() => setActive("front")}
        >
          <div className="shop-img-thumb-img">
            <img src={front} alt={`${name} Vorderseite`} />
          </div>
          <span>Vorderseite</span>
        </button>
        <button
          className={`shop-img-thumb${active === "back" ? " active" : ""}`}
          onClick={() => setActive("back")}
        >
          <div className="shop-img-thumb-img">
            <img src={back} alt={`${name} Rückseite`} />
          </div>
          <span>Rückseite</span>
        </button>
      </div>
    </div>
  );
}
