import React, { useContext } from "react";
import { AppContext, AppContextProps } from "../App";

type KeyProps = {
  value: string;
};
function Key(props: KeyProps) {
  const { value } = props;

  let { keyboard } = useContext(AppContext) as AppContextProps;

  let keyColor = "";
  keyboard.forEach((row: any) => {
    let ind = row
      .map((x: { letter: string; color: string }) => x.letter)
      .indexOf(value);
    if (ind >= 0) {
      keyColor = row[ind].color;
    }
  });

  const className = `key ${keyColor}-letter`;

  return <div className={className}>{value}</div>;
}

export default Key;
