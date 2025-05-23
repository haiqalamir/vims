
// Import axios using ES6 module syntax
import axios from 'axios';

export const carData = [
  {
    id: 1,
    images: [
      "/images/resource/shop3-1.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-3.jpg",
    ],
    badge: "Low Mileage",
    title: "Audi A4", // Random title
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      {
        icon: "flaticon-gasoline-pump",
        text: "72,925 miles",
      },
      {
        icon: "flaticon-speedometer",
        text: "Petrol",
      },
      {
        icon: "flaticon-gearbox",
        text: "Automatic",
      },
    ],
    price: "$768", // Random price
    oldPrice: "RM90,000",
    lat: 45.7279707552121,
    long: -74.07152705896405,
    brand: ["Mercedes", "BMW"],
    filterCategories: ["New cars", "Used Cars", "In Stock"],
    filterBrands: ["SUV", "Hatchback", "Coupe", "Convertible"],
  },
  {
    id: 2,
    images: [
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-3.jpg",
      "/images/resource/shop3-1.jpg",
    ],
    title: "Tesla Model 3", // Random title
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      {
        icon: "flaticon-gasoline-pump",
        text: "72,925 miles",
      },
      {
        icon: "flaticon-speedometer",
        text: "Petrol",
      },
      {
        icon: "flaticon-gearbox",
        text: "Automatic",
      },
    ],
    price: "$933", // Random price
    oldPrice: "RM90,000",
    lat: 38.1738017565271,
    long: -118.34227408812067,
    brand: ["Mercedes", "BMW"],
    filterCategories: ["New cars", "In Stock"],
    filterBrands: ["SUV", "Hatchback", "Convertible"],
  },
  {
    id: 3,
    images: [
      "/images/resource/shop3-3.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-1.jpg",
    ],
    badge: "Great Price",
    title: "BMW 3 Series", // Random title
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      {
        icon: "flaticon-gasoline-pump",
        text: "72,925 miles",
      },
      {
        icon: "flaticon-speedometer",
        text: "Petrol",
      },
      {
        icon: "flaticon-gearbox",
        text: "Automatic",
      },
    ],
    price: "$602", // Random price
    oldPrice: "RM90,000",
    lat: 29.38690953884771,
    long: -94.91651439187791,
    brand: ["Audi", "Mercedes"],
    filterCategories: ["New cars", "Used Cars"],
    filterBrands: ["SUV", "Coupe", "Convertible"],
  },
  {
    id: 4,
    images: [
      "/images/resource/shop3-4.jpg",
      "/images/resource/shop3-5.jpg",
      "/images/resource/shop3-2.jpg",
    ],
    title: "Jaguar XE", // Random title
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      {
        icon: "flaticon-gasoline-pump",
        text: "72,925 miles",
      },
      {
        icon: "flaticon-speedometer",
        text: "Petrol",
      },
      {
        icon: "flaticon-gearbox",
        text: "Automatic",
      },
    ],
    price: "$912", // Random price
    oldPrice: "RM90,000",
    lat: 39.62158564223682,
    long: -80.15625432727268,
    brand: ["Audi", "BMW"],
    filterCategories: ["New cars", "In Stock"],
    filterBrands: ["SUV", "Sedan", "Hatchback"],
  },
  {
    id: 5,
    images: [
      "/images/resource/shop3-1.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-3.jpg",
    ],
    badge: "Low Mileage",
    title: "Lexus IS", // Random title
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      {
        icon: "flaticon-gasoline-pump",
        text: "72,925 miles",
      },
      {
        icon: "flaticon-speedometer",
        text: "Petrol",
      },
      {
        icon: "flaticon-gearbox",
        text: "Automatic",
      },
    ],
    price: "$577", // Random price
    oldPrice: "RM90,000",
    lat: 43.71210927454257,
    long: -117.1392712537564,
    brand: ["Audi", "BMW", "Mercedes"],
    filterCategories: ["New cars", "Used Cars", "In Stock"],
    filterBrands: ["SUV", "Sedan", "Convertible"],
  },
  {
    id: 3,
    images: [
      "/images/resource/shop3-3.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-1.jpg",
    ],
    badge: "Great Price",
    title: "BMW 3 Series", // Random title
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      {
        icon: "flaticon-gasoline-pump",
        text: "72,925 miles",
      },
      {
        icon: "flaticon-speedometer",
        text: "Petrol",
      },
      {
        icon: "flaticon-gearbox",
        text: "Automatic",
      },
    ],
    price: "$602", // Random price
    oldPrice: "RM90,000",
    lat: 29.38690953884771,
    long: -94.91651439187791,
    brand: ["Audi", "Mercedes"],
    filterCategories: ["New cars", "In Stock"],
    filterBrands: ["SUV", "Sedan", "Hatchback"],
  },
  {
    id: 2,
    images: [
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-3.jpg",
      "/images/resource/shop3-1.jpg",
    ],
    title: "Tesla Model 3", // Random title
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      {
        icon: "flaticon-gasoline-pump",
        text: "72,925 miles",
      },
      {
        icon: "flaticon-speedometer",
        text: "Petrol",
      },
      {
        icon: "flaticon-gearbox",
        text: "Automatic",
      },
    ],
    price: "$933", // Random price
    oldPrice: "RM90,000",
    lat: 38.1738017565271,
    long: -118.34227408812067,
    brand: ["Mercedes", "BMW"],
    filterCategories: ["New cars", "Used Cars", "In Stock"],
    filterBrands: ["SUV", "Sedan", "Convertible"],
  },
  {
    id: 3,
    images: [
      "/images/resource/shop3-3.jpg",
      "/images/resource/shop3-2.jpg",
      "/images/resource/shop3-1.jpg",
    ],
    badge: "Great Price",
    title: "BMW 3 Series", // Random title
    description: "2023 C300e AMG Line Night Ed Premiu...",
    specs: [
      {
        icon: "flaticon-gasoline-pump",
        text: "72,925 miles",
      },
      {
        icon: "flaticon-speedometer",
        text: "Petrol",
      },
      {
        icon: "flaticon-gearbox",
        text: "Automatic",
      },
    ],
    price: "$602", // Random price
    oldPrice: "RM90,000",
    lat: 29.38690953884771,
    long: -94.91651439187791,
    brand: ["Audi", "Mercedes"],
    filterCategories: ["New cars", "Used Cars"],
    filterBrands: ["SUV", "Sedan"],
  },
];
export const cars = [
  {
    id: 9,
    imgSrc: "/images/resource/shop3-1.jpg",
    alt: "Range Rover, Defender 110",
    title: "Range Rover, Defender 110",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "Low Mileage",
    imgBoxClass: "image-box",
    btnDetails: "View Details",
  },
  {
    id: 10,
    imgSrc: "/images/resource/shop3-2.jpg",
    alt: "Mercedes-Benz, C Class",
    title: "Mercedes-Benz, C Class",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "",
    imgBoxClass: "image-box",
    btnDetails: "View Details",
  },
  {
    id: 11,
    imgSrc: "/images/resource/shop3-3.jpg",
    alt: "New Range Rover, Evoque",
    title: "New Range Rover, Evoque",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "Great Price",
    imgBoxClass: "image-box two",
    btnDetails: "View Details",
  },
  {
    id: 12,
    imgSrc: "/images/resource/shop3-4.jpg",
    alt: "Audi, Q5",
    title: "Audi, Q5",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "",
    imgBoxClass: "image-box",
    btnDetails: "View Details",
  },
  {
    id: 13,
    imgSrc: "/images/resource/shop12-1.jpg",
    alt: "Volkswagen, Tiguan",
    title: "Volkswagen, Tiguan",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "",
    imgBoxClass: "image-box",
    btnDetails: "View Details",
  },
  {
    id: 14,
    imgSrc: "/images/resource/shop12-8.jpg",
    alt: "Honda, Accord",
    title: "Honda, Accord",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "",
    imgBoxClass: "image-box two",
    btnDetails: "View Details",
  },
  {
    id: 15,
    imgSrc: "/images/resource/shop12-3.jpg",
    alt: "Volkswagen, CC",
    title: "Volkswagen, CC",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "",
    imgBoxClass: "image-box",
    btnDetails: "View Details",
  },
  {
    id: 16,
    imgSrc: "/images/resource/shop12-4.jpg",
    alt: "BMW, X5",
    title: "BMW, X5",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "",
    imgBoxClass: "image-box",
    btnDetails: "View Details",
  },
  {
    id: 17,
    imgSrc: "/images/resource/shop12-5.jpg",
    alt: "Porsche, Macan",
    title: "Porsche, Macan",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "",
    imgBoxClass: "image-box two",
    btnDetails: "View Details",
  },
  {
    id: 18,
    imgSrc: "/images/resource/shop12-6.jpg",
    alt: "Ford, Mustang",
    title: "Ford, Mustang",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "",
    imgBoxClass: "image-box",
    btnDetails: "View Details",
  },
  {
    id: 19,
    imgSrc: "/images/resource/shop12-7.jpg",
    alt: "Chevrolet, Camaro",
    title: "Chevrolet, Camaro",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "",
    imgBoxClass: "image-box two",
    btnDetails: "View Details",
  },
  {
    id: 20,
    imgSrc: "/images/resource/shop12-9.jpg",
    alt: "Toyota, Land Cruiser",
    title: "Toyota, Land Cruiser",
    description: "2023 C300e AMG Line Night Ed Premiu...",
    mileage: "72,925 miles",
    fuel: "Petrol",
    transmission: "Automatic",
    price: "RM40,000",
    discountPrice: "RM90,000",
    icon: "",
    imgBoxClass: "image-box",
    btnDetails: "View Details",
  },
];
export const carBlocks = [
  {
    id: 21,
    imgSrc: "/images/resource/shop14-4.jpg",
    title: "Mercedes-Benz, C Class",
    description: "2023 C300e AMG Line Night Ed Premium Plu...",
    detailsLink: "#",
    oldPrice: "RM40,000",
    newPrice: "RM90,000",
    specs: [
      {
        iconClass: "flaticon-gasoline-pump",
        text: "72,925 miles",
      },
      {
        iconClass: "flaticon-speedometer",
        text: "Petrol",
      },
      {
        iconClass: "flaticon-gearbox",
        text: "Automatic",
      },
    ],
  },
  {
    id: 22,
    imgSrc: "/images/resource/shop14-5.jpg",
    title: "New Range Rover, Evoque",
    description: "2023 C300e AMG Line Night Ed Premium Plu...",
    detailsLink: "#",
    oldPrice: "RM40,000",
    newPrice: "RM90,000",
    specs: [
      {
        iconClass: "flaticon-gasoline-pump",
        text: "72,925 miles",
      },
      {
        iconClass: "flaticon-speedometer",
        text: "Petrol",
      },
      {
        iconClass: "flaticon-gearbox",
        text: "Automatic",
      },
    ],
  },
  {
    id: 23,
    imgSrc: "/images/resource/shop14-6.jpg",
    title: "Honda, Accord",
    description: "2023 C300e AMG Line Night Ed Premium Plu...",
    detailsLink: "#",
    oldPrice: "RM40,000",
    newPrice: "RM90,000",
    specs: [
      {
        iconClass: "flaticon-gasoline-pump",
        text: "72,925 miles",
      },
      {
        iconClass: "flaticon-speedometer",
        text: "Petrol",
      },
      {
        iconClass: "flaticon-gearbox",
        text: "Automatic",
      },
    ],
  },
];
export const carItemsSearch = [
  {
    id: 24,
    title: "Audi, Q5 - 2023 Sport Edition",
    newPrice: 399,
    imgSrc: "/images/resource/car-search.jpg",
  },
  {
    id: 25,
    title: "Mercedes-Benz, GLC - 2023 Luxury Model",
    newPrice: 399,
    imgSrc: "/images/resource/car-search.jpg",
  },
  {
    id: 26,
    title: "BMW, X5 - 2023 M Sport Package",
    newPrice: 399,
    imgSrc: "/images/resource/car-search.jpg",
  },
  {
    id: 27,
    title: "Tesla, Model X - 2023 Performance Edition",
    newPrice: 399,
    imgSrc: "/images/resource/car-search.jpg",
  },
];

export const allCars = [...carData, ...cars, ...carBlocks, ...carItemsSearch];

// ------------------------------------------------------------------
// Function to demonstrate axios integration to fetch vehicle data
// (Assuming you have an API endpoint that returns vehicles data)
// ------------------------------------------------------------------
export function fetchVehicles() {
  // Replace the URL below with your actual API endpoint
  axios.get('http://localhost:3000/api/vehicles')
    .then(response => {
      // Log the fetched vehicle data to the console
      console.log('Fetched vehicles from API:', response.data);
      
      // You can process the data further or call another function to render it on your webpage.
    })
    .catch(error => {
      console.error('Error fetching vehicles:', error);
    });
}

// Optionally, call fetchVehicles when this module loads
// Comment out this line if you want to call it manually from elsewhere
fetchVehicles();
