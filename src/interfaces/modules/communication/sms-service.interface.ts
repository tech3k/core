import { ExpressResponse } from '../../express-response.interface';

export interface SmsServiceInterface {
  setToNumber(number: string): this;
  setFromNumber(number: string): this;
  setMessage(message: string): this;
  send(): Promise<Partial<ExpressResponse>>;
}
