import CartService from "../services/CartService";
import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found-exception";
import { AppDataSource } from "../config/connection";
import User from "../entities/User";
import ProductService from "./../services/ProductService";
import CartItem from "../entities/CartItem";
import UserRepository from "../repositories/UserRepository";
import UserService from "./../services/UserServic";
import responseMessage from "./responseMessage";

const cartService = new CartService();
const productService = new ProductService();
const userService = new UserService();

const cartItemRepository = AppDataSource.getRepository(CartItem);

export default class CartController {
  // 1 - Check if user has a cart
  // 2 - If the user does not have a cart, create a cart and add the product
  // 3 - If user has a cart, check if the product is already in the cart
  // 4 - If the product is already in the cart, increase the quantity
  // 5 - If the product is not in the cart, add the product to the cart

  async addItemToCart(req: Request, res: Response, next: NextFunction) {
    const userCart = await cartService.checkUserCart(req.user.id);

    if (!userCart) {
      const cart = await cartService.createCart(req.user.id);
      const cartItem = await cartService.getOrCreateCartItem(
        cart,
        req.body.productId
      );

      if (!cartItem) {
        return next(
          new NotFoundException(
            "Product not found",
            ErrorCodes.PRODUCT_NOT_FOUND
          )
        );
      }
      cartItem.quantity = req.body.quantity;
      await cartItemRepository.save(cartItem);
      return res.json({ cartItem });
    } else {
      const cartItem = await cartService.getOrCreateCartItem(
        userCart,
        req.body.productId
      );
      if (!cartItem) {
        return next(
          new NotFoundException(
            "Product not found",
            ErrorCodes.PRODUCT_NOT_FOUND
          )
        );
      }
      cartItem.quantity += req.body.quantity;
      await cartItemRepository.save(cartItem);
      return res.json(
        responseMessage(true, cartItem, "Item added to cart successfully")
      );
    }
  }

  async removeItemFromCart(req: Request, res: Response, next: NextFunction) {
    const userCart = await cartService.checkUserCart(req.user.id);
    if (!userCart) {
      return next(
        new NotFoundException("Cart not found", ErrorCodes.CART_NOT_FOUND)
      );
    }
    const cartItem = await cartItemRepository.findOne({
      where: {
        cart: { id: userCart.id },
        product: { id: req.params.productId },
      } as any,
    });
    console.log(req.params.productId, userCart.id);
    if (!cartItem) {
      return next(
        new NotFoundException(
          "Product not found in cart",
          ErrorCodes.CART_ITEM_NOT_FOUND
        )
      );
    }

    await cartItemRepository.remove(cartItem);
    return res.json(
      responseMessage(true, null, "Item removed from cart successfully")
    );
  }

  async updateQuantity(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;
    const productId = Number(req.params.productId);
    const { quantity } = req.body;

    const cart = await cartService.findOne({
      where: { user: { id: userId } },
      relations: ["items", "items.product"],
    });

    if (!cart) {
      return next(
        new NotFoundException("Cart not found!", ErrorCodes.CART_NOT_FOUND)
      );
    }

    const cartItem = await cartItemRepository.findOne({
      where: { cart: { id: cart.id }, product: { id: productId } },
    });

    if (!cartItem) {
      return next(
        new NotFoundException(
          "Product not found in cart!",
          ErrorCodes.CART_ITEM_NOT_FOUND
        )
      );
    }

    cartItem.quantity = quantity;
    await cartItemRepository.save(cartItem);

    return res.json({ cartItem });
  }

  async checkout(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;

    const cart = await cartService.findOne({
      where: { user: { id: userId } },
      relations: ["items", "items.product"],
    });

    if (!cart) {
      return next(
        new NotFoundException("Cart not found!", ErrorCodes.CART_NOT_FOUND)
      );
    }
    console.log(cart.items);

    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);

    // Here you can implement the payment gateway integration
    // For now, we will just return the total amount
    return res.json({ totalAmount });
  }

  async getCartItems(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;

    const cart = await cartService.findOne({
      where: { user: { id: userId } },
      relations: ["items", "items.product"],
    });

    if (!cart) {
      return next(
        new NotFoundException("Cart not found!", ErrorCodes.CART_NOT_FOUND)
      );
    }

    return res.json({ items: cart.items });
  }

  async clearCart(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;

    const cart = await cartService.findOne({
      where: { user: { id: userId } },
      relations: ["items"],
    });

    if (!cart) {
      return next(
        new NotFoundException("Cart not found!", ErrorCodes.CART_NOT_FOUND)
      );
    }

    await cartItemRepository.remove(cart.items);

    return res.json({ message: "Cart cleared!" });
  }

  // async addItemToCart(req: Request, res: Response, next: NextFunction) {
  //   const userId = req.user.id;
  //   const { productId, quantity } = req.body;

  //   const isUserHasCart = await cartService.findOne({
  //     where: { user: { id: userId } },
  //     relations: ["user"],
  //   });

  //   if (!isUserHasCart) {
  //     const user = await userService.findOne({ where: { id: userId } });
  //     if (!user) {
  //       return next(
  //         new NotFoundException("User not found!", ErrorCodes.USER_NOT_FOUND)
  //       );
  //     }
  //     const cart = await cartService.create({ user } as any);
  //     const product = await productService.findOne({
  //       where: { id: productId },
  //     });
  //     if (!product) {
  //       return next(
  //         new NotFoundException(
  //           "Product not found!",
  //           ErrorCodes.PRODUCT_NOT_FOUND
  //         )
  //       );
  //     }
  //     const cartItem = cartItemRepository.create({
  //       cart,
  //       product,
  //       quantity,
  //     });
  //     await cartItemRepository.save(cartItem);
  //     return res.json({ cartItem });
  //   } else {
  //     const cart = isUserHasCart;
  //     const product = await productService.findOne({
  //       where: { id: productId },
  //     });
  //     if (!product) {
  //       return next(
  //         new NotFoundException(
  //           "Product not found!",
  //           ErrorCodes.PRODUCT_NOT_FOUND
  //         )
  //       );
  //     }
  //     const cartItem = await cartItemRepository.findOne({
  //       where: { cart: { id: cart.id }, product: { id: productId } },
  //       relations: ["product"],
  //     });
  //     if (cartItem) {
  //       cartItem.quantity += quantity;
  //       await cartItemRepository.save(cartItem);
  //       return res.json({ cartItem });
  //     } else {
  //       const newCartItem = cartItemRepository.create({
  //         cart,
  //         product,
  //         quantity,
  //       });
  //       await cartItemRepository.save(newCartItem);

  //       return res.json({ newCartItem });
  //     }
  //   }
  // }

  // async getCartById(req: Request, res: Response, next: NextFunction) {
  //   const userId = req.user.id;
  //   const cart = await cartService.findOne({
  //     where: { user: { id: userId } },
  //     relations: ["items", "items.product"],
  //   });

  //   return res.json({ cart });
  // }
}
