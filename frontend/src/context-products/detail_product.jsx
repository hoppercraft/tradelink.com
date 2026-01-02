// import { useEffect, useState } from "react";
// import { DetailContext } from "./getDetail";
// import { ACCESS_TOKEN } from "../constants";

// export const DetailProvider = ({ children }) => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         fetch("/api/products", {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then(res => res.json())
//             .then(data => setProducts(data));
//     }, []);


//     return (
//         <DetailContext.Provider products={{products}}>
//             {children}
//         </DetailContext.Provider>
//     );

// }

// proxy data to show it is working
import { DetailContext } from "./getDetail";
import { useState } from "react";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Laptop",
    description: "Good condition",
    price: 1200,
    image: "https://via.placeholder.com/300",
    seller: {
      username: "john",
      avatar: "https://via.placeholder.com/40"
    }
  },
  {
    id: 2,
    title: "Phone",
    description: "Almost new",
    price: 800,
    image: "https://via.placeholder.com/300",
    seller: {
      username: "alice",
      avatar: "https://via.placeholder.com/40"
    }
  }
];

export const DetailProvider = ({ children }) => {
  const [products] = useState(MOCK_PRODUCTS);

  return (
    <DetailContext.Provider value={{ products }}>
      {children}
    </DetailContext.Provider>
  );
};
