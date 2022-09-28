/**
==========================================
 Title:  Util functions
 Author: Edward
 Date:   27 September 2022
==========================================
 */

// External Dependencies
import axios from "axios";

// Internal Dependencies
import { DECK_API_URL } from "../constants/constants";

export const shuffle = async () => {
  const res = await axios.get(`${DECK_API_URL}new/shuffle/?deck_count=1`);
  return res.data;
};

export const draw = async (deckId) => {
  const res = await axios.get(`${DECK_API_URL}${deckId}/draw/?count=1`);
  return res.data;
};
