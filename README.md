# Design + AI Toolkit

This project leverages ML models to restore face photos and generate images from text using Stable Diffusion and Real Vision.

## How it works
The toolkit uses GFPGAN for face restoration via Next.js API routes, allowing users to upload photos and get restored images. It also supports text-to-image generation.

## Running Locally

### Prerequisites
1. **Clone the repository:**
    ```bash
    git clone https://github.com/MrPutzi/design-ai-toolkit.git
    cd design-ai-toolkit
    ```

2. **Set up API keys:**
    - Create an account on [Replicate](https://replicate.com) to get an API token.
    - (Optional) For rate limiting, create an UpStash account and set up a Redis database.

3. **Create an `.env` file:**
    ```plaintext
    REPLICATE_API_TOKEN=your_replicate_api_token
    ```
4. **Install dependencies:**
    ```bash
    npm install
    ```
5. **Run the application:**
    ```bash
    npm run dev
    ```
6. **Visit**
    ```plaintext
    http://localhost:3000.
    ```
   
# Troubleshooting
  ```plaintext
Ensure environment variables are set correctly.
Check the console for error logs.
   ```
# Contributing
  ```plaintext
Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.
   ```

#  Powered by
Replicate
Upload
Vercel

# License
MIT
