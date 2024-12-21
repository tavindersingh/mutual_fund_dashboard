# Mututal Fund Dashboard

## Instruction to Setup project

1. Clone the repository
2. Make sure you have node and npm installed

#### Backend:
1. Enter into backend folder `cd backend`.
2. Run `npm install` to install dependencies.
3. Run `npm run migration:run` to run migrations to database.
4. Run `npm run loadPreviousData` to load previous days mutual fund data *(optional)*.
5. Create `.env` file and copy the content from `.env.example` file.
6. Run `npm run start` to start the server.
7. Open `http://localhost:3000/api-docs` in your browser to open swagger docs.

#### Frontend:
1. Enter into frontend folder `cd frontend`.
2. Run `npm install` to install dependencies.
3. Create `.env` file and copy the content from `.env.example` file.
4. If you have changed the PORT in `backend/.env` file, update the key `VITE_API_BASEURL` in `.env` file.
5. Run `npm run dev` to start the server.
6. Open `http://localhost:5173` in your browser.