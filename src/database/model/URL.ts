import { prop, getModelForClass } from '@typegoose/typegoose'

export class URL {
  @prop()
  public originalUrl: string;

  @prop()
  public hash: string;

  @prop()
  public shortUrl: string;
}

export const URLModel = getModelForClass(URL)