import "./Privacy.css";
import { privacyData } from "../../../../data";
import ScrollReveal from "../../Animations/ScrollReveal";
import { FaCheck } from "react-icons/fa6";

const Privacy = () => {
  return (
    <article className="PrivacyContainer">
      <div className="PrivacyWrap">
        <ScrollReveal delay={0}>
          <header className="PrivacyHeader">
            <h1>Privacy Policy</h1>
          </header>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <section className="PrivacyCard">
            <h3>{privacyData.intro}</h3>
            {privacyData.sections.map(({ title, content, sub }, index) => (
              <ScrollReveal key={index} delay={0.2 + index * 0.1}>
                <div className="PrivacyContent" key={index}>
                  <h3 className="PrivacyContentTitle">{title}</h3>
                  <p>{sub}</p>
                  {content.map((item, i) => (
                    <ul key={i}>
                      <li>
                        <span className="Content">
                          <FaCheck />
                        </span>{" "}
                        {item}
                      </li>
                    </ul>
                  ))}
                </div>
              </ScrollReveal>
            ))}

            <p>Need help or have questions?</p>
            <ScrollReveal delay={0.2 + privacyData.sections.length * 0.1}>
              <div className="PrivacyButton">
                <span>Mail to:</span>
                <a
                  href="mailto:orvynmedia@example.com?subject=Privacy%20Policy&body=I%20just%20read%20the%20privacy%20policy%20and..."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>helloorvynmedia@gmail.com</button>
                </a>
              </div>
            </ScrollReveal>
          </section>
        </ScrollReveal>
      </div>
    </article>
  );
};

export default Privacy;
