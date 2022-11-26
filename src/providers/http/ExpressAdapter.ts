import HttpServer from './HttpServer';
import express from 'express';
import HttpResponse from './HttpResponse';

export default class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  async register(
    method: string,
    url: string,
    callback: (params: any, body: any) => Promise<HttpResponse>
  ): Promise<void> {
    this.app[method](url, async function (req: any, res: any) {
      const output = await callback(req.params, req.body);
      res.status(output.getStatusCode()).send(output.getBody());
    });
  }

  async listen(port: number): Promise<void> {
    return this.app.listen(port);
  }
}
