import {graphQLRequest} from "./request";

export const foldersLoader = async () => {
    const query = `query Folders {
                                  folders {
                                    id
                                    name
                                    createAt
                                    notes {
                                          id
                                          content
                                          updatedAt
                                        }
                                    }
                                }`;

    return await graphQLRequest({query});
}

export const addNewFolder = async (newFolder) => {
    const query = `mutation Mutation($name: String!) {
          addFolder(name: $name) {
            name
            author {
              name
            }
          }
        }`;

    return await graphQLRequest({
        query,
        variables: {name: newFolder.name}
    });
}