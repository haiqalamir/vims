import { Link } from "react-router-dom";

import { teamMembers4 } from "@/data/team";
import Pagination from "../common/Pagination";
export default function TeamList() {
  return (
    <section className="prima-team-section v1 layout-radius">
      <div className="prima-container">
        <div className="prima-title">
          <ul className="breadcrumb">
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <span>Cars for Sale</span>
            </li>
          </ul>
          <h2>Team List</h2>
        </div>
        <div className="row">
          {teamMembers4.map((member, index) => (
            <div className="team-block col-lg-3 col-md-6 col-sm-6" key={index}>
              <div
                className={`inner-box wow fadeInUp`}
                data-wow-delay={member.wowDelay}
              >
                <div className="image-box">
                  <figure className="image">
                    <Link to={`/team-single/${member.id}`}>
                      <img
                        alt=""
                        src={member.imgSrc}
                        width={329}
                        height={400}
                      />
                    </Link>
                  </figure>
                  <div className="contact-info">
                    <span>
                      <a to={`mailto:${member.email}`}>{member.email}</a>
                    </span>
                    <small>
                      <a to={`tel:${member.phone}`}>{member.phone}</a>
                    </small>
                  </div>
                </div>
                <div className="content-box">
                  <h4 className="title">
                    <Link to={`/team-single/${member.id}`}>{member.name}</Link>
                  </h4>
                  <span>{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-sec">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <Pagination />
            </ul>
            <div className="text">Showing results 1-30 of 1,415</div>
          </nav>
        </div>
      </div>
    </section>
  );
}
