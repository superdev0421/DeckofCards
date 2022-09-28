/**
==========================================
 Title:  Card Component
 Author: Edward
 Date:   27 September 2022
==========================================
 */

// External Dependencies
import { useEffect, useState } from "react";

const Card = ({ src }) => {
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    setLoadedSrc(null);
    if (src) {
      const handleLoad = () => {
        setLoadedSrc(src);
      };
      const image = new Image();
      image.addEventListener("load", handleLoad);
      image.src = src;
      return () => {
        image.removeEventListener("load", handleLoad);
      };
    }
  }, [src]);

  return (
    <div className="border border-dark cardContainer">
      {src && loadedSrc === src ? (
        <img src={src} alt={src} className="card" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Card;
