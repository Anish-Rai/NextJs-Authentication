//THese routes doesnt require authentication aka public route
export const publicRoutes = [
    "/",
    "/auth/new-verification",
    
];


//THese routes does require authentication and once logged in users will be redirected to setting page
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
];


//api authentications routes
export const  apiAuthPrefix = "/api/auth"


//default redirect path after logging in
export const DEFAULT_LOGIN_REDIRECT = '/settings'