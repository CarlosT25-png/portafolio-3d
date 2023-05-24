import { useState, useEffect, Dispatch, SetStateAction } from "react";

const TypingEffectText = ({ messageText, speedEffect, onComplete }: { messageText: string, speedEffect: number, onComplete?: Function } ) => {
    // Typing effect
    const [text, setText] = useState("");
    const [fullText, setFullText] = useState(messageText);
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      if (index < fullText.length) {
        setTimeout(() => {
          setText(text + fullText[index])
          setIndex(index + 1)
        }, speedEffect)
      }
    }, [index])

    useEffect(() => {
      if(onComplete){
        if(text === fullText) onComplete()
      }
    }, [text]) 
  return (
    <span>{text}</span>
  );
}

export default TypingEffectText;