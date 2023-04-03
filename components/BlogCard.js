import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineArrowRight } from "react-icons/ai";
import useSound from "use-sound";

function BlogCard({ title, description, personName, url, personImage }) {
  const [isHoveringOverBlogSpace, setIsHoveringOverBlogSpace] = useState(false);
  const [isHoveringOverAuthorSpace, setIsHoveringOverAuthorSpace] =
    useState(false);

  const [play, { stop }] = useSound("/fx/pop.mp3", { volume: 0.5 });
  const highlightedTextVariants = {
    isHovering: {
      color: "#617bff",
      transition: {
        duration: 0.3,
      },
    },
    isNotHovering: {
      color: "#FFFFFF",
      transition: {
        duration: 0.3,
      },
    },
  };

  const arrowIconVariants = {
    isHovering: {
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    hoveringOverArrowIcon: {
      opacity: 1,
      transition: {
        type: "tween",
        ease: "linear",
        duration: 0.3,
      },
    },
    isNotHovering: {
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  return (
    <div className="mb-5 py-6 px-2 font-lato w-full">
      {/* Author who published article */}
      <a
        href={`http://localhost:3000/${personName}`}
        className="flex flex-row gap-3 w-fit"
        onMouseEnter={() => setIsHoveringOverAuthorSpace(true)}
        onMouseLeave={() => setIsHoveringOverAuthorSpace(false)}
      >
        <img src={personImage} className="w-7 aspect-square rounded-full" />
        <motion.div
          animate={isHoveringOverAuthorSpace ? "isHovering" : "isNotHovering"}
          variants={highlightedTextVariants}
        >
          {personName}
        </motion.div>
      </a>

      <a
        className="flex flex-col h-full"
        onMouseEnter={() => setIsHoveringOverBlogSpace(true)}
        onMouseLeave={() => setIsHoveringOverBlogSpace(false)}
        href={url}
      >
        <motion.h1
          initial={false}
          animate={isHoveringOverBlogSpace ? "isHovering" : "isNotHovering"}
          variants={highlightedTextVariants}
          className="text-2xl font-bold my-3 font-lato text-white"
        >
          {title}
        </motion.h1>

        <div className="flex flex-row justify-between">
          <h2 className="text-base text-white mt-2 mb-6">{description}</h2>
          <motion.div
            className={`flex items-center justify-center mr-10 ${isHoveringOverBlogSpace ? "animate-pulse" : "animate-none"
              }`}
            initial={false}
            animate={isHoveringOverBlogSpace ? "isHovering" : "isNotHovering"}
            variants={arrowIconVariants}
            onMouseEnter={() => {
              play();
            }}
            onMouseLeave={() => {
              stop();
            }}
            whileHover="hoveringOverArrowIcon"
          >
            <AiOutlineArrowRight className="mt-1" size="2em" />
          </motion.div>
        </div>

        <div
          className="font-lato font-bold text-white grow h-full"
        >
          Read More
        </div>
      </a>
    </div>
  );
}

export default BlogCard;
