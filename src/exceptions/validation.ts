import HttpException, { ErrorCodes } from "./root";

export class UnprocessableEntityException extends HttpException {
  constructor(message: string, errors: any, errorCode: ErrorCodes) {
    super(message, errorCode, 422, errors);
  }
}
