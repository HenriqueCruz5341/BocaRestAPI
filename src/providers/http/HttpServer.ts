import HttpResponse from './HttpResponse';

export default interface HttpServer {
  register(
    method: string,
    url: string,
    callback: (params: any, body: any) => Promise<HttpResponse>
  ): Promise<void>;
  listen(port: number): Promise<void>;
}
