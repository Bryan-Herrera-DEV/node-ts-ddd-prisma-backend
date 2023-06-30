export interface IUserBase {
    id: string;
    email: string;
    name?: string | null;
    lastname?: string | null;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}