import { Request, Response } from 'express';

import { ExpressInterface } from '../../interfaces/express.interface';
import {
    TwoFactorAuthenticationServiceInterface,
} from '../../interfaces/modules/authentication/2fa-service.interface';

export class TwoFactorAuthenticationController extends ExpressInterface<
  TwoFactorAuthenticationServiceInterface
> {
  public defineRoutes(): this {
    this.instance.post(this.setRoute("/2fa"), async (req, res) =>
      this.postCheck(req, res, this.service)
    );

    return this;
  }

  public async postCheck(
    req: Request,
    res: Response,
    service: TwoFactorAuthenticationServiceInterface
  ) {
    const authenticationCode: string = req.body.code;

    res
      .status(200)
      .json({
        code: authenticationCode
      })
      .end();
  }
}
