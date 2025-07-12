import { RevampData } from "../../../data";

import "./Revamp.css";

const Revamp = () => {
  return (
    <section className="Revamp">
      <div className="RevampHeader">
        <h1>
          Revamp Your Page for <span>₦15,000</span> only!
        </h1>
      </div>

      <div className="RevampContent">
        <div className="RevampImg">
          {RevampData.image.map(({ id, img, description }) => (
            <div key={id} className="RevampImgItem">
              <img loading="lazy" src={img} alt={description} />
              <p>{description}</p>
            </div>
          ))}
        </div>

        <div className="RevampTextCard">
          <p className="RevampText">{RevampData.text}</p>
          <div className="RevampBtn">
            <a href="https://wa.link/i0alen">
              <button className="Button">Book Instantly</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Revamp;
