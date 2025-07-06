import { ChooseData } from "../../../data";
import "./Choose.css";

const Choose = () => {
  return (
    <div className="ChooseContainer">
      <div className="ChooseHeader">
        <h1>Why Choose Us</h1>
      </div>
      <div className="ChooseCards">
        {ChooseData.map(({ id, header, text, img }) => (
          <div className="ChooseWrap">
            <div className="ChooseImg" key={id}>
              <img src={img} alt="" />
            </div>
            <div key={id} className="ChooseTextCard">
              <h3>{header}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choose;
