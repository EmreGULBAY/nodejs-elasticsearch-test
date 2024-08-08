import { Request, Response } from "express";
import { checkElasticStatus } from "../Services/ElasticSearchService";
import { First } from "../Services/ElasticInit";
import { Document } from "../Interfaces/Document";
import { DELETE, GET, GETALL, POST, UPDATE } from "../Services/ElasticCrud";

export async function elasticFirst(req: Request, res: Response) {
  try {
    const elasticUrl = process.env.ELASTIC_URL;
    if (!elasticUrl) {
      throw new Error("ELASTIC_URL is not defined");
    }
    const elasticStatus = await checkElasticStatus();
    if (elasticStatus === false) {
      throw new Error("ElasticSearch is not available");
    }

    const response = await First(elasticUrl);

    if (response.status === false) {
      throw new Error(response.data);
    }

    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function insert(req: Request, res: Response) {
  try {
    const { id, name, description } = req.body;
    if (!id || !name || !description) {
      res.status(400).send("Missing input");
      return;
    }

    if (
      typeof id !== "number" ||
      typeof name !== "string" ||
      typeof description !== "string"
    ) {
      res.status(400).send("Invalid input");
      return;
    }
    const dataToSave: Document = {
      id: id,
      name: name,
      description: description,
      isActive: true,
    };
    const elasticResponse = await POST(dataToSave);

    if (elasticResponse.status === false) {
      throw new Error(elasticResponse.data as string);
    }

    res.status(200).send("Document saved successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).send("Missing input");
      return;
    }

    if (typeof id !== "number") {
      res.status(400).send("Invalid input");
      return;
    }

    const elasticResponse = await GET(id.toString());

    if (elasticResponse.status === false) {
      throw new Error(elasticResponse.data as string);
    }

    res.status(200).json(elasticResponse.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function deleteDoc(req: Request, res: Response) {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).send("Missing input");
      return;
    }

    if (typeof id !== "number") {
      res.status(400).send("Invalid input");
      return;
    }

    const elasticResponse = await DELETE(id.toString());

    if (elasticResponse.status === false) {
      throw new Error(elasticResponse.data as string);
    }

    res.status(200).json(elasticResponse.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function getAllDocs(req: Request, res: Response) {
  try {
    const docs = await GETALL();
    res.status(200).json(docs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function updateDoc(req: Request, res: Response) {
  try {
    const { id, name, description } = req.body;
    if (!id || !name || !description) {
      res.status(400).send("Missing input");
      return;
    }

    if (
      typeof id !== "number" ||
      typeof name !== "string" ||
      typeof description !== "string"
    ) {
      res.status(400).send("Invalid input");
      return;
    }

    const docToUpdate: Document = {
      id: id,
      name: name,
      description: description,
    };

    const elasticResponse = await UPDATE(id.toString(), docToUpdate);

    if (elasticResponse.status === false) {
      throw new Error(elasticResponse.data as string);
    }

    res.status(200).json(elasticResponse.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}
