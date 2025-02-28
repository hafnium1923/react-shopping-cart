import { rest } from "msw";
import { products } from "./data";

export const handlers = [
  //상품 목록 조회
  rest.get("/products", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  //장바구니 아이템 목록 조회
  rest.get("/cart-items", async (_, res, ctx) => {
    const cartId = JSON.parse(localStorage.getItem(`cartId`) || "[]");

    const cartItems = cartId.map((id: number) => {
      return JSON.parse(localStorage.getItem(`cart_${id}`) || "");
    });
    return res(ctx.status(200), ctx.json(cartItems));
  }),

  //장바구니 아이템 추가
  rest.post("/cart-items", async (req, res, ctx) => {
    const { productId } = await req.json();

    const newCart = {
      id: productId,
      quantity: 1,
      product: products.find((product) => product.id === productId),
    };

    const cartId = JSON.parse(localStorage.getItem(`cartId`) || "[]");
    cartId.push(productId);
    localStorage.setItem(`cart_${productId}`, JSON.stringify(newCart));
    localStorage.setItem(`cartId`, JSON.stringify(cartId));

    return res(
      ctx.status(201),
      ctx.json(newCart),
      ctx.set("Location", `/cart-items/${newCart.id}`)
    );
  }),

  //장바구니 아이템 수량 변경
  rest.patch("/cart-items/:cartItemId", async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    const cartItem = JSON.parse(
      localStorage.getItem(`cart_${cartItemId}`) || ""
    );
    const updateItem = {
      id: cartItem.id,
      quantity,
      product: cartItem.product,
    };

    localStorage.setItem(`cart_${cartItemId}`, JSON.stringify(updateItem));

    return res(ctx.status(200));
  }),

  //장바구니 아이템 삭제
  rest.delete("/cart-items/:cartItemId", async (req, res, ctx) => {
    const { cartItemId } = req.params;

    const cartId = JSON.parse(localStorage.getItem(`cartId`) || "[]");
    const newCartID = cartId.filter((id: number) => id !== Number(cartItemId));
    localStorage.setItem(`cartId`, JSON.stringify(newCartID));

    localStorage.removeItem(`cart_${cartItemId}`);

    return res(ctx.status(204));
  }),
];
