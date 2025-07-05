import { useEffect } from "react";
import { Brandlogo } from "../../../data";
import { motion as Motion, useAnimation } from "framer-motion";
import "./Brands.css";

const Brands = () => {
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

  const repeatedBrands = [...Brandlogo, ...Brandlogo];

  return (
    <section className="BrandsSection">
      <div className="BrandsHeader">
        <h1>Brands we have worked with</h1>
      </div>

      <Motion.div
        className="BrandsSliderWrapper"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="BrandsSliderContainer">
          <Motion.div className="BrandsSliderTrack" animate={controls}>
            {repeatedBrands.map(({ id, img }, index) => (
              <Motion.div
                key={index}
                className="BrandsSliderImage"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={img} alt={`brand-${id}`} />
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </Motion.div>
    </section>
  );
};

export default Brands;
