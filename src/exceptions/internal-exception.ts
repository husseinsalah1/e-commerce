import HttpException, { ErrorCodes } from "./root";

class InternalException extends HttpException {
  constructor(message: string, errors: any, errorCode: ErrorCodes) {
    super(message, errorCode, 500, errors);
  }
}

export default InternalException;
