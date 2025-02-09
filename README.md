# Check The Name

A modern web application that helps you analyze the cultural significance and potential implications of your brand name before committing to it.

## Features

- Real-time brand name analysis using GPT-4o
- Cultural and historical significance evaluation
- Assessment of potential positive and negative associations
- Similar-sounding words identification
- Beautiful, responsive UI with modern design

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TailwindCSS
- Framer Motion for animations
- React Markdown for rendering analysis

### Backend
- Flask 3.1.0
- OpenAI API
- Python 3.x
- Flask-CORS for cross-origin requests

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the api directory:
   ```bash
   cd api
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file with:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the Flask server:
   ```bash
   flask run
   ```

## Development

- Frontend runs on `http://localhost:3000`
- Backend API runs on `http://localhost:5000`
- Use `npm run lint` in the frontend directory to run linting
- Use `npm run build` to create a production build

## Deployment

The application is containerized and can be deployed using Docker:

### Frontend
- Build the Next.js application for production
- Deploy to your preferred hosting platform (Vercel recommended)

### Backend
- Use the provided Dockerfile in the api directory
- Deploy to your preferred cloud platform - designed to run on Cloud Run.
- Ensure CORS settings are properly configured

## License

MIT
