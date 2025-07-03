import { Brandlogo } from "../../../data";
import "./Brands.css";

const Brands = () => {
  return (
    <div className="BrandsSection">
      <div className="BrandsHeader">
        <h1>Brands we have worked with</h1>
      </div>
      <div className="BrandsImgContainer">
      {Brandlogo.map(({ id, img }) => (
        <div className="BrandsImg" key={id}>
            <img src={img} alt={id} />
          </div>
      ))}
      </div>
    </div>
  );
};

export default Brands;
