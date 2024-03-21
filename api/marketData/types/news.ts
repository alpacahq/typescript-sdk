export interface NewsResponse {
  news: NewsArticle[];
  next_page_token: string | null;
}

export interface NewsArticle {
  id: number;
  headline: string;
  author: string;
  created_at: string;
  updated_at: string;
  summary: string;
  content: string;
  url: string | null;
  images: NewsImage[];
  symbols: string[];
  source: string;
}

export interface NewsImage {
  size: "thumb" | "small" | "large";
  url: string;
}
