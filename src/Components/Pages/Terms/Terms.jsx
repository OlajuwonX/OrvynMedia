import "./Terms.css";
import { termsData } from "../../../../data";

const Terms = () => {
  return (
    <div className="TermsContainer">
      <div className="TermsWrap">
        <div className="TermsHeader">
          <h1>Terms & Conditions</h1>
        </div>
        <div className="TermsCard">
          <h3>{termsData.intro}</h3>
          {termsData.sections.map(({ title, content }, id) => (
            <div className="TermsContent" key={id}>
              <h3>{title}</h3>
              <ul>
                <li>{content}</li>
              </ul>
            </div>
          ))}
          <div className="TermsButton">
            <span>Mail to:</span>
            <a href="mailto:orvynmedia@example.com?subject=Terms%20and%20Conditions&body=I%20just%20read%20the%20terms%20and%20conditions%20and...">
              <button>helloorvynmedia@gmail.com</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
