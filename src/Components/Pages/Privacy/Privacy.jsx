import './Privacy.css'
import { privacyData } from '../../../../data'


const Privacy = () => {
  return (
    <div className="PrivacyContainer">
      <div className="PrivacyWrap">
        <div className="PrivacyHeader">
          <h1>Privacy Policy</h1>
        </div>
        <div className="PrivacyCard">
          <h3>{privacyData.intro}</h3>
          {privacyData.sections.map(({ title, content }, id) => (
            <div className="PrivacyContent" key={id}>
              <h3>{title}</h3>
              <ul>
                <li>{content}</li>
              </ul>
            </div>
          ))}
          <div className="PrivacyButton">
            <span>Mail to:</span>
            <a href="mailto:orvynmedia@example.com?subject=Privacy%20Policy&body=I%20just%20read%20the%20privacy%20policy%20and...">
              <button>helloorvynmedia@gmail.com</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy