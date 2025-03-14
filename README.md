# Express Mongo TypeScript Rest API Starter

Express Mongo TypeScript Rest API Starter Project Template with a lot of predefined setup and configuration for you to just quickly start writing your business logic code.

## 🚀 Best Practices Followed:

- ✅ Layered architecture (controllers, services, models, middlewares).
- ✅ Strict TypeScript usage for type safety.
- ✅ Environment variable management using dotenv.
- ✅ Security best practices (CORS, Helmet).
- ✅ Error handling middleware for cleaner code.
- ✅ Production-ready folder structure for scalability.

## Basic files and folders structure of Express Mongo TypeScript Rest API Starter Project

```bash
📦 emt-rest-api
 ┣ 📂 logs # Application logs files
 ┣ 📂 src # Project source folder
 ┃ ┣ 📂 config # Project related configuration files
 ┃ ┃ ┣ 📜 env.config.ts
 ┃ ┃ ┗ 📜 logger.config.ts
 ┃ ┣ 📂 exceptions # Exceptions response classes
 ┃ ┃ ┣ 📜 apiError.ts # Main api error that extend Error class
 ┃ ┃ ┗ 📜 forbiddenError.ts
 ┃ ┃ ┗ 📜 notFoundError.ts
 ┃ ┃ ┗ 📜 unauthorizedError.ts
 ┃ ┣ 📂 controllers # Handle HTTP request logic.
 ┃ ┃ ┣ 📜 user.controller.ts
 ┃ ┃ ┗ 📜 auth.controller.ts
 ┃ ┣ 📂 middlewares # Reusable middlewares
 ┃ ┃ ┣ 📜 auth.middleware.ts
 ┃ ┃ ┣ 📜 errorHandler.middleware.ts
 ┃ ┃ ┗ 📜 validate-resources.middleware.ts
 ┃ ┣ 📂 models # Defines Mongoose schemas and models
 ┃ ┃ ┣ 📜 user.model.ts
 ┃ ┃ ┗ 📜 session.model.ts
 ┃ ┣ 📂 routes # Route defining related files
 ┃ ┃ ┣ 📜 user.routes.ts
 ┃ ┃ ┣ 📜 auth.routes.ts
 ┃ ┃ ┗ 📜 index.ts
 ┃ ┣ 📂 services # Business logic should be handled here
 ┃ ┃ ┣ 📜 user.service.ts
 ┃ ┃ ┗ 📜 auth.service.ts
 ┃ ┣ 📂 utils # Utility/helper functions (e.g., password hashing, response formatting).
 ┃ ┃ ┗ 📜 hashPassword.ts
 ┃ ┣ 📜 app.ts # Express App Setup
 ┃ ┗ 📜 server.ts # Server Entry Point
 ┣ 📂 tests # Test related files
 ┃ ┣ 📜 user.test.ts
 ┃ ┗ 📜 auth.test.ts
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┗ 📜 README.md
```
