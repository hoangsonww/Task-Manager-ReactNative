# TaskNexus - Task Manager React Native App 📱

[![Project Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](package.json)
[![React Native](https://img.shields.io/badge/React_Native-0.76.7-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~52.0.38-blue?logo=expo)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-14.x-blue?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%5E5.3.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node Package Manager](https://img.shields.io/badge/npm-7.x-blue?logo=npm)](https://www.npmjs.com/)
[![Yarn](https://img.shields.io/badge/Yarn-1.22.x-blue?logo=yarn)](https://yarnpkg.com/)
[![Prettier](https://img.shields.io/badge/Prettier-3.5.3-blue?logo=prettier)](https://prettier.io/)
[![React Native Paper](https://img.shields.io/badge/React_Native_Paper-5.13.1-blue.svg)](https://callstack.github.io/react-native-paper/)
[![React Native Chart Kit](https://img.shields.io/badge/React_Native_Chart_Kit-6.12.0-blue.svg)](https://www.npmjs.com/package/react-native-chart-kit)
[![MIT License](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)

## Table of Contents

- [Overview](#overview)
  - [iOS](#ios)
  - [Android](#android)
  - [Web](#web)
  - [Screen Recordings](#screen-recordings)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Installation & Setup](#installation--setup)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Running the App](#running-the-app)
- [Usage Instructions](#usage-instructions)
- [File Structure](#file-structure)
- [Scripts & Tools](#scripts--tools)
- [License](#license)
- [Contact](#contact)

## Overview

**Task Manager React Native App** is a modern, cross-platform mobile application built using React Native with Expo and TypeScript.

The app allows users to manage their daily tasks efficiently, with features like task addition, completion, deletion, and drag-and-drop reordering.

The app also includes a dedicated Stats screen with interactive charts (pie, bar, and line) for visualizing task statistics.
It also features dark/light theme toggling with smooth transitions and a custom bottom tab bar for a better UI/UX.

### iOS

<p align="center">
  <img src="img/Flash-IP.png" width="19%">
  <img src="img/Home-IP.png" width="19%">
  <img src="img/Stats-IP.png" width="19%">
  <img src="img/HomeDark-IP.png" width="19%">
  <img src="img/StatsDark-IP.png" width="19%">
</p>

### Android

<p align="center">
  <img src="img/Flash-Android.png" width="19%">
  <img src="img/Home-Android.png" width="19%">
  <img src="img/Stats-Android.png" width="19%">
  <img src="img/HomeDark-Android.png" width="19%">
  <img src="img/StatsDark-Android.png" width="19%">
</p>

### Modals

<p align="center">
  <img src="img/AddModal.png" width="22%">
  <img src="img/AddModalDark.png" width="22%">
  <img src="img/EditModal.png" width="22%">
  <img src="img/EditModalDark.png" width="22%">
</p>

### Web

<p align="center">
  <img src="img/Web.png" width="80%">
</p>

### Screen Recordings

<p align="center">
  <img src="img/ios.gif" alt="Task Manager App - iOS" width="47%">
  <img src="img/android.gif" alt="Task Manager App - Android" width="46%">
</p>

## Features

### Task Management

- **Add, Update & Delete Tasks:** Easily manage your daily tasks through an interactive interface.
- **Drag-and-Drop Reordering:** Rearrange tasks using a smooth, touch-friendly drag-and-drop mechanism.
- **Global State Management:** Uses React Context to manage task state across the app for consistent data handling.

### Statistics Visualization

- **Pie Chart:** Visualizes the ratio of completed vs. incomplete tasks.
- **Bar Chart:** Compares overdue and upcoming tasks with wider, closely spaced bars.
- **Line Chart:** Plots tasks over time (by month), ensuring continuity even if only a single month is available.
- **Transparent & Themed Charts:** All charts feature transparent backgrounds and adjust seamlessly to the current theme.

### Theme & UI

- **Dark/Light Mode Toggle:** Switch between dark and light themes with a toggle integrated into the custom bottom tab bar.
- **Smooth Transitions:** Animated transitions (200ms) for background and UI elements when changing themes.
- **Consistent Material Design:** Built with React Native Paper, ensuring a uniform look and feel across all screens.

### Navigation & Routing

- **Expo Router:** Utilizes Expo Router for clean, declarative navigation between screens.
- **Automatic Root Redirection:** Redirects the root route ("/") to the home screen, ensuring a smooth entry.
- **Fallback Screen:** Provides a custom +not-found screen for undefined routes.

### Flash Screen

- **Splash Screen:** Custom splash screen with app name and slogan.
- **Redirection:** Automatically redirects to the home screen after the splash screen (3 seconds).

## Technical Stack

- **React Native:** Core framework for building cross-platform mobile applications.
- **Expo:** Provides a robust development workflow and build process.
- **TypeScript:** Enhances code quality with static type checking.
- **React Navigation / Expo Router:** Manages navigation and deep linking.
- **React Native Paper:** Offers Material Design components and theming.
- **React Native Chart Kit:** Renders customizable charts (pie, bar, line).
- **Reanimated:** Powers smooth and performant UI animations.
- **ESLint & Prettier:** Maintains code quality and consistent formatting.

## Installation & Setup

### Prerequisites

- **Node.js:** Version 14 or above.
- **Yarn** or **npm:** For package management.
- **Expo CLI:** Install globally (if not already present)
  ```bash
  npm install -g expo-cli
  ```

### Clone the Repository

```bash
git clone https://github.com/hoangsonww/Task-Manager-ReactNative.git
cd Task-Manager-ReactNative
```

### Install Dependencies

Using npm:

```bash
npm install
```

Using Yarn:

```bash
yarn install
```

### Running the App

Start the Expo development server:

```bash
npm start
# or
yarn start
```

Alternatively, you can use the Expo CLI directly:

```bash
npx expo start
```

> Note: You can also use the `-c` flag to clear the cache and start fresh if needed: `npx expo start -c`.

Then:

- Open the app on your device using the Expo Go app, or
- Use an Android/iOS simulator (remember to press `a` or `i` in the terminal to open the app on Android/iOS, respectively), or
- Open the project in a web browser for a quick preview (remember to press `w` in the terminal, it will then open a new tab in your default browser).

---

## Usage Instructions

### Home Screen

- **Add Tasks:** Tap the "Add Task" button to open a modal where you can enter new tasks.
- **Reorder Tasks:** Drag and drop tasks to adjust their order.
- **Toggle Completion:** Tap the checkbox on a task to mark it as complete or incomplete.
- **Delete Tasks:** Remove tasks with the delete action.

### Stats Screen

- **View Charts:**
  - **Pie Chart:** Displays the proportion of completed vs. incomplete tasks.
  - **Bar Chart:** Compares overdue vs. upcoming tasks with wide, closely spaced bars.
  - **Line Chart:** Plots tasks over time by month, ensuring continuity even if only one month is present.
- **Theme Adaptation:**  
  Charts are fully transparent and adapt to the current dark/light theme.

### Theme Toggle

- **Switch Themes:** Use the toggle in the custom bottom tab bar to switch between dark and light modes. The transition is animated over 200ms for a smooth experience.

### Routing

- **Automatic Redirection:** The root route ("/") automatically redirects to the home screen.
- **Fallback:** Invalid routes are handled by the `+not-found` screen (though no such routes are present in the app - it's _technically_ impossible to get lost!).

---

## File Structure

```
Task-Manager-ReactNative
├── app.json                       # Expo configuration file
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration file
├── .gitignore                     # Git ignore file
├── Dockerfile                     # Dockerfile for containerization
├── docker-compose.yml             # Docker Compose file for containerization
├── app
│   ├── _layout.tsx                # Main layout with theme, navigation, and context providers
│   ├── index.tsx                  # Flash screen and redirection to home screen
│   ├── +not-found.tsx             # Custom Not Found screen for undefined routes
│   └── (tabs)
│       ├── _layout.tsx            # Layout for tabbed screens
│       ├── home.tsx               # Home screen for task management
│       └── stats.tsx              # Stats screen for displaying charts and statistics
├── components
│   ├── Chart.tsx                  # Reusable chart component for pie, bar, and line charts
│   ├── CustomTabBar.tsx           # Custom bottom tab bar component (with theme toggle)
│   ├── TaskAddModal.tsx           # Modal component for adding new tasks
│   └── TaskItem.tsx               # Component for displaying individual tasks
├── constants
│   └── Colors.ts                  # Color definitions for light and dark themes
├── contexts
│   ├── ThemeOverrideContext.tsx   # React Context for theme override management (dark/light mode)
│   └── TaskContext.tsx            # React Context for global task state management
├── hooks
│   └── usePrevious.ts             # Custom hook to capture previous state values
├── scripts
│   └── reset-project.js           # Script to reset project state (if needed)
├── styles
│   ├── HomeScreenStyles.ts        # Custom styles for the Home screen
│   ├── StatsScreenStyles.ts       # Custom styles for the Stats screen
│   ├── IndexStyles.ts             # Custom styles for the Flash screen and redirection
│   ├── LayoutStyles.ts            # Custom styles for the main layout
│   ├── TaskModalStyles.ts      # Custom styles for the task add modal
│   ├── TaskItemStyles.ts          # Custom styles for individual task items
│   ├── NotFoundStyles.ts          # Custom styles for the Not Found screen
│   └── CustomTabStyles.ts         # Custom styles for the tab bar and related UI components
├── types
│   └── types.ts                   # TypeScript type definitions for the project
├── assets
│   ├── fonts                      # Custom fonts for the app (Roboto)
│   └── images                     # Images used in the app
└── shell                          # Shell scripts for common tasks
    ├── run-platform.sh            # Script to run the app on a specific platform
    ├── format.sh                  # Script to format the project code
    ├── start.sh                   # Script to start the app
    ├── reset.sh                   # Script to reset the project state
    └── update.sh                  # Script to update project dependencies
```

## Scripts & Tools

- **reset-project.js:** Located in the `scripts` folder, this script resets the project state as needed.
- **Prettier:** Integrated to maintain code quality and consistent formatting.
  - Use by simply running `npm run format` or `yarn format` to format the entire project.
- **Documented Code:** Includes JSDoc comments for functions and TypeScript type definitions for better code understanding.
- **Shell Scripts**: Several shell scripts are included to simplify common tasks, such as starting the app, resetting the project, and updating dependencies. Feel free to use them for easier project management!
  - Use the script by first running `chmod +x <script-name>.sh` to make it executable, then run `./<script-name>.sh` to execute it.
- **Dockerfile (Optional)**: A Dockerfile is provided to containerize the app if needed. However, since mobile testing requires physical devices or emulators, the Dockerfile is designed only for the web version of the app.
  - Use the Docker Compose file (`docker-compose.yml`) to build and run the Docker container, by running `docker-compose up --build`. Ensure that Docker is installed and running on your system.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions, feedback, or suggestions, please contact:

- **Name:** Son Nguyen
- **Email:** [hoangson091104@gmail.com](mailto:hoangson091104@gmail.com)
- **GitHub:** [@hoangsonww](https://github.com/hoangsonww)

---

**Thank you for checking out the Task Manager React Native App! 🚀**
