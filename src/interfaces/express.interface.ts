import { Express } from 'express';

import { ExpressConfigInterface } from './express-config.interface';

export abstract class ExpressInterface<S> {
  // Store the config for the implementation
  public config: ExpressConfigInterface<S>;

  /**
   * Updates the config for the implementation with the given one
   * @param config The new config
   */
  constructor(config: Partial<ExpressConfigInterface<S>>) {
    this.config = {
      app: require("express")()
    };
    this.setConfig(config).defineRoutes();
  }

  public abstract defineRoutes(): this;

  public setRoute(url: string): string {
    return `${this.config.prefix ? this.config.prefix : ""}${url}`;
  }

  // Set the config for the implementation
  public setConfig(config: Partial<ExpressConfigInterface<S>>): this {
    if (!this.config.app) {
      this.config.app = require("express")();
    }
    this.config = { ...this.config, ...config };
    return this;
  }

  public get instance(): Express {
    return this.config.app;
  }

  public get service(): S {
    if (!this.config || !this.config.service) {
      throw new Error("No Service Configured.");
    }

    return this.config.service;
  }
}
