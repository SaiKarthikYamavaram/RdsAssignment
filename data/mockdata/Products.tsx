export type productType = {
  title: string;
  picture: string;
  price: number;
  id: string;
  quantity?: number;
};

const Products: Array<productType> = [
  {
    title: 'Product 1',
    picture:
      'http://www.productphotographerindia.com/wp-content/uploads/2014/08/formal-shoes-for-ecommerce.jpg',
    price: 1000,
    id: '0',
  },
  {
    title: 'Product 2',
    picture:
      'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5ef0ab60b22d8333b3cf57e7_Order%20%23538714%20%7C%20cra%40greatsbrand.com%202.jpg',
    price: 2000,
    id: '1',
  },
  {
    title: 'Product 3',
    picture:
      'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5de6b0b057b9c5d12d40e067_7lB6bbdg6NOa.jpeg',
    price: 3000,
    id: '2',
  },
  {
    title: 'Product 4',
    picture:
      'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5de6b0a56ccb4f41d68eefe7_pj91xMVyrQYR.jpeg',
    price: 2400,
    id: '3',
  },
  {
    title: 'Product 5',
    picture:
      'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5de6afa1ecaa9a2ab67fdd84_Vgb1MRLprGK0.png',
    price: 3500,
    id: '4',
  },
  {
    title: 'Product 6',
    picture:
      'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5de6ab6cad4032aefc9831c0_2R3r2xZOnQqZ.jpeg',
    price: 1500,
    id: '5',
  },
  {
    title: 'Product 7',
    picture:
      'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5d8368cda6d1ebf532de8add_f0afb1449d06300be49095bff9563eb8.png',
    price: 1200,
    id: '6',
  },
  {
    title: 'Product 8',
    picture:
      'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5dc1c3d74a8703f913b8a774_2-6-1.jpg',
    price: 1400,
    id: '7',
  },
];
export default Products;
