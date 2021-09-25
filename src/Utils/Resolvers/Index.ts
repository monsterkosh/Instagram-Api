import { InstagramResolver } from './Instagram';

const Query = {
    Query: {
        getShortLivedAccessToken: () => InstagramResolver.getShortLivedAccessToken(),
        getLongLivedAccessToken: () => InstagramResolver.getLongLivedAccessToken(),
        getProfileData: () => InstagramResolver.getProfileData(),
        getUserMediaData: () => InstagramResolver.getUserMediaData()
    },
};

module.exports = Query;