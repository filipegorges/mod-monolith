import ValueObject from "./value-object.interface";
import { v4 as uuid } from 'uuid';


export default class Id implements ValueObject {
    private readonly _id: string;

    constructor(id?: string) {
        this._id = id || uuid();
    }

    get value(): string {
        return this._id;
    }
}