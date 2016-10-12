/**
 * patient
 */
import { BaseModel } from './base-model.model';
import { serializable, serialize } from './serializable.decorator';

export class Patient extends BaseModel {
    constructor(openmrsModel?: any) {
        super(openmrsModel);
    }
}