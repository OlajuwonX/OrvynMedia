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
            We'll capture clean behind-the-scenes shots of you doing your thing,
            perfect for content and brand storytelling.
          </p>
          <h3>1 – 30 mins shoot, edited and ready to post.</h3>
          <a href="https://wa.link/i0alen">
            <button className="Button">Book Instantly</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BTSVideo;
