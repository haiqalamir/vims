import { carCategories } from "@/data/categories";

export default function Inspiration() {
  return (
    <section className="prima-inspiration-section pt-0">
      <div className="prima-container">
        <div className="prima-title wow fadeInUp">
          <h2>Need Some Inspiration?</h2>
        </div>
        <div className="right-box wow fadeInUp" data-wow-delay="100ms">
          <ul className="service-list">
            {carCategories.map((category, index) => (
              <li key={index}>
                <a href="#">{category}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
