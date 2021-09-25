import { UserInputError } from 'apollo-server-express';
import { promisify } from 'util';
import axios from 'axios';
const { post } = require('request');

const postAsync = promisify(post);

export class InstagramResolver {
    constructor() {}

    static async getShortLivedAccessToken(): Promise<any> {
        let { body, statusCode } = await postAsync({
            url: `https://api.instagram.com/oauth/access_token `,
            formData: {
                client_id: process.env.INSTAGRAM_APP_ID,
                client_secret: process.env.INSTAGRAM_APP_SECRET,
                redirect_uri: "https://httpstat.us/200",
                code: process.env.AUTHORIZATION_CODE,
                grant_type: "authorization_code",
            },
            headers: {
                "content-type": "multipart/form-data",
                host: "api.instagram.com",
            },
        });
        let response = JSON.parse(body);
        if(statusCode !== 200) {
            let error_message = response.error_message;
            return new UserInputError(error_message);
        }
        return response;
    }

    static async getLongLivedAccessToken(): Promise<any> {
        let response;
        try {
            response = await axios.get("https://graph.instagram.com/access_token", {
                params: {
                    grant_type: "ig_exchange_token",
                    client_secret: process.env.INSTAGRAM_APP_SECRET,
                    access_token: process.env.SHORT_LIVED_AT,
                },
                headers: {
                    host: "graph.instagram.com"
                },
            });
        } catch (e) {
            return new UserInputError(e);
        }
        response = response['data'];
        return response;
    }

    static async getProfileData(): Promise<any> {
        let response;
        try {
            response = await axios.get("https://graph.instagram.com/me", {
                params: {
                    fields: "id,username,media_count,account_type",
                    access_token: process.env.LONG_LIVED_AT,
                },
                headers: {
                    host: "graph.instagram.com",
                },
            });
        } catch (e) {
            return new UserInputError(e);
        }
        response = response['data'];
        return response;
    }

    static async getUserMediaData(): Promise<any> {
        let response;
        try {
            response = await axios.get("https://graph.instagram.com/me/media", {
                params: {
                    fields:
                      "id,caption,media_url,media_type,permalink,thumbnail_url,timestamp,username",
                    access_token: process.env.LONG_LIVED_AT,
                  },
                headers: {
                    host: "graph.instagram.com",
                },
            });
        } catch (e) {
            return new UserInputError(e);
        }
        response = response['data'];
        return response;
    }
}