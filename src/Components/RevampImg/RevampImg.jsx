import { useEffect } from "react";
import { RevampProjects } from "../../../data";
import { motion as Motion, useAnimation } from "framer-motion";
import "./RevampImg.css";

const RevampImg = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    });
  }, [controls]);

  const repeatedImages = [...RevampProjects, ...RevampProjects];

  return (
    <section className="RevampSection">
      <div className="RevampImgText">
        <h1>pages we have revamped</h1>
      </div>

      <Motion.div
        className="RevampSliderWrapper"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="RevampSliderContainer">
          <Motion.div className="RevampSliderTrack" animate={controls}>
            {repeatedImages.map(({ id, img }, index) => (
              <Motion.div
                key={index}
                className="RevampSliderImage"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={img} alt={`Revamp ${id}`} />
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </Motion.div>
    </section>
  );
};

export default RevampImg;
