import { Pinnacle } from 'rcs-js';
import { Request } from 'express';

export interface TriggerPayload {
  action: string;
  params?: Record<string, string | number>;
}

export interface RequestWithMessageEvent extends Request {
  messageEvent: Pinnacle.MessageEvent;
}
