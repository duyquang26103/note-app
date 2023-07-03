import {graphQLRequest, graphQLRequestForNonAuth} from "./request";

export const addNewAuthor = async (newAuthor) => {
    const query = `mutation Mutation($name: String!, $username: String, $password: String) {
          addAuthor(name: $name, username: $username, password: $password) {
            name
            username
            password
          }
        }`;

    return await graphQLRequestForNonAuth({
        query,
        variables: {
            name: newAuthor.displayName,
            username: newAuthor.username,
            password: newAuthor.password
        }
    });
}

export const authorLoader = async () => {
    const query = `query Author {
          author {
            uid
            name
            username
            password
            imageId
          }
        }`;

    const author = await graphQLRequest({
        query,
    });
    console.log("author", author);
    return author
}