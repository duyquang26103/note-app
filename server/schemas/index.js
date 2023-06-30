export const typeDefs = `#grapql
    scalar Date
    
    type Folder {
        id: String!,
        name: String,
        createAt: String,
        author: Author,
        notes: [Note]
    }
    
    type Note {
        id: String!,
        content: String,
        updatedAt: Date
    }
    
    type Author {
        uid: String!,
        name: String!
    }
    
    type Query {
        folders: [Folder],
        folder(folderId: String!): Folder,
        note(noteId: String): Note, 
        images(base64: String!): [Image],
    }
    
    type Image {
        author: Author,
        base64: String!
    }
    
    type Mutation {
        addFolder(name: String!): Folder,
        addNote(content: String!, folderId: ID!): Note,
        updateNote(id: String!, content: String!): Note,
        register(uid: String!, name: String!): Author,
        addImage(base64: String!): Image,
    }
`;