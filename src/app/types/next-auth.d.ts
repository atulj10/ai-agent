import "next-auth";

declare module "next-auth" {
    interface User {
        _id?: string;
        username?: string;
        email?: string;
        password?: string;
    }
    interface Session {
        user: {
            _id?: string;
            username?: string;
            email?: string;
            password?: string;
        } & DeafaultSession['user']
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        username?: string;
        email?: string;
        password?: string;
    }
}