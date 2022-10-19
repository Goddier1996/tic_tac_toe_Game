import React from "react";
import "../css/game.css";


function SquareVsuser({ val, chooseSquare }) {

  return (
    
    <div className="squareVsUser" onClick={chooseSquare}>
      {val}
    </div>
  );
}

export default SquareVsuser;
