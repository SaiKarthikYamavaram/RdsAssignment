export function deleteProduct(state: any, payload: any) {
  const deletedProduct = state.products.filter(
    item => item.id === payload.id,
  )?.[0];
  const newPrice =
    state.price - (deletedProduct.quantity ?? 0) * deletedProduct.price;
  const newProductList = state.products.filter(item => item.id !== payload.id);

  return {...state, products: newProductList, price: newPrice};
}

export function reduceProductQuantity(state: any, payload: any) {
  const productInStore = state.products.filter(
    item => item.id === payload.id,
  )?.[0];

  const newPrice = state.price - payload.price;
  payload.quantity = (productInStore?.quantity ?? 0) - 1;

  const productsWithouCurrentItem = state.products.filter(
    item => item.id !== payload.id,
  );

  return {
    ...state,
    products: [...productsWithouCurrentItem, payload],
    price: newPrice,
  };
}

export function addProduct(state: any, payload: any) {
  const productInStore = state.products.filter(
    item => item.id === payload.id,
  )?.[0];

  const newPrice = state.price + payload.price;
  payload.quantity = (productInStore?.quantity ?? 0) + 1;

  const productsWithouCurrentItem = state.products.filter(
    item => item.id !== payload.id,
  );

  return {
    ...state,
    products: [...productsWithouCurrentItem, payload],
    price: newPrice,
  };
}
