/**
==========================================
 Title:  DrawButton Component
 Author: Edward
 Date:   27 September 2022
==========================================
 */

const DrawButton = ({ handleClick }) => {
  return (
    <button
      type="button"
      className="btn btn-primary px-4 py-2 drawButton"
      onClick={handleClick}
    >
      Draw Card
    </button>
  );
};

export default DrawButton;
