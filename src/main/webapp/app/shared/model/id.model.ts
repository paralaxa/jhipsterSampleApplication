import { IConsumer } from 'app/shared/model/consumer.model';

export interface IId {
  id?: number;
  validFrom?: string;
  validTo?: string;
  consumerId?: IConsumer;
  consumerId?: IConsumer;
}

export class Id implements IId {
  constructor(
    public id?: number,
    public validFrom?: string,
    public validTo?: string,
    public consumerId?: IConsumer,
    public consumerId?: IConsumer
  ) {}
}
