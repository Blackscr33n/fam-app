import { User } from './user';

export interface FamilyResponse {
    id: string;
    name: string;
    members: User[];
}

export class Family {
    id: string;
    name: string;
    members: User[];

    constructor(response?: FamilyResponse) {
        this.id = response?.id || '0';
        this.name = response?.name || '';
        this.members = response?.members || [];
    }
}
