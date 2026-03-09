# 🎬 MovieApp

A React Native mobile application built with [Expo](https://expo.dev) and [Expo Router](https://docs.expo.dev/router/introduction). This app allows users to browse a list of movies, view movie details, and search for their favorite films.

## ✨ Features

- **Home Feed**: Browse through a curated list of movies displayed using `FlatList`.
- **Search**: Find specific movies easily using the dedicated search tab.
- **Movie Details**: View in-depth information about individual movies.
- **Tab Navigation**: Seamlessly switch between Home and Search views using bottom tabs.
- **File-based Routing**: Utilizes Expo Router for intuitive and scalable navigation.

## 🚀 Get Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the app

```bash
npx expo start
```

In the output, you'll find options to open the app in a:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo.

## 📁 Project Structure

This project uses [file-based routing](https://docs.expo.dev/router/introduction). The core application files are located in the **app** directory:

- `app/(tabs)/index.tsx`: The main home screen displaying the movie list.
- `app/(tabs)/search.tsx`: The search screen for finding movies.
- `app/movies/[id].tsx`: The movie details screen, automatically handling dynamic routing based on the movie ID.
- `data/movies.json`: Local JSON data serving as the movie database for the application.

## 🛠️ Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction)

---

Enjoy exploring movies with MovieApp! 🍿

<img width="1206" height="2622" alt="Simulator Screenshot - iPhone 16 Pro - 2026-03-09 at 14 19 10" src="https://github.com/user-attachments/assets/b967c427-4064-44ab-bfed-750597bc6bbd" />
<img width="1206" height="2622" alt="Simulator Screenshot - iPhone 16 Pro - 2026-03-09 at 14 19 03" src="https://github.com/user-attachments/assets/aa89f06a-5208-427e-9e46-7890bd420066" />

<img width="1206" height="2622" alt="Simulator Screenshot - iPhone 16 Pro - 2026-03-09 at 14 19 17" src="https://github.com/user-attachments/assets/9738f1c4-9253-4d6c-82a4-d8bbfb30b3a9" />

