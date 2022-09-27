import useSound from "use-sound";
import { useEffect, useState } from "react";

// sounds
import btnClkSd from "../../assets/sounds/button-click.wav";
import spStSd from "../../assets/sounds/snap-suit.wav";
import spValSd from "../../assets/sounds/snap-value.wav";
import drAllSd from "../../assets/sounds/drawn-all.wav";

import Card from "../Card";
import DrawButton from "../DrawButton";
import useDebounce from "../../hooks/useDebounce";
import { SNAP_WORDS } from "../../constants/constants";
import { draw, shuffle } from "../../utils/utils";

const DeckofCards = () => {
  const [prevCard, setPrevCard] = useState({}); // previous card
  const [curCard, setCurCard] = useState({}); // current card
  const [snapState, setSnapState] = useState("none"); // snap message status
  const [snapSuitCount, setSnapSuitCount] = useState(0); // snap suit count
  const [snapValueCount, setSnapValueCount] = useState(0); // snap value count
  const [deckId, setDeckId] = useState(""); // deck id
  const [remaining, setRemaining] = useState(52); // remaining cards

  // hooks for playing the sounds
  const [playDrawSound] = useSound(btnClkSd);
  const [playSuitSound] = useSound(spStSd);
  const [playValueSound] = useSound(spValSd);
  const [playAllSound] = useSound(drAllSd);

  // draw the cards
  const handleDraw = useDebounce(async () => {
    playDrawSound();
    try {
      const res = await draw(deckId);

      if (res.remaining === 0) {
        playAllSound();
      }
      // handle the snap message
      setPrevCard(curCard);
      setCurCard(res.cards[0]);
      setRemaining(res.remaining);

      if (curCard.code) {
        if (curCard.suit === res.cards[0].suit) {
          playSuitSound();
          setSnapSuitCount(snapSuitCount + 1);
          setSnapState("suit");
        } else if (curCard.value === res.cards[0].value) {
          playValueSound();
          setSnapValueCount(snapValueCount + 1);
          setSnapState("value");
        } else {
          setSnapState("none");
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  // Shuffle the cards at beginning
  useEffect(() => {
    const _shuffle = async () => {
      try {
        const res = await shuffle();
        console.log(res);
        setDeckId(res.deck_id);
        setRemaining(res.remaining);
      } catch (e) {
        console.log(e);
      }
    };
    _shuffle();
  }, []);

  return (
    <div className="wrapper">
      <div className="msgContainer">
        {remaining ? (
          <p className="msg" id="snap_msg">
            {SNAP_WORDS[snapState]}
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="cardConatiner">
        <Card cardName={prevCard.code} />
        <Card cardName={curCard.code} />
      </div>
      <div className="btnContainer">
        {!remaining ? (
          <div className="matchMessages">
            <p className="msg">VALUE MATCHES: {snapValueCount}</p>
            <p className="msg">SUIT MATCHES: {snapSuitCount}</p>
          </div>
        ) : (
          <DrawButton handleClick={handleDraw} />
        )}
      </div>
    </div>
  );
};

export default DeckofCards;