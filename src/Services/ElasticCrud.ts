import { Document } from "../Interfaces/Document";
import { client } from "./ElasticClient";
import { checkElasticStatus } from "./ElasticSearchService";
export async function POST(document: Document) {
  try {
    const elasticStatus = await checkElasticStatus();
    if (elasticStatus === false) {
      throw new Error("ElasticSearch is not available");
    }
    const response = await client.index({
      index: "hello",
      id: document.id.toString(),
      body: {
        name: document.name,
        description: document.description,
      },
    });

    return { status: true, data: response };
  } catch (error) {
    console.error("Error:", error);
    return { status: false, data: "Internal Server Error" };
  }
}

export async function GET(id: string) {
  try {
    const elasticStatus = await checkElasticStatus();
    if (elasticStatus === false) {
      throw new Error("ElasticSearch is not available");
    }
    const response = await client.get<Document>({
      index: "hello",
      id: id,
    });

    if (response._source?.isActive === false) {
      return { status: true, data: "Document is not active" };
    }

    return { status: true, data: response };
  } catch (err: unknown) {
    console.error("Error:", err);
    return { status: false, data: "Internal Server Error" };
  }
}

export async function DELETE(id: string) {
  try {
    const elasticStatus = await checkElasticStatus();
    if (elasticStatus === false) {
      throw new Error("ElasticSearch is not available");
    }
    const response = await client.update({
      index: "hello",
      id: id,
      body: {
        doc: {
          isActive: false,
        },
      },
    });

    return { status: true, data: response };
  } catch (err: unknown) {
    console.error("Error:", err);
    return { status: false, data: "Internal Server Error" };
  }
}

export async function GETALL() {
  try {
    const elasticStatus = await checkElasticStatus();
    if (elasticStatus === false) {
      throw new Error("ElasticSearch is not available");
    }
    
    const response = await client.search({
      index: "hello",
      body: {
        query: {
          match_all: {},
        },
      },
    });

    return { status: true, data: response.hits.hits };

  } catch (err: unknown) {
    console.error("Error:", err);
    return { status: false, data: "Internal Server Error" };
  }
}

