import "./Terms.css";
import { termsData } from "../../../../data";
import ScrollReveal from "../../Animations/ScrollReveal";

const Terms = () => {
  return (
    <article className="TermsContainer">
      <div className="TermsWrap">
        <ScrollReveal delay={0}>
          <header className="TermsHeader">
            <h1>Terms & Conditions</h1>
          </header>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <section className="TermsCard">
            <h3>{termsData.intro}</h3>
            {termsData.sections.map(({ title, content }, index) => (
              <ScrollReveal key={index} delay={0.2 + index * 0.1}>
                <div className="TermsContent" key={index}>
                  <h3>{title}</h3>
                  <ul>
                    <li>{content}</li>
                  </ul>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.2 + termsData.sections.length * 0.1}>
              <div className="TermsButton">
                <span>Mail to:</span>
                <a
                  href="mailto:orvynmedia@example.com?subject=Terms%20and%20Conditions&body=I%20just%20read%20the%20terms%20and%20conditions%20and..."
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

export default Terms;
