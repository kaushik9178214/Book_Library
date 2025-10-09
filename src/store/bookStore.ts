import { defineStore } from "pinia";
import axios from "axios";
import {
  type BookFormError,
  type Author,
  type Book,
  type User,
  type BookForm,
} from "../types";
import { ref } from "vue";
export const useBookStore = defineStore("books", () => {
  const userError = ref<string>("");
  const bookFormError = ref<BookFormError>({
    name: "",
    author: "",
    description: "",
  });
  const currentUser = ref<User>({ name: "", books: [] });
  const bookForm = ref<BookForm>({ name: "", authorId: 0, description: "" });
  const initializeBookForm = (): void => {
    bookForm.value = { name: "", authorId: 0, description: "" };
  };
  const users = ref<User[]>([]);
  const listOfAuthors = ref<Author[]>([]);
  const listOfBooks = ref<Book[]>([]);
  const modalToggle = ref<boolean>(false);

  //Function to initialize
  const initializeBookFormError = (): void => {
    bookFormError.value = { name: "", author: "", description: "" };
  };

  // Async function to add user using GET
  const addUser = async (belongsTo: string) => {
    if (validateUser(belongsTo)) {
      const response = await axios.get(
        `http://localhost:8080/api/library/${belongsTo}/books`
      );
      // check api
      if (response.data) {
        users.value.push({ name: belongsTo, books: response.data });
        userError.value = "";
      } else {
        console.log("Data not received from backend");
      }
    }
  };

  //Function to validate a book before adding it
  const validateBook = (): boolean => {
    bookFormError.value = { name: "", author: "", description: "" };
    let valid: boolean = true;
    if (!bookForm.value.name.trim()) {
      bookFormError.value.name = "Please enter name of Book";
      valid = false;
    }
    if (!bookForm.value.authorId) {
      bookFormError.value.author = "Please choose an author";
      valid = false;
    }
    if (!bookForm.value.description.trim()) {
      bookFormError.value.description = "Description cannot be empty";
      valid = false;
    }
    return valid;
  };

  //Async function to get list of authors using GET
  const getAuthorList = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/library/authors`
    );
    if (response.data) {
      listOfAuthors.value = response.data;
      console.log(listOfAuthors.value);
    }
    else{
      console.log("Data not received from backend")
    }
  };

  //Async function to add a book using POST
  const addBook = async () => {
    if (validateBook()) {
      const requestBook: BookForm = {
        name: bookForm.value.name,
        authorId: bookForm.value.authorId,
        description: bookForm.value.description,
      };

      const belongsTo: string = currentUser.value.name;
      try {
        const response = await axios.post(
          `http://localhost:8080/api/library/${belongsTo}/books`,
          requestBook
        );

        if (response.data) {
          console.log("Book added successfully");
          users.value
            .find((name) => name.name == belongsTo)
            ?.books.push(response.data);
        } else {
          console.log("Data not received from backend");
        }

        getListOfBooks();
        initializeBookForm();
        initializeBookFormError();
        modalToggle.value = false;
        
      } catch (e: any) {
        console.log("api call failed", e);
      }
    }
  };

  //Async function to get list of all books using GET
  const getListOfBooks = async () => {
    const belongsTo: string = currentUser.value.name;
    const response = await axios.get(
      `http://localhost:8080/api/library/${belongsTo}/books`
    );

    // check api
    if (response.data) {
      listOfBooks.value = response.data;
    } else {
      console.log("Data not received from backend");
    }
  };

  //Async function to mark a book as favourite/unfavourite using PUT
  const setFavourite = async (bookId: number, favourite: boolean) => {
    const belongsTo: string = currentUser.value.name;
    try {
      const response = await axios.put(
        `http://localhost:8080/api/library/${belongsTo}/books/${bookId}`,
        undefined,
        {
          params: {
            favourite: !favourite,
          },
        }
      );
      // check api
      if (response.data) {
        const index = listOfBooks.value.findIndex((book) => book.id == bookId);
        if (index != -1) {
          listOfBooks.value[index] = response.data;
        }
      } else {
        console.log("data not received from backend");
      }
    } catch (e: any) {
      console.log("api call failed", e);
    }
  };

  //Async function to delete a book using DELETE
  const deleteBook = async (bookId: number) => {
    const belongsTo: string = currentUser.value.name;
    try {
      await axios.delete(
        `http://localhost:8080/api/library/${belongsTo}/books/${bookId}`
      );
      const index = listOfBooks.value.findIndex((id) => id.id == bookId);
      listOfBooks.value.splice(index, 1);
    } catch (e: any) {
      console.log("fail", e);
    }
  };

  //Async function to get list of books by author name using GET
  const getBooksByAuthor = async (author: string) => {
    const belongsTo: string = currentUser.value.name;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/library/${belongsTo}/books/search`,
        {
          params: {
            authorName: author,
          },
        }
      );
      if (response.data) {
        listOfBooks.value = response.data;
      } else {
        console.log("Data not received from backend");
      }
    } catch (e: any) {
      console.log("failed", e);
    }
  };

  //Async function to get list of favourite books using GET
  const getListOfFavouriteBooks = async () => {
    const belongsTo: string = currentUser.value.name;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/library/${belongsTo}/books/fav`
      );
      if (response.data) {
        listOfBooks.value = response.data;
      } else {
        console.log("Data not received from backend");
      }
    } catch (e: any) {
      console.log("api call failed", e);
    }
  };

  //Function to cancel adding book
  const cancelAddBook = (): void => {
    modalToggle.value = false;
    initializeBookForm();
    initializeBookFormError();
  };

  //Function to assign the current user
  const assignUser = (name: string): void => {
    console.log(name);
    currentUser.value = users.value.find((value) => value.name == name)!;
    // initializeBook();
    userError.value = "";
  };

  //Function to validate user
  const validateUser = (name: string): boolean => {
    userError.value = "";
    let valid: boolean = true;
    if (!name.trim()) {
      userError.value = "User should have a name";
      valid = false;
    }
    if (users.value.find((user) => user.name == name.toLowerCase())) {
      userError.value = "User already exists";
      valid = false;
    }
    return valid;
  };

  return {
    currentUser,
    users,
    addBook,
    bookFormError,
    addUser,
    getAuthorList,
    listOfAuthors,
    listOfBooks,
    getListOfBooks,
    setFavourite,
    deleteBook,
    getListOfFavouriteBooks,
    getBooksByAuthor,
    validateBook,
    userError,
    modalToggle,
    cancelAddBook,
    assignUser,
    bookForm,
    initializeBookForm,
  };
});
