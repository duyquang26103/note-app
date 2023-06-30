import {AuthorModel, FolderModel, NoteModel} from "../models/index.js";
import { GraphQLScalarType } from 'graphql';

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
            folders: async (parent, args, context) => {
                return FolderModel.find({
                    authorId: context.uid,
                }).sort({
                    updatedAt: 'desc'
                });
            },
            folder: async (parent, args) => {
                const folderId = args.folderId;
                const foundFolder = await FolderModel.findById(folderId);
                return foundFolder;
            },
            note: async (parent, args) => {
                const nodeId = args.noteId;
                const note = await NoteModel.findById(nodeId);
                return note;
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
                const notes = await NoteModel.find({
                    folderId: parent.id
                }).sort({
                    updatedAt: 'desc'
                });
                return notes;
            },
        },
        Mutation: {
            addFolder: async (parent, args, context) => {
                const newFolder = new FolderModel({...args, authorId: context.uid});
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
                const note = await NoteModel.findByIdAndUpdate(noteId, args);
                return note;
            },
        }
    }
