export type Endpoint = () => Promise<{ method: string; url: string }>;
