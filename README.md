# Gašper Šimec

## ✅ Requirements Not Implemented

- All specified requirements were successfully implemented.

## ⚠️ Challenges Encountered

**Marvel API Server-Side Authentication:**  
While attempting to implement server-side fetching of Marvel comics, I encountered issues with Marvel's developer portal—specifically, I was unable to retrieve a private key due to authentication problems on their website. Despite this, I implemented the `fetchComicsServer` function to demonstrate how server-side signed requests would be handled under normal conditions.

## 🚀 Getting Started

### 1. Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GASPing4ER/comiczz-webpage.git

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev

### 2. Environment Variables
Before running the application, create a .env file in the root directory and add your Marvel public API key:
  ```ini
NEXT_PUBLIC_MARVEL_PUBLIC_KEY=your_public_key_here
