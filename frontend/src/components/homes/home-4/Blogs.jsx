import { Link } from "react-router-dom";

import { blogPosts2 } from "@/data/blogs";
export default function Blogs() {
  return (
    <section className="blog-section pt-0">
      <div className="prima-container">
        <div className="prima-title wow fadeInUp">
          <h2>Latest Blog Posts</h2>
        </div>
        <div className="row">
          {blogPosts2.map((post, index) => (
            <div className="blog-block col-lg-4 col-md-6 col-sm-12" key={index}>
              <div
                className="inner-box wow fadeInUp"
                data-wow-delay={post.delay}
              >
                <div className="image-box">
                  <figure className="image">
                    <Link to={`/blog-single/${post.id}`}>
                      <img
                        alt={post.alt}
                        src={post.imgSrc}
                        width={448}
                        height={300}
                      />
                    </Link>
                  </figure>
                  <span className="date">{post.date}</span>
                </div>
                <div className="content-box">
                  <ul className="post-info">
                    <li>{post.author}</li>
                    <li>{post.datePublished}</li>
                  </ul>
                  <h6 className="title">
                    <Link to={`/blog-single/${post.id}`} title="">
                      {post.title}
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
