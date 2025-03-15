import axios from "axios";
import { BACKEND_URL } from "../globalVariables";
import { getTokens } from "./globalService";


export const createPost = async (postData: FormData) => {
    const { accessToken, refreshToken } = getTokens();
    try {
        const response = await axios.post(
            `${BACKEND_URL}/posts`,
            postData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "x-refresh-token": refreshToken,
                },
            }
        );
        
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};


export const fetchPosts = async () => {
    const { accessToken, refreshToken } = getTokens();

    try {
        const response = await axios.get(
            `${BACKEND_URL}/posts`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "x-refresh-token": refreshToken,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

export const postsByUser = async (userId: string) => {

    const { accessToken, refreshToken } = getTokens();

    try {
        const response = await axios.get(
            `${BACKEND_URL}/posts?sender=${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "x-refresh-token": refreshToken,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }

};