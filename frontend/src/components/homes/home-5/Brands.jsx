import { brandBlocks } from "@/data/brands";

export default function Brands() {
  return (
    <section className="prima-brand-section-four">
      {/* <div className="prima-container">
        <div className="prima-title text-center">
          <h2>Browse by Type</h2>
        </div>
        <div className="right-box">
          {brandBlocks.map((block, index) => (
            <div key={index} className="brand-block-four">
              <div className="inner-box">
                <div className="icon-box">
                  <i className={block.iconClass} />
                </div>
                <h6 className="title">
                  <a href={block.link}>{block.title}</a>
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}
