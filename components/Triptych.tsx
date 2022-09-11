import { useEffect, useState } from "react";
import { DisplayToken } from "./DisplayToken";

interface TriptychProps {
  startingPoint: number;
}

type Mode = "consecutive" | "fifties" | "random";

export function Triptych({ startingPoint = 0 }: TriptychProps) {
  const [mode, setMode] = useState<Mode>("fifties");
  const [input, setInput] = useState(startingPoint);
  const [center, setCenter] = useState(true);
  const [leftMultiplier, setLeftMultiplier] = useState(1);
  const [rightMultiplier, setRightMultiplier] = useState(1);
  // const showLeftSelector =
  //   (mode === "consecutive" && input > 0) || (mode === "fifties" && input > 50);
  //

  let one = input || 0;
  let two = input + 51;
  let three = input + 51 + 51;
  let fiftyoneLeft = 50 * leftMultiplier + 1;
  let fiftyoneRight = 50 * rightMultiplier + 1;

  switch (mode) {
    case "fifties":
      one = center ? input - fiftyoneLeft : input;
      two = center ? input : input + fiftyoneRight;
      three = center
        ? input + fiftyoneRight
        : input + fiftyoneRight + fiftyoneRight;
      break;
    case "consecutive":
      one = center ? input - 1 : input;
      two = center ? input : input + 1;
      three = center ? input + 1 : input + 1 + 1;
      break;
    case "random":
      one = input;
      two = Math.round(Math.random() * 500);
      three = Math.round(Math.random() * 500);
      if (center) {
        one = two;
        two = input;
      }
      break;
  }
  if (one < 0) {
    one = 999 + one + 1;
  }
  if (one > 999) {
    one = one - 99 - 1;
  }
  if (three < 0) {
    three = 999 + three + 1;
  }
  if (three > 999) {
    three = three - 999 - 1;
  }

  return (
    <div className="mt-6 flex flex-col space-y-6 max-w-[1920px]">
      <div className="flex flex-row flex-wrap space-x-3 justifty-center items-center">
        <label>
          Token ID:
          <input
            type="number"
            min="0"
            max="999"
            onChange={(e) => {
              setInput(parseInt(e.target.value, 10));
            }}
            value={input}
            className="ml-3 px-3 py-2 rounded-xl border border-zinc-500"
          />
        </label>
        <select
          onChange={(e) => setMode(e.target.value as Mode)}
          className="px-3 py-2 rounded-xl border border-zinc-500"
        >
          <option value="fifties">+50 editions</option>
          <option value="consecutive">Consecutive</option>
          <option value="random">Random</option>
        </select>
      </div>
      <div className="flex flex-row flex-wrap space-x-3 justifty-center items-center">
        {center && mode === "fifties" ? (
          <button
            className="bg-zinc-700 px-3 py-2 rounded-xl text-white"
            onClick={() =>
              setLeftMultiplier((prev) => (prev === 20 ? 1 : prev + 1))
            }
          >
            Increment Left #{leftMultiplier}
          </button>
        ) : null}
        {mode === "fifties" ? (
          <button
            className="bg-zinc-700 px-3 py-2 rounded-xl text-white"
            onClick={() =>
              setRightMultiplier((prev) => (prev === 20 ? 1 : prev + 1))
            }
          >
            Increment Right #{rightMultiplier}
          </button>
        ) : null}
        <label>
          See left side{" "}
          <input
            type="checkbox"
            checked={center}
            onChange={(e) => {
              setCenter((prev) => !prev);
            }}
          />
        </label>
      </div>
      <div className=" w-full overflow-x-scroll lg:overflow-auto">
        <div className="grid grid-cols-3 grid-rows-1 w-[1200px] lg:w-auto">
          <DisplayToken tokenId={one} />
          <DisplayToken tokenId={two} />
          <DisplayToken tokenId={three} />
        </div>
      </div>
    </div>
  );
}
