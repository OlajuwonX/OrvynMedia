import { RevampData } from "../../../data";

import "./Revamp.css";

const Revamp = () => {
  return (
    <div className="Revamp">
      <div className="RevampHeader">
        <h1>
          Revamp Your Page for <span>₦15,000</span> only!
        </h1>
      </div>

      <div className="RevampContent">
        <div className="RevampImg">
          {RevampData.map(({ id, img, description }) => (
            <div key={id} className="RevampImgItem">
              <img src={img} alt={description} />
              <p>{description}</p>
            </div>
          ))}
        </div>

        <div className="RevampTextCard">
          {RevampData.map(({ id, text }) => (
            <p className="RevampText" key={id}>
              {text}
            </p>
          ))}
          <div className="RevampBtn">
            <a href="https://wa.me/2348071802928?text=Hi%20Orvyn%20Media%2C%20I'm%20interested%20in%20a%20graphics%20design%20project.%20Here%20are%20the%20details%3A%0A-%20Type%20of%20design%3A%20%0A-%20What%20it's%20for%3A%20%0A-%20Any%20deadline%3A%20%0A-%20My%20name%3A">
              <button className="Button">Book Instantly</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revamp;
