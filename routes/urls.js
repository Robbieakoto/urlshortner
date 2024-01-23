import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/url.js';
import { validateUrl } from '../utils/utils.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

const urlsRouter = express.Router();
// Short URL Generator

urlsRouter.post('/shortUrl', async (req, res) => {
    const { originalUrl } = req.body;
    const base = process.env.BASE;

    const urlId = nanoid();
    if (utils.validateUrl(originalUrl)) {
      try {
        let url = await Url.findOne({ originalUrl });
        if (url) {
          res.json(url);
        } else {
          const shortUrl = `${base}/${urlId}`;

          url = new Url({
            originalUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });

          await url.save();
          res.json(url);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
      }
    } else {
      res.status(400).json('Invalid Original Url');
    }
  });

export default urlsRouter;
