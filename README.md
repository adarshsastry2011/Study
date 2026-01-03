# Strict Study Timer

A tablet-optimized web application that helps you strictly follow your schedule by syncing with Google Calendar.

## Features
*   **One-Tap Sync:** Pulls today's events from Google Calendar.
*   **Strict Mode:**
    *   **Green:** Active/Future tasks.
    *   **Red:** Time Over (missed) tasks.
*   **Tablet Layout:** Designed for touch and larger screens.

## Setup & Run

1.  **Install Dependencies:**
    ```bash
    cd strict-study-timer
    npm install
    ```

2.  **Start the Server:**
    ```bash
    npm run dev
    ```

3.  **Open in Browser:**
    *   Visit `http://localhost:5173` on your computer.

## How to Run on Android Tablet (Samsung S11)

To use this app on your tablet while running the code on your computer, use **Chrome Port Forwarding**. This allows your tablet to access `localhost` on your computer.

1.  **Connect via USB:** Plug your S11 tablet into your computer.
2.  **Enable USB Debugging (Tablet):**
    *   Go to **Settings > About tablet > Software information**.
    *   Tap **Build number** 7 times to enable Developer Options.
    *   Go back to **Settings > Developer options**.
    *   Turn on **USB debugging**.
    *   Tap "Allow" if prompted on the screen.
3.  **Configure Chrome (Computer):**
    *   Open Chrome on your computer.
    *   Type `chrome://inspect/#devices` in the address bar.
    *   Check the box **Enable Port Forwarding**.
    *   Click **Configure...** (next to Port Forwarding).
    *   Add a new rule:
        *   **Port:** `5173`
        *   **IP and Port:** `localhost:5173`
    *   Click **Done**.
4.  **Run the App:**
    *   Ensure `npm run dev` is running on your computer.
5.  **Open on Tablet:**
    *   Open Chrome on your S11 Tablet.
    *   Go to `http://localhost:5173`.
    *   The app should load, and Google Sync will work!
