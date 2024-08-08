export async function checkElasticStatus(): Promise<boolean> {
    try {
      const elasticUrl = process.env.ELASTIC_URL;
      if (!elasticUrl) {
        throw new Error("ELASTIC_URL is not defined");
      }
      const response = await fetch(elasticUrl + "/_cluster/health");
      try {
        const responseJson = await response.json();
        if (responseJson.status === "red") {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        console.error("Error:", error);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }