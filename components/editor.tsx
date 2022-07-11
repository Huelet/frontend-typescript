import React, { Dispatch, SetStateAction } from "react";

export interface EditorProps {
  chonky: boolean;
  value: string;
  output: Dispatch<SetStateAction<string>>;
}

export const MilkdownEditor = ({ value, chonky, output }: EditorProps) => {
  return (
    <div></div>
  )
};
