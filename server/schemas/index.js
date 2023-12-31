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
        name: String!,
        username: String!,
        password: String!,
        imageId: String,
    }
    
    type Query {
        author: Author,
        folders: [Folder],
        folder(folderId: String!): Folder,
        note(noteId: String): Note, 
        bgImage: [BgImage],
    }
    
    type BgImage {
        author: Author,
        imageUrl: String!
    }
    
    type Mutation {
        addAuthor(name: String!, username: String, password: String): Author,
        addFolder(name: String!): Folder,
        addNote(content: String!, folderId: ID!): Note,
        updateNote(id: String!, content: String!): Note,
        deleteNote(id: String!): Note,
        register(uid: String!, name: String!): Author,
        updateBgImage(imageUrl: String!): BgImage,
        addBgImage(imageUrl: String!): BgImage,
        pushNotification(content: String): Message
    }
    
    type Message {
        message: String
    }
    
    type Subscription {
        folderCreated: Message,
        notification: Message
    }
`;