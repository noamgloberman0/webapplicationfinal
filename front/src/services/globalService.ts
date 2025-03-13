
export const getTokens = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
        throw new Error("Tokens are missing");
    }

    return { accessToken, refreshToken };
};
