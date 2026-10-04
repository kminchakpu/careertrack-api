# CareerTrack API
CareerTrack API is a RESTful web service designed to help users organize and manage their job-search activities. The API provides endpoints for tracking job applications, companies, interviews, and users while supporting authentication through Google OAuth.
The project is built with Node.js, Express, and MongoDB and includes Swagger/OpenAPI documentation for testing and exploring the available endpoints.

## Features
- Create, read, update, and delete job applications
- Manage company information
- Track job interviews
- Manage user information
- Google OAuth 2.0 authentication
- Session-based authentication with Passport.js
- Protected API routes
- MongoDB Atlas database integration
- Input validation and error handling
- Swagger/OpenAPI API documentation
- Production deployment with Render

## Technologies Used
- Node.js
- Express.js
- MongoDB
- MongoDB Atlas
- Passport.js
- Google OAuth 2.0
- Express Session
- Swagger UI Express
- Swagger Autogen
- CORS
- dotenv
- Jest / Supertest
- Render

## Project Structure
careertrack-api/
├── config/
│   └── passport.js
├── controllers/
│   ├── applicationsController.js
│   ├── companiesController.js
│   ├── interviewsController.js
│   └── usersController.js
├── db/
│   └── connect.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── applicationsRoutes.js
│   ├── companiesRoutes.js
│   ├── interviewsRoutes.js
│   ├── usersRoutes.js
│   └── authRoutes.js
├── tests/
├── .env
├── .gitignore
├── app.js
├── server.js
├── swagger.js
├── swagger-output.json
├── swagger-routes.js
├── package.json
└── README.md

## API Collections
CareerTrack uses four primary MongoDB collections.

### Applications
Stores information about job applications.
Example fields include:
{
  "userId": "user-id",
  "companyId": "company-id",
  "jobTitle": "Software Developer",
  "location": "Remote",
  "applicationDate": "2026-10-01",
  "status": "Applied",
  "jobType": "Full-time",
  "salaryRange": "$70,000 - $90,000",
  "jobUrl": "https://example.com/job",
  "notes": "Submitted application online"
}


### Companies
Stores information about companies associated with job applications.
Typical information includes the company name, industry, location, website, and other relevant details.

### Interviews
Stores information about scheduled or completed interviews related to job applications.
Interview records can contain information such as the associated application, interview date, interview type, location, status, and notes.

### Users
Stores information related to CareerTrack users.
Authentication is handled through Google OAuth and Passport.js.

## API Endpoints
### Applications
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | Get all applications |
| GET | `/api/applications/:id` | Get an application by ID |
| POST | `/api/applications` | Create an application |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |

### Companies

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/companies` | Get all companies |
| GET | `/api/companies/:id` | Get a company by ID |
| POST | `/api/companies` | Create a company |
| PUT | `/api/companies/:id` | Update a company |
| DELETE | `/api/companies/:id` | Delete a company |

### Interviews

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/interviews` | Get all interviews |
| GET | `/api/interviews/:id` | Get an interview by ID |
| POST | `/api/interviews` | Create an interview |
| PUT | `/api/interviews/:id` | Update an interview |
| DELETE | `/api/interviews/:id` | Delete an interview |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get a user by ID |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

## Authentication

CareerTrack uses Google OAuth 2.0 with Passport.js for user authentication.

To begin authentication, visit:
/auth/google

After successful authentication, Google redirects the user to:
/auth/google/callback


Authenticated user information can be accessed through the profile route configured by the application.

Users can log out through the logout endpoint.
## Environment Variables
Create a `.env` file in the project root.

PORT=8080
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


.env

## Google OAuth Setup
To use Google authentication:
1. Create a project in Google Cloud Console.
2. Configure the Google Auth Platform.
3. Create an OAuth 2.0 Client ID.
4. Select **Web application** as the application type.
5. Add the local callback URI:

http://localhost:8080/auth/google/callback

6. Add the production callback URI:
https://careertrack-api-t7e8.onrender.com/auth/google/callback


7. Copy the generated Client ID and Client Secret into the appropriate environment variables.
## Installation
Clone the repository:
git clone https://github.com/kminchakpu/careertrack-api.git


Navigate into the project:
cd careertrack-api


Install dependencies:
npm install


Create your `.env` file and add the required environment variables.
Start the application:
npm start

For development, if a development script is configured:
npm run dev


The local server should be available at:

http://localhost:8080


## Swagger API Documentation
CareerTrack includes interactive Swagger/OpenAPI documentation.

After starting the application locally, open:
http://localhost:8080/api-docs

The Swagger interface can be used to:
- View available API endpoints
- Review request parameters
- Review request body schemas
- Test GET requests
- Test POST requests
- Test PUT requests
- Test DELETE requests
- Review API responses and status codes

The production Swagger documentation is available through the deployed Render application:


https://careertrack-api-t7e8.onrender.com/api-docs


## Running Tests
Run the project's automated tests with:
npm test


The test suite verifies important API functionality, including GET endpoints and expected HTTP responses.

## HTTP Status Codes
The API uses standard HTTP status codes, including:
| Status | Meaning |
|---|---|
| `200` | Request completed successfully |
| `201` | Resource created successfully |
| `204` | Request completed with no response body |
| `400` | Invalid request or ID |
| `401` | Authentication required |
| `404` | Resource not found |
| `500` | Internal server error |

## Error Handling

CareerTrack includes error handling for common API problems, including:
- Invalid MongoDB ObjectIds
- Missing required fields
- Resources that cannot be found
- Authentication failures
- Database errors
- Unexpected server errors

Example error response:
{
  "error": "Application not found"
}


## Deployment
The CareerTrack API is deployed using Render.
Production environment variables must be configured in the Render service rather than relying on the local `.env` file.

Required production variables include:
MONGODB_URI
SESSION_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET


After deployment, the application and Swagger documentation can be accessed through the Render production URL.

## Security
The project implements several security practices:
- Environment variables are used for sensitive credentials.
- Google OAuth is used for authentication.
- Passport.js manages authentication.
- Express sessions maintain authenticated sessions.
- Protected routes require authenticated users.
- MongoDB ObjectIds are validated before database operations.
- Secret credentials are excluded from the GitHub repository.

## Future Improvements

Possible future improvements include:
- Application search and filtering
- Pagination
- Application status statistics
- Interview reminders
- User-specific dashboards
- Job application analytics
- Role-based authorization
- Improved validation
- Automated deployment testing
- Frontend integration

## Author/Team Members
1. Kevin Cross Minchakpu
2. Bruno Celada
3. Laurel Xiomara Cerrato Ramirez
4. Stephen Sanders

CareerTrack API was developed as part of a web services/API development project.

## Repository
GitHub repository: https://github.com/kminchakpu/careertrack-api


## License
This project is intended for educational purposes.
