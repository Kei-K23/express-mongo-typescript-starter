import { ApiError } from './ApiError';

export class ClientError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}
