const DrawButton = ({ handleClick }) => {
  return (
    <button
      type="button"
      className="btn btn-primary px-4 py-2"
      style={{ fontSize: 20, fontWeight: "bold" }}
      onClick={handleClick}
    >
      Draw Card
    </button>
  );
};

export default DrawButton;
