import { Request, Response } from 'express';

import { ExpressInterface } from '../../interfaces/express.interface';
import { SmsServiceInterface } from '../../interfaces/modules/communication/sms-service.interface';

export class SmsController extends ExpressInterface<SmsServiceInterface> {
  public defineRoutes(): this {
    this.instance.post(this.setRoute("/sms"), async (req, res) =>
      this.sendSms(req, res, this.service)
    );

    return this;
  }

  public async sendSms(
    req: Request,
    res: Response,
    service: SmsServiceInterface
  ) {
    this.service
      .setToNumber(req.body.to)
      .setFromNumber(req.body.from)
      .setMessage(req.body.content);

    res
      .status(200)
      .json({
        success: await this.service.send()
      })
      .end();
  }
}
