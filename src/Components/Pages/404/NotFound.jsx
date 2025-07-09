import { motion as Motion } from "framer-motion";
import ScrollReveal from "../../Animations/ScrollReveal";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const bounceAnimation = {
    y: [0, -10, +10, 0],
    x: [-10, 0, +10, 0],
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "easeInOut",
    },
  };

  return (
    <section className="NotFoundContainer">
      <ScrollReveal delay={0.1}>
        <h1>404</h1>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <p>Oops... The page you're looking for doesn't exist 😞</p>
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <div className="NotFoundBtn">
          <Motion.button
            className="Button"
            onClick={() => navigate("/")}
            animate={bounceAnimation}
          >
            Home
          </Motion.button>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default NotFound;
