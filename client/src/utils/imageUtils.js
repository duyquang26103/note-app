import {graphQLRequest} from "./request";

export const updateBgImage = async ({imageUrl}) => {
    const query = `mutation Mutation($imageUrl: String!) {
          updateBgImage(imageUrl: $imageUrl) {
            imageUrl
          }
        }`;

    return await graphQLRequest({
        query,
        variables: {
            imageUrl
        }
    });
}

export const addBgImage = async ({imageUrl}) => {
    const query = `mutation Mutation($imageUrl: String!) {
          addBgImage(imageUrl: $imageUrl) {
            imageUrl
          }
        }`;

    const data = await graphQLRequest({
        query,
        variables: {
            imageUrl
        }
    });
    return data;
}

export const bgImageLoader = async () => {
    const query = `query Query {
          bgImage {
            imageUrl
          }
        }`;

    const data = await graphQLRequest({query});
    return data
}