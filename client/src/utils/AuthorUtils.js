import {graphQLRequestForNonAuth} from "./request";

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