// message, status code, error codes, and error

class HttpException extends Error {
  constructor(
    public message: string,
    public errorCode: ErrorCodes,
    public statusCode: number,
    public errors: any
  ) {
    super(message);
  }
}

export enum ErrorCodes {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  USER_INCORRECT_PASSWORD = 1003,
  ADDRESS_NOT_FOUND = 1004,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
  UNAUTHORIZED_ACCESS = 4001,
  PRODUCT_NOT_FOUND = 5001,
  CART_NOT_FOUND = 6001,
  CART_ITEM_NOT_FOUND = 7001,
}

export default HttpException;
