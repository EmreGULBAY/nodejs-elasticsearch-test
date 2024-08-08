import { ElasticConfig } from "../Interfaces/ElasticConfig";

export async function First(elasticUrl: string): Promise<{status: boolean, data: string}> {
  try {
    const response = await fetch(elasticUrl);
    if (!response.ok) {
      return {status: false, data: "Failed to fetch data from ElasticSearch"};
    }
    const data: ElasticConfig = await response.json();
    return {status: true, data: data.tagline};
  } catch (error) {
    console.error("Error:", error);
    return {status: false, data: "Internal Server Error"};
  }
}
