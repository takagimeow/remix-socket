import React, { useEffect, useRef, useState } from "react";

export interface Props {
  id: string;
  text?: string;
}

export function MessageField({ id, text = "" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [lastText, setLastText] = useState("");
  const [messageClassName, setMessageClassName] = useState("");
  const [bubbleAClassName, setBubbleAClassName] = useState("");
  const [bubbleBClassName, setBubbleBClassName] = useState("");
  useEffect(() => {
    if (text.length === 0) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
    if (text.length === 0 && text === lastText) {
      setMessageClassName("h-12");
      setBubbleAClassName("top-8");
      setBubbleBClassName("top-16");
    } else if (text.length === 0) {
      setMessageClassName("animate-invert-stretch-height h-12");
      setBubbleAClassName("animate-invert-translate-bubble-a top-8");
      setBubbleBClassName("animate-invert-translate-bubble-b top-16");
    } else {
      setMessageClassName("animate-stretch-height h-48");
      setBubbleAClassName("animate-translate-bubble-a top-44");
      setBubbleBClassName("animate-translate-bubble-b top-52 ");
    }
    // console.log(`[${id}] text > `, text);
    setLastText(text);
  }, [id, text]);
  return (
    <div
      className="flex flex-col justify-center w-full h-full border-2 px-4 "
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <div className="rounded-2xl">
        <div className="relative">
          <div
            id={`messageField-${id}`}
            ref={divRef}
            className={`max-w-full w-screen ${messageClassName} px-8 focus:outline-none text-3xl text-center rounded-2xl bg-gray-300 placeholder:text-gray-100 placeholder:text-sm sm:placeholder:text-3xl text-slate-600 align-middle table-cell ${
              text.length === 0 ? "caret-transparent" : ""
            }`}
          >
            {text}
          </div>
          {text.length === 0 ? (
            <span className="absolute w-96 text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-100">
              何か入力してください...
            </span>
          ) : null}
          <div
            className={`bg-gray-300 w-6 h-6 rounded-full absolute right-0 ${bubbleAClassName}`}
          />
          <div
            className={`bg-gray-300 w-2 h-2 rounded-full absolute right-0 ${bubbleBClassName}`}
          />
          {isFocused ? (
            <span className="absolute text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white text-3xl font-thin animate-pulse-cursor">
              |
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
