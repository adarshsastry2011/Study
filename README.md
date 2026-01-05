# Strict Study Timer

A tablet-optimized "Strict Mode" study timer that syncs with Google Calendar.

## 🚀 How to Install on Tablet (The "No Terminal" Way)

The easiest way to get this on your tablet is to put the website on the internet (Deploy). This requires **zero cables** and **zero terminal commands** on your tablet.

### Step 1: Prepare the Files
1.  Open your terminal on your computer *one last time*.
2.  Run this command to create the website files:
    ```bash
    cd strict-study-timer
    npm run build
    ```
3.  This creates a folder named `dist`. This folder contains your entire app.

### Step 2: Put it on the Internet (Free)
1.  Go to [Netlify Drop](https://app.netlify.com/drop) (or create a Vercel account).
2.  Drag and drop the `dist` folder onto the page.
3.  Netlify will give you a website link (e.g., `https://random-name-123.netlify.app`).

### Step 3: Configure Google Login
1.  Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2.  Find your Client ID.
3.  Add your **new Netlify URL** to "Authorized JavaScript origins".
    *   *Example:* `https://random-name-123.netlify.app`
4.  Click **Save**.

### Step 4: Install on Tablet
1.  Open Chrome on your S11 Tablet.
2.  Go to your new URL.
3.  Tap the **Three Dots Menu** (top right) -> **Add to Home Screen**.
4.  Tap **Install**.

Now you have a **Real App** on your home screen. No terminals, no cables.
