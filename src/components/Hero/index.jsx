import React, { useState } from "react";
import profilePhoto from "../../assets/images/anubhab.jpeg";
import Tooltip from "@mui/material/Tooltip";
import { Fade } from "@mui/material";
import { motion } from "framer-motion";
import AnimatedLetters from "../AnimatedLetters";
import { Player } from "@lottiefiles/react-lottie-player";
import FloatingIcons from "../FloatingIcons";

const phrases = [
  "Hey, click me",
  "do it again",
  "yes go on",
  "don't know why I created this",
  "anyway...",
  "drop me an email if you'd like",
  "...",
  "still playing with this? 😂",
  "you can stop now.",
  "seriously.",
  "checkout the website now ffs!",
];

const letters = [
  "I'm",
  "developing",
  "Creative",
  "&",
  "Interactive",
  "webapps",
  "🚀",
];

const title = ["Hello!", "I'm", "Anubhab"];

const Hero = () => {
  const [index, setIndex] = useState(0);

  const handlePhrases = () => {
    if (index === phrases.length - 1) {
      return;
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <section className="w-full cursor-default bg-[#000000] xl:px-44 lg:px-40 sm:pt-48 sm:pb-0 pt-28 md:px-32 sm:px-28 vvs:px-12 px-10">
      <div className="hero-container flex flex-col">
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-between items-center"
        >
          <div className="w-fit">
            <Tooltip
              title={phrases[index]}
              placement="right-start"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
            >
              <div>
                <img
                  src={profilePhoto}
                  alt="Anubhab Roy Chowdhury"
                  onClick={handlePhrases}
                  id="profilePhoto"
                  className="rounded-full !z-10 lg:h-20 lg:w-20 md:h-16 md:w-16 vvs:h-14 vvs:w-14 w-12 h-12 hover:scale-[1.05] hover:shadow-custom1 hover:-rotate-12 transition-all duration-300 ease-in-out cursor-pointer"
                />
              </div>
            </Tooltip>
          </div>
        </motion.div>

        <div>
          <div className="mt-10 mb-8">
            <h1 className="text-white/70 font-Glimer-Outlined !z-10 2xl:text-[6.5rem] xl:text-[6.2rem] lg:text-[5rem] md:text-[3.5rem] sm:text-[3rem] vvs:text-[2.3rem] text-[2.2rem] tracking-normal xl:leading-[120px] md:leading-[80px] lg:leading-[100px] sm:leading-[80px] vvs:leading-[60px] leading-[40px]">
              <AnimatedLetters letters={title} />
            </h1>

            <h2 className=" text-white !z-10  font-Glimer-Bold font-extrabold  2xl:text-[5.5rem] xl:text-[5rem] lg:text-[3.5rem] md:text-[2.6rem] sm:text-[2.2rem] vvs:text-[1.5rem] text-[1.4rem] tracking-normal 2xl:leading-[120px] lg:leading-[100px] md:leading-[70px] sm:leading-[50px] leading-[33px]">
              <AnimatedLetters letters={letters} />
            </h2>
          </div>
          <FloatingIcons />
        </div>
      </div>
    </section>
  );
};

export default Hero;
