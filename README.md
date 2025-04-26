
# 🚀 Production-Grade Express REST API Template

Built by [dhirajsuthar781](https://dhirajsportfolio.in.net)

A **scalable**, **modular**, and **production-ready** REST API boilerplate using:

- 🟨 Express.js (ES Modules)
- 🧩 Zod for request validation
- 🧠 Modular folder structure
- 🚦 In-memory rate limiter (per-route configurable)
- 🔐 Environment-based configuration (like Vite)

 
 
---

## Table of Contents

- [Installation](#installation)
- [Start Project in Development](#start-project-in-development)
- [Start Project in Production](#start-project-in-production)
- [Creating Modules](#creating-modules)
  - [How to Create a New Module](#how-to-create-a-new-module)
  - [Default Files and Structure](#default-files-and-structure)

---

## [Installation](#installation)

###   Clone the Repository

 
  
 ```sh
git clone https://github.com/ScremingAlien/express-rest-api-production-grade-project.git

cd express-rest-api-production-grade-project

npm install
```

---

## [Start Project in development](#startinDev)
In development **.env** file will be used for Environment variables
 ```sh

npm run dev

```

---

## [Start Project in Production](#startinPro)
In development **.env.production** file will be used for Environment variables
 ```sh

npm run start

```



# Modular Backend Template Usage Guide

This template provides a structured and scalable architecture for building backend applications. It emphasizes modularity, making it easy to organize and extend your project.

## Key Features

* **Modular Structure:** Modules are organized within the `src/modules/` directory, promoting clear separation of concerns.
* **Helper Script:** A convenient `npm run cm` script is included for quickly generating the basic file structure for new modules.
* **Organized Files:** Each module includes dedicated files for controllers, services, models, and routes.
* **Express.js Routing:** Utilizes Express.js Router for defining module-specific routes.
* **Scalability:** The modular design facilitates the addition of new features and the growth of your application.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Creating New Modules

The template includes a helper script to streamline the creation of new modules.

1.  **Run the `createModule` script:**
    ```bash
    npm run cm <module-name>
    ```
    Replace `<module-name>` with the desired name for your new module (e.g., `user`, `product`, `order`).

    **Example:** To create a `user` module, run:
    ```bash
    npm run cm user
    ```

2.  **Generated File Structure:**
    The Above script will automatically generate the following file structure within the `src/modules/` directory:
    ```
    src/
     └── modules/
          └── user/
              ├── user.controller.js
              ├── user.service.js
              ├── user.model.js
              └── user.routes.js
    ```
 

## Routing

Once you've created a new module, you need to integrate its routes into the main application routing.

After that you have to inject the routes of newly created module in **src/app.js**


 



 