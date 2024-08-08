import express, { Application, Request, Response, NextFunction } from "express";
import { deleteDoc, elasticFirst, get, getAllDocs, insert, updateDoc } from "./Controllers/ElasticSearchController";
import bodyParser from "body-parser";

export const createServer = () => {
    const app: Application = express();

    app.use(bodyParser.json());

    app.get("/", elasticFirst);

    app.post("/insert", insert);

    app.post("/get", get);

    app.delete("/delete-doc", deleteDoc);

    app.get("/get-all", getAllDocs);

    app.patch("/update-doc", updateDoc);

    app.get("*", (req: Request, res: Response) => {
        res.status(404).send("Not Found");
    })

    return app;
}
