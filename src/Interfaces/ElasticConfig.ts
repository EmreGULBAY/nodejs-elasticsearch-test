export interface ElasticConfig{
    name: string;
    cluster_name: string;
    cluster_uuid: string;
    version: Record<string, unknown>;
    tagline: string;
}