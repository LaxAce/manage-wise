
export const setCookie = (name: string, value: string) => {
    const d = new Date();
    d.setTime(d.getTime() + (2 * 60 * 60 * 1000)); // 2 hours

    const expires = `expires=${d.toUTCString()}`;

    document.cookie = `${name}=${value}; ${expires}; path=/; secure; SameSite=Lax`;
};

export const deleteCookie = (cookieName: string) => {
    const d = new Date();
    d.setTime(d.getTime() - 1);

    document.cookie = `${cookieName}=; expires=${d.toUTCString()}; path=/; secure; SameSite=Lax`;
};

export const getPasswordStrengthIndicator = (pw: string) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
};