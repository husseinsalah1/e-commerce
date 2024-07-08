import HttpException, { ErrorCodes } from "./root";

class UnauthorizedException extends HttpException {
  constructor(message: string, errorCode: ErrorCodes, errors?: any) {
    super(message, errorCode, 401, errors);
  }
}

export default UnauthorizedException;
