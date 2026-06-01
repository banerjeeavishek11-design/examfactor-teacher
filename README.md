# ExamFactorTeacherApp

## 1. Why this Project was Created
The **ExamFactorTeacherApp** is a B2B (Business-to-Business) mobile application built for educators/teachers. As the name suggests, it is designed to help teachers manage, monitor, and assess their students' academic progress effectively through the specific "ExamFactor" platform.

The app's primary objectives are:
*   **Assessment & Activation:** Empowering teachers to assign or "activate" diagnostic tests and homework.
*   **Performance Tracking:** Providing deep insights via "Reports," including student-wise performance, subject details, and topic-wise mastery.
*   **Classroom Management:** Enabling teachers to keep track of classwork, detailed homework metrics, and specific question-by-question solutions.

## 2. Technical Stack & Architecture
The project is built using modern mobile and web technologies, making it capable of running on both iOS and Android:
*   **Core Framework:** `React Native` (v0.73) in combination with TypeScript & JavaScript.
*   **State Management:** `@reduxjs/toolkit` (Redux) is used globally for things like standardizing the selected teacher's class, subject, and login status.
*   **Routing & Navigation:** `@react-navigation` (Stack, Drawer, BottomTabs, and TopTabs) structures the app's complex array of screens.
*   **Data Fetching & API:** `@tanstack/react-query` is paired with `axios` to fetch data asynchronously and handle complex caching strategies easily, connecting to the backend (e.g., `api.dev.examfactor.co`).
*   **Local Storage:** `react-native-mmkv` is used for ultra-fast, synchronous local storage (usually used for persisting tokens, explicit user preferences, and themes).

## 3. How the App Works: Start to End Flow

Here is the life cycle and user journey of the app, from the moment a teacher opens it to their daily usage:

**Phase 1: Bootstrapping the App**
*   **`index.js` & `src/App.tsx`**: When the app launches, it registers the main `App` component. Inside `App.tsx`, it surrounds the application with the overarching context providers: `Redux Provider`, `QueryClientProvider` (for API data), `ThemeProvider`, and an `ApplicationNavigator`. 

**Phase 2: Authentication (The UnAuthorized Stack)**
*   If a teacher is not logged in, the application routes them to the `UnAuthorizedStack`.
*   They are directed to the `LandingScreen`, and subsequently, the `LoginScreen`.
*   When they enter their credentials, the app triggers a `loginByUsername` API call (via `src/services/authService.js`). A successful login stores their access credentials securely and updates the Redux store (`LoginSlice`).

**Phase 3: The Main Dashboard (The Authorized Stack)**
*   Once authorized, the navigator swaps to the `AuthorizedStack`.
*   The system uses the `ScreenDimensionsSlice` to check if the user is on a smartphone or tablet. If on a tablet, it displays a `TabSideBarNavigator`; if on a phone, it uses the `BottomTabNavigator`.
*   The bottom tab/sidebar navigation enables easy switching between the core areas of the app: **Home**, **SchoolWork**, **Reports**, and **Profile**.

**Phase 4: Key Modules & Teacher Activities**
*   **Home Flow:** The teacher lands on the `HomeScreen`. Here they can drill down into `SubjectDetailsScreen` and `TopicWiseDetailsScreen` to get a glance at how subjects are progressing. Redux tracks these selections using `SelectedSubjectSlice` and `SelectedChapterSlice`.
*   **School Work Flow:** The teacher navigates to the School Work section. Here they use services like `activateDiagnosticService` or `activateHomeworkService` to push tasks to students. They can review `ClassWorkdetailsScreen` to inspect specific classroom sessions or check `HomeWorkDetailsScreen`.
*   **Reports Flow:** For grading and analytics, the teacher goes to the Reports section. They can pull up a `StudentWiseReportScreen` to see how an individual is doing, review specific `BookmarkedQuestionsScreen`, or even look at specific questions and their answers (`QuestionSolutionScreen`). The `ReportsServices` fetches this large analytics data from the backend.
*   **Profile Flow:** The teacher has a Drawer layout overlay accessible via `SideBarAuthedScreen`. They can access `ProfileDetailsScreen`, read the `AppGuideScreen`, get help from the `SupportScreen`, or log out safely through the auth service.

## Summary
In short, **ExamFactorTeacherApp** is a robust, state-of-the-art React Native wrapper around school operations. It boots up, checks authentication status, routes the user to a scalable dashboard, and lets teachers activate exams/homework while parsing down complex student data into easy-to-read React Native components.
