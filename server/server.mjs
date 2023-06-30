import express from 'express';
import http from "http";
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors'
import mongoose from "mongoose";
import 'dotenv/config'
import { typeDefs } from './schemas/index.js'
import { resolvers } from './resolvers/index.js'
import './firebaseConfig.js';
import {getAuth} from "firebase-admin/auth";

const app = express();
const httpServer = http.createServer(app);

//Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cwvepdz.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
})

await server.start();
