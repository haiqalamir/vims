
export default function NewsLetter() {
  return (
    <section className="news-letter-section pb-0 pt-0">
      <div className="prima-container">
        <div className="row g-0 cus-radius-16">
          {/* image-column */}
          <div className="image-column col-lg-4 col-md-6 col-sm-12">
            <div className="inner-column">
              <div className="image-box">
                <figure className="image">
                  <img
                    alt=""
                    src="/images/resource/news1-1.png"
                    width={368}
                    height={295}
                  />
                </figure>
              </div>
            </div>
          </div>
          {/* content-column */}
          <div className="form-column col-lg-8 col-md-12 col-sm-12">
            <div className="inner-column">
              <div className="prima-title light">
                <h2>
                  Subscribe To Our Mailing <br />
                  List And Stay Up To Date
                </h2>
                <div className="text">
                  We'll keep you updated with the best new jobs.
                </div>
              </div>
              <div
                className="subscribe-form wow fadeInUp"
                data-wow-delay="100ms"
              >
                <form
                  onSubmit={(e) => e.preventDefault()}
                  method="post"
                  action="#"
                >
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="email"
                      defaultValue=""
                      placeholder="Your email"
                      required
                    />
                    <button
                      type="button"
                      className="theme-btn btn-style-one hover-light"
                    >
                      <span className="btn-title">subscribe</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
