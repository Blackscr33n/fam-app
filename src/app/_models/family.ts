import { User } from "./user";

export class Family {
    constructor(
        public id: string,
        public name: string,
        public members: User[]
    ){}

}
