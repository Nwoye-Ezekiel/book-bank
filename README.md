![Logo](/src/assets/images/readme/logo.png)

# Book Bank

Book Bank is a React-based web application that allows users to search and explore books using [Google's Books API].

The application features infinite scrolling, providing a seamless browsing experience. Users can view detailed book information and access previews directly on the [Google Books] platform.

## Project Overview

This project is built using the following tools and technologies:

- **React:** A JavaScript library for building user interfaces, enabling the development of dynamic and interactive web applications.
- **TypeScript:** Provides static typing to catch errors early and improve code quality.
- **Material-UI:** A popular React UI framework that provides pre-designed components for building responsive and visually appealing user interfaces.
- **Tailwind CSS:** Utilizes utility-first CSS for building responsive and modern user interfaces.
- **Axios:** A promise-based HTTP client for making API requests, simplifying the process of fetching data.
- **React Query:** A library for fetching, caching, and synchronizing server data in React applications, providing a powerful and efficient way to manage server state.
- **React Intersection Observer:** A React hook for observing when elements enter or leave the viewport, useful for implementing features like infinite scrolling.
- **Lodash Debounce:** A utility that limits the rate at which a function is executed, optimizing performance during repetitive actions like search input.
- **FontFaceObserver:** A library for monitoring when custom web fonts are loaded, ensuring consistent typography across the application.
- **Husky:** Ensures code quality by running linting and formatting checks before commits.
- **Lint Staged:** Runs linting and formatting tasks on staged files before committing.
- **ESLint:** Identifies and fixes problems in JavaScript and TypeScript code.
- **Prettier:** Formats code consistently according to a defined style.
- **Figma:** A collaborative design tool used to create user interfaces. I used it to design the logo, the app's favicon, and to experiment with various UI elements and layouts.

## Key Features

- **Book Search:** Find books based on various criteria such as title and author, using the powerful search functionality integrated with Google's Books API.
- **Explore Book Details:** View comprehensive information about each book, including title, authors, publication date, cover image, and more.
- **Preview Access:** Directly access the Google Books preview page for each book to read more and explore additional details.
- **User-Friendly Interface:** Enjoy a clean and intuitive interface designed for easy navigation and book exploration.

## Project Setup

This project was created with **Create React App**.

To clone this project, run the follow commands on your terminal:

```sh
git clone https://github.com/Nwoye-Ezekiel/book-bank.git
```

Navigate to the project's directory

```sh
cd book-bank
```

Install all the project dependencies

```sh
yarn
```

Start the development server to view the project on your browser

```sh
yarn start
```

If your browser doesn't open the app automatically after it has loaded, you can simply type the server address shown on the terminal into your browser to open the app.

You can as well view the app which is hosted on **Vercel** by clicking on this link 👉
[Book Bank]

[book bank]: https://the-book-bank.vercel.app/
[google's books api]: https://developers.google.com/books
[google books]: https://books.google.com
