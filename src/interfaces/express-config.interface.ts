import { Express } from 'express';

export interface ExpressConfigInterface<S> {
  app: Express;
  prefix?: string;
  service?: S;
}
