import "./BTSVideo.css";

const BTSVideo = () => {
  return (
    <section className="VideoSection">
      <div className="VideoCard">
        <div className="Video">
          <video autoPlay loop muted playsInline className="VideoGif">
            <source src="/btsvideo.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="VideoText">
          <div className="VideoHeader">
            <h1>
              BTS Content Creation for <span>₦35,000</span> only!
            </h1>
          </div>
          <p>
            We'll capture clean behind-the-scenes shots of you doing your 
            thing, perfect for content and brand storytelling.
          </p>
          <h3>1 – 30 mins shoot, edited and ready to post.</h3>
          <a
            href="https://wa.me/2348071802928?text=Hi%20Orvyn%20Media%2C%20I'm%20interested%20in%20a%20graphics%20design%20project.%20Here%20are%20the%20details%3A%0A-%20Type%20of%20design%3A%20%0A-%20What%20it's%20for%3A%20%0A-%20Any%20deadline%3A%20%0A-%20My%20name%3A
"
          >
            <button className="Button">Book Instantly</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BTSVideo;
