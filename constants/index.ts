
const constants = {
    maxMobileWidth: 640,
    baseUrl: "http://localhost:2024/api/v1",
    restrictedAuthRoutes: ["/login", "/register", "/verify-email", "/forgot_password", "/reset-password"],
    protectedRoutes: ["/board",],
};

export default constants;
