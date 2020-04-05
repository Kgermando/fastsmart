export interface Roles {
    reader?: boolean;
    editor?: boolean;
    admin?: boolean;
}
export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    adress?: string;
    phone?: string;
    roles: Roles;
    updateDate?: Date,
    emailVerified: boolean;
}
