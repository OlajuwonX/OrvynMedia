import { useNavigate } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  const navigate = useNavigate();
  const goToServices = () => {
    navigate('/services');
  }

  return (
    <section className="HeroContainer">
        <div className="HeroText">
          <div className="HeroHeaders">
            <h2>Creative Strategy</h2>
            <h2>Premium Content</h2>
            <h2>Real Results</h2>
          </div>
          <div className="HeroSubheader">
          <p>
            At <span>Orvyn Media
              </span>, we capture your most important moments and help grow your online presence through event coverage, social media management, targeted ads, and custom websites.
          </p>
          </div>
          <div className="HeroButton">
            <button className='Button' onClick={goToServices}>
              Explore Services
            </button>
          </div>
        </div>
      </section>
  )
}

export default Hero