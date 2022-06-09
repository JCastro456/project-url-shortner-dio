import { URLModel } from "../database/model/URL"
import { Request, Response } from "express"
import shortId from "shortid"
import { config } from "../config/Constants"

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originalUrl } = req.body;
    const url = await URLModel.findOne({ originalUrl })
    if (url) {
      res.json(url)
      return;
    }
    const hash = shortId.generate();
    const shortUrl = `${config.API_URL}/${hash}`
    const newUrl = await URLModel.create({ originalUrl, hash, shortUrl })

    res.json(newUrl);
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;
    const url = await URLModel.findOne({ hash })

    if (url) {
      res.redirect(url.originalUrl)
      return;
    }

    res.status(400).json({ error: "URL not found" })
  }
}