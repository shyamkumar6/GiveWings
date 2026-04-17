export type Category = "FOOD" | "CLOTHES" | "TOYS" | "BOOKS" | "OTHER";

export interface Listing {
  id: string;
  title: string;
  category: Category;
  quantity: number;
}