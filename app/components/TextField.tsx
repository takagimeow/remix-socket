import React, { useEffect, useRef, useState } from "react";
import { Form } from "remix";

export interface Props {
  id: string;
  text?: string;
  onChange?: (text: string) => void;
}

export function TextField({ id, text = "", onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [value, setValue] = useState(text);
  const [isFocused, setIsFocused] = useState(false);
  const [messageClassName, setMessageClassName] = useState("");
  const [bubbleAClassName, setBubbleAClassName] = useState("");
  const [bubbleBClassName, setBubbleBClassName] = useState("");
  const [lastValue, setLastValue] = useState<string | null>(null)

  useEffect(() => {
    console.log("value: ", value)
    if (!lastValue) {
      setMessageClassName("h-12");
      setBubbleAClassName("top-8");
      setBubbleBClassName("top-16");
    }
    else if (value.length === 0) {
      setMessageClassName("animate-invert-stretch-height h-12");
      setBubbleAClassName("animate-invert-translate-bubble-a top-8");
      setBubbleBClassName("animate-invert-translate-bubble-b top-16");
    } else {
      setMessageClassName("animate-stretch-height h-48");
      setBubbleAClassName("animate-translate-bubble-a top-44");
      setBubbleBClassName("animate-translate-bubble-b top-52 ");
    }
    setLastValue(value)
    return () => {
      setLastValue(null);
    }
  }, [value]);
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
            id="textField"
            ref={divRef}
            contentEditable={true}
            className={`max-w-full w-screen ${messageClassName} px-8 focus:outline-none text-3xl text-center rounded-2xl bg-blue-500 placeholder:text-blue-400 placeholder:text-sm sm:placeholder:text-3xl text-white align-middle table-cell ${
              value.length === 0 ? "caret-transparent" : ""
            }`}
            onInput={(e) => {
              if (value.length > 0 && e.currentTarget.innerText.match(/\n/g)) {
                setValue("");
                if (onChange) {
                  onChange("");
                }
                setIsFocused(true);
                e.currentTarget.innerText = "";
              } else {
                if (e.currentTarget.innerText.length === 0) {
                  setIsFocused(true);
                } else {
                  setIsFocused(false);
                }
                setValue(e.currentTarget.innerText);
                if (onChange) {
                  onChange(e.currentTarget.innerText);
                }
              }
            }}
            onBlur={(e) => {
              setIsFocused(false);
            }}
          ></div>
          {value.length === 0 ? (
            <span
              id="textFieldPlaceholder"
              className="absolute w-96 text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-blue-400"
              onClick={() => {
                setIsFocused(true);
                divRef.current?.focus();
              }}
            >
              何か入力してください...
            </span>
          ) : null}
          <div
            className={`bg-blue-500 w-6 h-6 rounded-full absolute right-0 ${bubbleAClassName }`}
          />
          <div
            className={`bg-blue-500 w-2 h-2 rounded-full absolute right-0 ${bubbleBClassName}`}
          />
          {isFocused ? (
            <span
              className="absolute text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white text-3xl font-thin animate-pulse-cursor"
              onClick={() => {
                divRef.current?.focus();
              }}
            >
              |
            </span>
          ) : null}

          <button ref={buttonRef} className="hidden" type="submit" />
        </div>
      </div>
    </div>
  );
}
