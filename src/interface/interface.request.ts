import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
interface ISpot {
  thumbnail: File;
  company: string;
  price: number;
  techs: string;
}

interface CustomHeaders {
  user: string;
}

interface IReqCustom<TBody, THeader> extends Request {
  body: TBody;
  headers: IncomingHttpHeaders & THeader;
}
