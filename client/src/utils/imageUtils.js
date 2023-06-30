import {graphQLRequest, graphQLRequestCustom} from "./request";

export const imageLoader = async () => {
    const query = `query Query($base64: String!) {
              images(base64: $base64) {
                base64
              }
            }`;

    const data = await graphQLRequest({query});
    return data;
}

export const addImage = async (newImage) => {
    const query = `query Images($base64: String!) {
          images(base64: $base64) {
            base64
            author {
              name
            }
          }
        }`;

    const data = await graphQLRequestCustom({
        query,
        variables: {base64: newImage}
    });
    console.log("data", data)
    return data;
}