export default class HttpResponse {
  private statusCode: number;
  private body: any;

  constructor(statusCode: number, body: any) {
    this.statusCode = statusCode;
    this.body = body;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getBody(): any {
    return this.body;
  }
}
