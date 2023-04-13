import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomErrorException extends HttpException {
  constructor(error: any) {
    let message = '';

    if (error.message) {
      message = error.message;
    } else if (error.response) {
      message = error.response.statusText;
    } else {
      message = 'Internal Server Error';
    }

    if (error.status) {
      // any error from api
      super({ message, ...error.errorData }, error.status);
    } else if (error.response) {
      // errors from axios
      super(message, error.response.status);
    } else {
      // unhandled errors
      super({ message, ...error.errorData }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
