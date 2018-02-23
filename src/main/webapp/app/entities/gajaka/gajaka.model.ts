import { BaseEntity } from './../../shared';

export class Gajaka implements BaseEntity {
    constructor(
        public id?: number,
        public regionName?: string,
    ) {
    }
}
