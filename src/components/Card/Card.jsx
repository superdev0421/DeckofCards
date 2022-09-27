import { IMAGE_URL } from "../../constants/constants";

const Card = ({ cardName }) => {
  return (
    <div className="border border-dark" style={{ width: 230, height: 315 }}>
      {cardName ? (
        <img
          src={`${IMAGE_URL}${cardName}.png`}
          alt={cardName}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Card;
