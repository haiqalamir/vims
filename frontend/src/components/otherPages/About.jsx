
import { Link } from "react-router-dom";
export default function About() {
  return (
    <>
      <div className="upper-box">
        <div className="prima-container">
          <div className="row wow fadeInUp">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="prima-title">
                <ul className="breadcrumb">
                  <li>
                    <Link to={`/`}>Home</Link>
                  </li>
                  <li>
                    <span>Cars for Sale</span>
                  </li>
                </ul>
                <h2>About Us</h2>
                <div className="text">
                  We Value Our Clients And Want Them To Have A Nice Experience
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="content-box">
                <div className="text">
                  Lorem ipsum dolor sit amet consectetur. Convallis integer enim
                  eget sit urna. Eu duis lectus amet vestibulum varius. Nibh
                  tellus sit sit at lorem facilisis. Nunc vulputate ac interdum
                  aliquet vestibulum in tellus.
                </div>
                <div className="text">
                  Sit convallis rhoncus dolor purus amet orci urna. Lobortis
                  vulputate vestibulum consectetur donec ipsum egestas velit
                  laoreet justo. Eu dignissim egestas egestas ipsum. Sit est
                  nunc pellentesque at a aliquam ultrices consequat. Velit duis
                  velit nec amet eget eu morbi. Libero non diam sit viverra
                  dignissim. Aliquam tincidunt in cursus euismod enim.
                </div>
                <div className="text">
                  Magna odio sed ornare ultrices. Id lectus mi amet sit at sit
                  arcu mi nisl. Mauris egestas arcu mauris.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* gallery-sec */}
      <div className="galler-section">
        <div className="prima-container">
          <div className="row">
            <div className="exp-block col-md-2 col-sm-12">
              <div className="inner-box">
                <div className="exp-box">
                  <h2 className="title">45</h2>
                  <div className="text">Years in Business</div>
                </div>
                <div className="image-box">
                  <figure className="image">
                    <img
                      alt=""
                      width={210}
                      height={210}
                      src="/images/resource/about-inner1-1.jpg"
                    />
                  </figure>
                </div>
              </div>
            </div>
            <div className="image-block style-center col-md-5 col-sm-12">
              <div className="image-box">
                <figure className="image">
                  <img
                    alt=""
                    width={567}
                    height={540}
                    src="/images/resource/about-inner1-2.jpg"
                  />
                </figure>
              </div>
            </div>
            <div className="image-block col-md-5 col-sm-12">
              <div className="image-box two">
                <figure className="image">
                  <img
                    alt=""
                    width={567}
                    height={300}
                    src="/images/resource/about-inner1-3.jpg"
                  />
                </figure>
              </div>
              <div className="row box-double-img">
                <div className="image-block col-lg-5 col-5">
                  <div className="image-box">
                    <figure className="image">
                      <img
                        alt=""
                        width={210}
                        height={210}
                        src="/images/resource/about-inner1-4.jpg"
                      />
                    </figure>
                  </div>
                </div>
                <div className="image-block col-lg-7 col-7">
                  <div className="image-box">
                    <figure className="image">
                      <img
                        alt=""
                        width={329}
                        height={210}
                        src="/images/resource/about-inner1-5.jpg"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
