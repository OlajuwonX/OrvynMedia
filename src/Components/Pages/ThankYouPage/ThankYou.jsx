import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";

import "./ThankYou.css";

const emojis = ["🎉", "🎊", "✨", "💫", "🥳", "🌟", "🥰", "🥰", "🥰", "💕"];

const ThankYou = () => {
  const [height] = useWindowSize();
  const [emojiDrops, setEmojiDrops] = useState([]);

  useEffect(() => {
    const drops = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100 + "%",
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 3,
    }));
    setEmojiDrops(drops);
  }, []);

  return (
    <div className="ThankYouPage">
      <div className="EmojiRain">
        {emojiDrops.map((drop, index) => (
          <Motion.div
            key={index}
            className="EmojiDrop"
            style={{ left: drop.left }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: height + 50, opacity: [1, 1, 0] }}
            transition={{
              delay: drop.delay,
              duration: drop.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {drop.emoji}
          </Motion.div>
        ))}
      </div>

      <h1>Thank You!</h1>

      <div className="MessageLoop">
        {[
          "Your message has been received.",
          "We'll get back to you shortly.",
        ].map((text, index) => (
          <Motion.p
            key={index}
            className="RevealText"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 4,
              ease: "easeInOut",
            }}
          >
            {text}
          </Motion.p>
        ))}
      </div>

      <a href="/" className="Button">
        Go Back Home
      </a>
    </div>
  );
};

export default ThankYou;
