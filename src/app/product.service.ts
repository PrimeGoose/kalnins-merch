import { Injectable } from '@angular/core';
export type Product = {
  category: string;
  name: string;
  color_hex: string;
  color_name: string;
  price: number;
  currency: string;
  sizes: string[];
  id: number;

  gender: string;
  brand: string;
  imgages: string[];
  available?: boolean;
  preorder?: boolean;
  description?: string;
  rating?: number;
  reviews?: number;
  material?: string;
};
@Injectable({
  providedIn: "root",
})
export class ProductService {
  products: Product[] = [
    {
      category: "t-shirt",
      id: 1,
      name: "Vai TU disraiku jau iepisi?!",
      color_name: "blue", // blue in hex is #0000ff
      color_hex: "#0000ff",
      price: 8.99,
      currency: "EUR",
      sizes: ["S", "M", "L", "XL", "XXL", "2XL", "3XL", "4XL"],
      gender: "unisex",
      brand: "",
      imgages: ["assets/disraik/disraik-blue-L.jpg", "assets/disraik/disraik-blue.jpg"],
    },
    {
      category: "t-shirt",
      id: 2,
      name: "Vai TU disraiku jau iepisi?!",
      color_name: "white", // white in hex is #ffffff
      color_hex: "#ffffff",
      price: 6.99,
      currency: "EUR",
      sizes: ["S", "M", "L", "XL", "XXL"],
      gender: "unisex",
      brand: "",
      imgages: ["assets/disraik/disraik-white.jpg"],
    },

    {
      category: "tool bag",
      id: 3,
      name: "rēkmīte",
      color_name: "blue", // black hex is #000000
      color_hex: "#000000",
      price: 7.99,
      currency: "EUR",
      sizes: ["M"],
      gender: "unisex",
      brand: "",
      imgages: ["assets/bag/eco-tote-bag-black-front.jpg", "assets/bag/eco-tote-bag-black-front-652ede2e092dc.jpg"],
    },
    {
      category: "tank top",
      id: 4,
      name: "Pūtiens",
      color_name: "blue", // camo hex is #008080
      color_hex: "#008080",
      price: 9.99,
      currency: "EUR",
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "2XL"],
      gender: "unisex",
      brand: "",
      imgages: ["assets/tank-top/tank-top-vemj.jpg", "assets/tank-top/tank-top-vemj-2.jpg"],
    },

    {
      category: "t-shirt",
      id: 5,
      name: "Lasa Faktus par sevīm",
      color_name: "blue", // blue in hex is #0000ff
      color_hex: "#0000ff",
      price: 6.99,
      currency: "EUR",
      sizes: ["S", "M", "L", "XL", "XXL", "2XL", "3XL", "4XL"],
      gender: "unisex",
      brand: "",
      imgages: [
        "assets/fact/unisex-staple-t-shirt-aqua-front-652edee79cc90.jpg",
        "assets/fact/unisex-staple-t-shirt-aqua-front-652edee79d676.jpg",
        "assets/fact/unisex-staple-t-shirt-aqua-front-652edee79d7a7.jpg",
        "assets/fact/unisex-staple-t-shirt-aqua-right-front-652edee79da2e.jpg",
      ],
    },
  ];

  constructor() {}

  /**
   * Get all products.
   * @returns {Array} All products
   */
  getAllProducts() {
    return this.products;
  }

  /**
   * Get product by its ID.
   * @param {number} id - The product ID
   * @returns {Object|null} The product or null if not found
   */
  getProductById(id: number) {
    const product = this.products.find((p) => p.id === id);
    return product ? product : null;
  }

  /**
   * Get products by category.
   * @param {string} category - The product category
   * @returns {Array} Products in the given category
   */
  getProductsByCategory(category:string) {
    return this.products.filter((p) => p.category === category);
  }
}
