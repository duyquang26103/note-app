import {AuthorModel, BgImageModel, FolderModel, NoteModel, NotificationModel} from "../models/index.js";
import {GraphQLScalarType} from 'graphql';
import {v4 as uuidv4} from 'uuid';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const resolvers =
    {
        Date: new GraphQLScalarType({
            name: 'Date',
            parseValue(value) {
                return new Date(value)
            },
            serialize(value) {
                return value.toISOString();
            }
        }),
        Query: {
            author: async (parent, args, context) => {
                console.log(context.uid)
                const author = await AuthorModel.find({
                    uid: context.uid
                });
                console.log(author);
                return author;
            },
            bgImage: async () => {
                const data = await BgImageModel.find({});
                return data;
            },
            folders: async (parent, args, context) => {
                return FolderModel.find({
                    authorId: context.uid,
                }).sort({
                    updatedAt: 'desc'
                });
            },
            folder: async (parent, args) => {
                const folderId = args.folderId;
                return FolderModel.findById(folderId);
            },
            note: async (parent, args) => {
                const nodeId = args.noteId;
                return NoteModel.findById(nodeId);
            }
        },
        Folder: {
            author: async (parent) => {
                const authorId = parent.authorId;
                const author = await AuthorModel.findOne({
                    uid: authorId,
                });
                return author;
            },
            notes: async (parent) => {
                return await NoteModel.find({
                    folderId: parent.id
                }).sort({
                    updatedAt: 'desc'
                });
            },
        },
        Mutation: {
            addAuthor: async (parent, args) => {
                const foundUser = await AuthorModel.findOne({uid: args.uid});

                if (!foundUser) {
                    const newAuthor = new AuthorModel({...args, uid: uuidv4()});
                    await newAuthor.save();
                }
                return foundUser;
            },
            addFolder: async (parent, args, context) => {
                const newFolder = new FolderModel({...args, authorId: context.uid});
                pubsub.publish('FOLDER_CREATED', {
                    folderCreated: {
                        message: 'A new foldert created'
                    }
                })
                await newFolder.save();
                return newFolder;
            },
            register: async (parent, args) => {
                const foundUser = await AuthorModel.findOne({uid: args.uid});

                if (!foundUser){
                    const newUser = new AuthorModel(args);
                    await newUser.save();
                    return newUser;
                }
                return foundUser;
            },
            addNote: async (parent, args) => {
                const newNote = new NoteModel(args);
                await newNote.save();
                return newNote;
            },
            updateNote: async (parent, args) => {
                const noteId = args.id;
                return NoteModel.findByIdAndUpdate(noteId, args);
            },
            deleteNote: async (parent, args) => {
                const noteId = args.id;
                return NoteModel.findByIdAndDelete(noteId);
            },
            updateBgImage: async (parent, args, context) => {
                const authorId = context.uid;
                const bgImage = await BgImageModel.findByIdAndUpdate(authorId, args);
                await bgImage.save()
                return bgImage;
            },
            addBgImage: async (parent, args, context) => {
                const newBgImage = new BgImageModel({...args, authorId: context.uid});
                await newBgImage.save();
                return newBgImage;
            },
            pushNotification: async (parent, args) => {
                const newNotification = new NotificationModel(args);
                await newNotification.save();

                pubsub.publish('PUSH_NOTIFICATION', {
                    notification: {
                        message: args.content
                    }
                })
                return {message: 'SUCCESS'};
            }
        },
        Subscription: {
            folderCreated: {
                subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED', 'NOTE_CREATED'])
            },
            notification: {
                subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION'])
            }
        }
    }
