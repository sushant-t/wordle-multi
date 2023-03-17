import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext, AppContextProps } from "../App";

type KeyProps = {
  value: string;
};
function Key(props: KeyProps) {
  const { value } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setActive] = useState(false);

  // connect on-screen keyboard to keyboard events, easiest way to implement this
  const handleKeyPress = (event: React.MouseEvent<HTMLDivElement>) => {
    let code = event.currentTarget.innerText;
    if (event.currentTarget.innerText == "\u23ce") code = "Enter";
    if (event.currentTarget.innerText == "\u232b") code = "Backspace";
    if (ref.current)
      ref.current.ownerDocument.dispatchEvent(
        new KeyboardEvent("keydown", { key: code })
      );
  };

  // handler to trigger button ripple effect when pressed
  const toggleActive = (state: boolean) => {
    setActive(state);
  };

  let { keyboard } = useContext(AppContext) as AppContextProps;

  let keyColor = "";

  // get key color for this key component for CSS purposes
  keyboard.forEach((row: any) => {
    let ind = row
      .map((x: { letter: string; color: string }) => x.letter)
      .indexOf(value);
    if (ind >= 0) {
      keyColor = row[ind].color;
    }
  });

  const className = `key ${keyColor}-letter ${isActive ? "pressed" : null}`;

  return (
    <div
      className={className}
      onClick={handleKeyPress}
      onMouseDown={() => toggleActive(true)}
      onMouseUp={() => toggleActive(false)}
      ref={ref}
    >
      {value}
    </div>
  );
}

export default Key;
