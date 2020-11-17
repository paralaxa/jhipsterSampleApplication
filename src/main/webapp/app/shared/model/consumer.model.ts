import { IId } from 'app/shared/model/id.model';

export interface IConsumer {
  id?: number;
  otherFields?: string;
  ids?: IId[];
}

export class Consumer implements IConsumer {
  constructor(public id?: number, public otherFields?: string, public ids?: IId[]) {}
}
