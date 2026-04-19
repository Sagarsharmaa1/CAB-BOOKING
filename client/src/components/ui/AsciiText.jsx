import { useEffect, useMemo, useState } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

function AsciiText({ text, className = "" }) {
  const [displayText, setDisplayText] = useState(text);
  const textLength = text.length;

  const characterPool = useMemo(() => SCRAMBLE_CHARS.split(""), []);

  useEffect(() => {
    let frame = 0;
    let intervalId = null;

    const runScramble = () => {
      intervalId = setInterval(() => {
        frame += 1;
        setDisplayText(() =>
          text
            .split("")
            .map((char, idx) => {
              if (char === " ") {
                return " ";
              }

              if (idx < frame / 2) {
                return text[idx];
              }

              const randomIndex = Math.floor(Math.random() * characterPool.length);
              return characterPool[randomIndex];
            })
            .join("")
        );

        if (frame >= textLength * 2) {
          clearInterval(intervalId);
          setDisplayText(text);
        }
      }, 40);
    };

    runScramble();
    const loopTimeout = setInterval(runScramble, 4200);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      clearInterval(loopTimeout);
    };
  }, [characterPool, text, textLength]);

  return <p className={className}>{displayText}</p>;
}

export default AsciiText;
