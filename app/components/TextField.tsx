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
        <Form
          className="relative"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input type="hidden" name="id" value={id} />
          <input
            type="hidden"
            ref={inputRef}
            name="text-field"
            defaultValue={value}
            value={value}
          />
          <div
            ref={divRef}
            contentEditable={true}
            className={`max-w-full w-screen h-48 px-8 focus:outline-none text-3xl text-center rounded-2xl bg-blue-500 placeholder:text-blue-400 placeholder:text-sm sm:placeholder:text-3xl text-white align-middle table-cell ${
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
                console.log("else");
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
              className="absolute w-96 text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-blue-400"
              onClick={() => {
                setIsFocused(true);
                divRef.current?.focus();
              }}
            >
              メッセージを入力してください
            </span>
          ) : null}
          <div className="bg-blue-500 w-6 h-6 rounded-full absolute right-0 top-44" />
          <div className="bg-blue-500 w-2 h-2 rounded-full absolute right-0 top-52" />
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
        </Form>
      </div>
    </div>
  );
}
