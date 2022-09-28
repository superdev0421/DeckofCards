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
    <div className="border border-dark" style={{ width: 230, height: 315 }}>
      {src && loadedSrc === src ? (
        <img src={src} alt={src} style={{ width: "100%", height: "100%" }} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Card;
