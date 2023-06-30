import {AuthorModel, FolderModel, ImageModel, NoteModel} from "../models/index.js";
import { GraphQLScalarType } from 'graphql';
import { v4 as uuidv4 } from 'uuid';

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
            },
            images: async (parent, args, context) => {
                return ImageModel.find({
                    authorId: context.uid,
                })
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
            addAuthor: async (parent, args) => {
                const newAuthor = new AuthorModel({...args, uid: uuidv4()});
                await newAuthor.save();
                return newAuthor;
            },
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
            addImage: async (parent, args, context) => {
                const newImg = new ImageModel({...args, authorId: context.uid});
                await newImg.save()
                return newImg;
            }
        }
    }
