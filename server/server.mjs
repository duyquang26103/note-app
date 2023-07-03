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
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

const app = express();
const httpServer = http.createServer(app);

//Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cwvepdz.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({httpServer}),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ]
})

await server.start();

const authorizationJWT = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if(authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1];

        getAuth()
            .verifyIdToken(accessToken)
            .then((decodedToken) => {
            res.locals.uid = decodedToken.uid;
            next();
        })
            .catch((err) => {
            // return err.status(403).json({message: 'Forbidden', error: err});
                return err;
        });
    } else {
        // return res.status(401).json({message: 'Unauthorized'});
        next();
    }
}

app.use(
    cors(),
    authorizationJWT,
    bodyParser.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => {
            return { uid: res.locals.uid };
        },
    })
);

mongoose.set('strictQuery', false);
mongoose
    .connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(async () => {
    console.log('Connected to DB');
    await new Promise((resolve) => httpServer.listen(PORT, () => {
        console.log('🚀 Server ready at http://localhost:4000');
        return resolve;
    }));
});
