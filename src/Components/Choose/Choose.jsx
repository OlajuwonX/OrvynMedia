import { ChooseData } from "../../../data";
import ScrollReveal from "../Animations/ScrollReveal";
import "./Choose.css";

const Choose = () => {
  return (
    <section className="ChooseContainer">
      <div className="ChooseHeader">
        <h1>Why Choose Us</h1>
      </div>
      <div className="ChooseCards">
        {ChooseData.map(({ id, header, text, img }) => (
          <ScrollReveal key={id} delay={0.5 * id * 0.1}>
            <div className="ChooseWrap">
              <div className="ChooseImg" key={id}>
                <img src={img} alt="" />
              </div>
              <div key={id} className="ChooseTextCard">
                <h3>{header}</h3>
                <p>{text}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Choose;
