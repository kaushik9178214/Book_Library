export type Author = {
  id: number;
  name: string;
  rating: number;
};
export type Book = {
  id: number;
  author: Author;
  name: string;
  description: string;
  favourite: boolean;
};
export type User = {
  name: string;
  books: Book[];
};
export type BookFormError={
  name:string,
  author:string,
  description:string
}
export type BookForm={
  name:string,
  authorId:number,
  description:string
}
