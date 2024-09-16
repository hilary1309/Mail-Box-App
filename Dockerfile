# Stage 1: Build Angular frontend
FROM node:18 as build-frontend

# Set working directory to the root of the project
WORKDIR /app

# Copy frontend files to container
COPY ./ ./

# Install dependencies and build the Angular app
RUN cd frontend && npm install && npm run build --prod

# Stage 2: Build backend
FROM node:18 as build-backend

# Set working directory for the backend
WORKDIR /app

# Copy backend files to container
COPY ./backend /app

# Install backend dependencies
RUN npm install

# Copy Angular build output from frontend stage to backend public folder
COPY --from=build-frontend /app/frontend/dist/frontend /app/public

# Expose the port that the backend server will run on (adjust this as per your backend config)
EXPOSE 4200 
# change when needed

# Start the backend server
CMD ["npm", "start"]
