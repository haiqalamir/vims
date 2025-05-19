import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import RelatedCars from "./RelatedCars";
import ModalVideo from "react-modal-video";
import { Gallery, Item } from "react-photoswipe-gallery";
import CommentForm from "./sections/CommentForm";
import Description from "./sections/Description";
import Faqs from "./sections/Faqs";
import Features from "./sections/Features";
import Financing from "./sections/Financing";
import Location from "./sections/Location";
import Overview from "./sections/Overview";
import Ratings from "./sections/Ratings";
import Replay from "./sections/Replay";
import Review from "./sections/Review";

export default function Single1() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/vehicles/${id}/`)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle:", error);
      });
  }, [id]);

  if (!car) return <div>Loading...</div>;

  // Define default image if no image available.
  const defaultImage = "/images/resource/inventory1-5.png";

  // Process images:
  // If there are images from DRF, use up to the first 5.
  // If fewer than 5 are available, repeat the last available image.
  // If no images exist, fill all slots with the default image.
  let vehicleImages = [];
  if (car.images && car.images.length > 0) {
    vehicleImages = car.images.slice(0, 5);
    while (vehicleImages.length < 5) {
      // Repeat the last available image
      vehicleImages.push(vehicleImages[vehicleImages.length - 1]);
    }
  } else {
    vehicleImages = new Array(5).fill({ image: defaultImage, id: null });
  }

  // Helper to build a full URL if needed.
  const buildImageUrl = (imgPath) =>
    imgPath.startsWith("http") ? imgPath : `http://127.0.0.1:8000${imgPath}`;

  // Desktop: Main image slot (slot 1): 805×550.
  const mainImage = buildImageUrl(vehicleImages[0].image);
  // Desktop: Secondary image slots (slots 2–5): 285×269.
  const secondaryImages = vehicleImages.slice(1).map((imgObj) =>
    buildImageUrl(imgObj.image)
  );

  // Other vehicle display fields.
  const title = `${car.brand || "Unknown Brand"} ${car.model || "Unknown Model"}`;
  const descriptionText = `Manufactured in ${car.manufacture_year || "N/A"}`;
  const mileage =
    car.mileage !== undefined
      ? Number(car.mileage).toLocaleString() + " miles"
      : "N/A";
  const price =
    car.price !== undefined
      ? "RM " + parseFloat(car.price).toLocaleString()
      : "RM0";
  const altText = `${car.brand || "Car"} ${car.model || ""}`;
  const status = car.status || "N/A";

  return (
    <>
      <section className="inventory-section pb-0 layout-radius">
        <div className="prima-container">
          <div className="prima-title-three">
            <ul className="breadcrumb">
              <li>
                <Link to={`/`}>Home</Link>
              </li>
              <li>
                <span>Cars for Sale</span>
              </li>
            </ul>
            <h2>{title}</h2>
            <div className="text">{descriptionText}</div>

            <div className="content-box">
              <div className="btn-box"></div>
              <span>Price</span>
              <h3 className="title">{price}</h3>
            </div>
          </div>

          <Gallery>
            <div className="gallery-sec">
              <div className="row">
                {/* Main Image Slot (Desktop: 805x550) */}
                <div className="image-column item1 col-lg-7 col-md-12 col-sm-12">
                  <div className="inner-column">
                    <div className="image-box">
                      <figure
                        className="image"
                        style={{
                          width: "805px",
                          height: "550px",
                          overflow: "hidden"
                        }}
                      >
                        <Item original={mainImage} thumbnail={mainImage} width={805} height={550}>
                          {({ ref, open }) => (
                            <a onClick={open}>
                              <img
                                alt={altText}
                                src={mainImage}
                                width={805}
                                height={550}
                                ref={ref}
                                style={{
                                  objectFit: "cover",
                                  width: "805px",
                                  height: "550px"
                                }}
                              />
                            </a>
                          )}
                        </Item>
                      </figure>

                    </div>
                  </div>
                </div>
                {/* Secondary Image Slots (Desktop: 285x269) */}
                <div className="col-lg-5 col-md-12 col-sm-12">
                  <div className="row">
                    {secondaryImages.map((img, index) => (
                      <div
                        key={index}
                        className={`image-column-two item${index + 2} col-6`}
                        style={{ padding: "0" }}
                      >
                        <div className="inner-column">
                          <div className="image-box">
                            <figure
                              className="image"
                              style={{
                                width: "285px",
                                height: "269px",
                                overflow: "hidden"
                              }}
                            >
                              <Item original={img} thumbnail={img} width={285} height={269}>
                                {({ ref, open }) => (
                                  <a onClick={open}>
                                    <img
                                      ref={ref}
                                      alt={altText}
                                      src={img}
                                      width={285}
                                      height={269}
                                      style={{
                                        objectFit: "cover",
                                        width: "285px",
                                        height: "269px"
                                      }}
                                    />
                                  </a>
                                )}
                              </Item>
                            </figure>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Gallery>

          <div className="row">
            <div className="inspection-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="overview-sec">
                  <Overview />
                </div>
                <div className="overview-sec">
                  <Features />
                </div>
                <div className="overview-sec">
                  <Description />
                </div>
              </div>
            </div>
          </div>
          <RelatedCars />
        </div>
      </section>

      {/* Mobile Styles */}
      <style>{`
        @media (max-width: 768px) {
          /* Main image container on mobile: full width with fixed aspect ratio */
          .image-column.item1 .image {
            position: relative !important;
            width: 100% !important;
            padding-top: calc((550 / 805) * 100%) !important;
            overflow: hidden !important;
          }
          .image-column.item1 .image img {
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
          /* Secondary image containers on mobile: full width of column with fixed aspect ratio */
          .image-column-two .image {
            position: relative !important;
            width: 100% !important;
            padding-top: calc((269 / 285) * 100%) !important;
            overflow: hidden !important;
          }
          .image-column-two .image img {
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
          /* Adjust container padding for mobile */
          .prima-container {
            padding-left: 10px;
            padding-right: 10px;
          }
        }
      `}</style>
    </>
  );
}
