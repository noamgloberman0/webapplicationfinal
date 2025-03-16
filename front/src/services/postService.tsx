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

export const likePost = async (postData: any) => {
    const { accessToken, refreshToken } = getTokens();

    const postId = postData.id;
    
    try {
        const response = await axios.put(
            `${BACKEND_URL}/posts/${postId}`,
            postData,
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
        console.error("Error updating post:", error);
        throw error;
    }
};

export const updatePost = async (postData: FormData) => {
    const { accessToken, refreshToken } = getTokens();

    const postId = postData.get('id');
    
    try {
        const response = await axios.put(
            `${BACKEND_URL}/posts/${postId}`,
            postData,
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
        console.error("Error updating post:", error);
        throw error;
    }
};

