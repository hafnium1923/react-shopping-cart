import { useRecoilState } from "recoil";
import { fetchedProductListAtom } from "../store/productState";
import { useEffect } from "react";
import { fetchGetQuery } from "../api";
import { Cart, Product } from "../types/product";
import { cartIdAtom, fetchedShoppingListAtom } from "../store/cartState";
import useError from "./useError";
import { ERROR_MESSAGE, FETCH } from "../abstract/constants";

const useFetchData = (handleIsLoading: VoidFunction) => {
  const [, setFetchedProductList] = useRecoilState(fetchedProductListAtom);
  const [, setFetchedShoppingList] = useRecoilState(fetchedShoppingListAtom);
  const [, setCartId] = useRecoilState(cartIdAtom);
  const { changeErrorTrue, changeErrorFalse } = useError();

  useEffect(() => {
    changeErrorFalse();
    const fetchData = async () => {
      try {
        const shoppingData = await fetchGetQuery<Cart[]>("/cart-items");
        setFetchedShoppingList(shoppingData);
        setCartId(() =>
          shoppingData.map((data) => {
            return data.id;
          })
        );
        const productData = await fetchGetQuery<Product[]>("/products");
        setFetchedProductList(productData);
        setTimeout(() => handleIsLoading(), 2000);
      } catch (error) {
        changeErrorTrue(FETCH.GET, ERROR_MESSAGE.PRODUCT);
      }
    };
    fetchData();
  }, []); // eslint-disable-line
};

const useFetchShoppingList = (handleIsLoading: VoidFunction) => {
  const [, setFetchedShoppingList] = useRecoilState(fetchedShoppingListAtom);
  const { changeErrorTrue, changeErrorFalse } = useError();

  useEffect(() => {
    changeErrorFalse();
    const fetchData = async () => {
      try {
        const data = await fetchGetQuery<Cart[]>("/cart-items");
        setFetchedShoppingList(data);
        setTimeout(() => handleIsLoading(), 2000);
      } catch (error) {
        changeErrorTrue(FETCH.GET, ERROR_MESSAGE.SHOPPING_LIST);
      }
    };
    fetchData();
  }, []); // eslint-disable-line
};

export { useFetchShoppingList, useFetchData };
