import { defineStore } from "pinia";
import axios from "axios";
import type { Author, Book, User } from "../types";
import {  ref } from "vue";
export const useBookStore = defineStore("books", () => {
  const initializeBook = (): void => {
    currentBook.value = {
      name: "",
      id: 0,
      description: "",
      author: {
        id: 0,
        name: "",
        rating: 0,
      },
      favourite: false,
    };
  };


  const currentUser = ref<User>({ name: "", books: [] });
  const currentBook = ref<Book>({
    name: "",
    id: 0,
    description: "",
    author: {
      id: 0,
      name: "",
      rating: 0,
    },
    favourite: false,
  });
  const users = ref<User[]>([]);
  const listOfAuthors = ref<Author[]>([]);
  const listOfBooks = ref<Book[]>([]);
  const addUser = async (belongsTo: string) => {
    const response = await axios.get(
      `http://localhost:8080/api/library/${belongsTo}/books`
    );
    users.value.push({ name: belongsTo, books: response.data });

    console.log(response.data);
  };

  const getAuthorList = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/library/authors`
    );
    console.log(response.data);
    listOfAuthors.value = response.data;
    console.log(listOfAuthors.value);
  };
  const addBook = async (belongsTo: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/library/${belongsTo}/books`,
        {
          name: currentBook.value.name,
          authorId: currentBook.value.author.id,
          description: currentBook.value.description,
        }
      );
      currentBook.value = response.data;

      users.value
        .find((name) => name.name == belongsTo)
        ?.books.push(currentBook.value);
      currentBook.value = {
        name: "",
        id: 0,
        description: "",
        author: {
          id: 0,
          name: "",
          rating: 0,
        },
        favourite: false,
      };
    } catch (e: any) {
      console.log("api call failed", e);
    }
  };

  const getListOfBooks = async (belongsTo: string) => {
    const response = await axios.get(
      `http://localhost:8080/api/library/${belongsTo}/books`
    );
    console.log(response.data);
    listOfBooks.value = response.data;
    console.log(users);
  };

  const setFavourite = async (
    belongsTo: string,
    bookId: number,
    fav: boolean
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/library/${belongsTo}/books/${bookId}`,
        undefined,
        {
          params: {
            favourite: !fav,
          },
        }
      );

      const index = listOfBooks.value.findIndex((book) => book.id == bookId);
      if (index !== -1) {
        listOfBooks.value[index] = response.data; 
      }
    } catch (e: any) {
      console.log("api call failed", e);
    }
  };

  const deleteBook = async (belongsTo: string, bookId: number) => {
    try{
    await axios.delete(
      `http://localhost:8080/api/library/${belongsTo}/books/${bookId}`
    );
    const index=listOfBooks.value.findIndex((id)=>id.id==bookId)
    listOfBooks.value.splice(index,1)
  }
  
  catch(e:any){
    console.log("fail",e)
  }
  };

  const getBooksByAuthor=async(belongsTo:string,author:string)=>{
    try{
    const response = await axios.get(
      `http://localhost:8080/api/library/${belongsTo}/books/search`,{
     params: {
        authorName:author ,
      }
      }
    );
    listOfBooks.value=response.data
  }
  catch(e:any){
console.log("failed",e)
  }
  }
  const getListOfFavouriteBooks = async (belongsTo: string) => {
    try{
    const response = await axios.get(
      `http://localhost:8080/api/library/${belongsTo}/books/fav`,
    );
    listOfBooks.value=response.data
    }
    catch(e:any){
      console.log("api call failed",e)
    }
  };
  return {
    currentUser,
    currentBook,
    users,
    addBook,
    initializeBook,

    addUser,
    getAuthorList,
    listOfAuthors,
    listOfBooks,
    getListOfBooks,
    setFavourite,
    deleteBook,
    getListOfFavouriteBooks,
    getBooksByAuthor,
  };
});
