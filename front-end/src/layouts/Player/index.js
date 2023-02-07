import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
function PlayerLoti(props) {
  const [player, setPlayer] = useState();
  return <Player loop src={props.src} {...props} />;
}

export default PlayerLoti;
