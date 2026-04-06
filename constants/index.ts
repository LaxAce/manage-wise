
const constants = {
    maxMobileWidth: 640,
    protectedRoutes: ["/board"],
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "",
    restrictedAuthRoutes: ["/login", "/register", "/verify-email", "/forgot_password", "/reset-password"],
};

export default constants;
