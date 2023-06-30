import {graphQLRequest } from "./request";

export const imageLoader = async () => {
    const query = `query Query($base64: String!) {
              images(base64: $base64) {
                base64
              }
            }`;

    const data = await graphQLRequest({query});
    return data;
}