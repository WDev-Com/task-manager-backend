---

# **📌 Task Management System with File Storage (MongoDB & GridFS)**  

A **Node.js & Express-based Task Management System** that allows users to **create tasks, upload large PDF files, and stream files efficiently** using **MongoDB GridFS**.  

---

## **📜 Table of Contents**
- [🚀 Features](#-features)  
- [🛠️ Tech Stack](#️-tech-stack)  
- [📂 Folder Structure](#-folder-structure)  
- [⚙️ Installation & Setup](#️-installation--setup)  
- [📌 API Endpoints](#-api-endpoints)  
  - [Task Management](#task-management)  
  - [File Upload & Streaming](#file-upload--streaming)  
- [📜 License](#-license)  
- [👨‍💻 Author](#-author)  

---

## **🚀 Features**  
### **1️⃣ Organized Folder Structure**  
- Implements **MVC (Model-View-Controller) architecture**.  
- Follows **modular programming principles** for maintainability.  

### **2️⃣ RESTful API with Express.js**  
- Provides endpoints for **task creation, retrieval, and file management**.  
- Uses **middleware for validation and error handling**.  

### **3️⃣ Controller & Service Layer for Clean Code**  
- **Controllers** handle API requests and responses.  
- **Services** manage business logic and database interactions.  

### **4️⃣ MongoDB Atlas for Data Storage**  
- Stores **task details** in **MongoDB Atlas**.  
- Uses **Mongoose ORM** for efficient queries.  

### **5️⃣ Efficient File Storage with GridFS**  
- Handles **large PDF files** without memory overhead.  
- Supports **chunked file storage** for improved performance.  

### **6️⃣ File Streaming Support**  
- Streams files **directly from MongoDB Atlas** using **GridFSBucket**.  
- Supports **downloading files without performance issues**.  

### **7️⃣ Optimized & Clean Code**  
- Uses **async/await** for non-blocking operations.  
- Implements **error handling** and **logging**.  

---

## **🛠️ Tech Stack**
| Technology  | Description |
|-------------|------------|
| **Node.js** | Backend runtime |
| **Express.js** | Web framework |
| **MongoDB Atlas** | Cloud-based NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **GridFS** | File storage for large PDFs |
| **Multer** | Middleware for file uploads |
| **Multer-GridFS-Storage** | Stores files in MongoDB GridFS |

---

## **📂 Folder Structure**
```
📦 task-management-system
 ┣ 📂 controllers        # Handles request processing
 ┣ 📂 db                 # Configuration files (DB connection, env setup)
 ┣ 📂 middleware         # Custom error handlers and authentication
 ┣ 📂 model              # Mongoose schemas and models
 ┣ 📂 routes             # API routes (taskRoutes, fileRoutes)
 ┣ 📂 service            # Business logic and database interactions
 ┣ 📂 uploads/files      # Local storage for uploaded files (if needed)
 ┣ 📂 utils              # Custom utilities
 ┣ 📜 app.js             # Handles middlewares
 ┣ 📜 index.js           # Main entry point
 ┗ 📜 .env               # Environment variables (MongoDB URI, secrets)
```

---

## **⚙️ Installation & Setup**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system
```
### **2️⃣ Install Dependencies**
```bash
npm install
```
### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory:
```
MONGO_URI=your_mongodb_atlas_connection_string
```
### **4️⃣ Start the Server**
```bash
npm start
```
The server will run on `http://localhost:5000`.

---

## **📌 API Endpoints**

### **Task Management**
| Method | Endpoint              | Description               |
|--------|----------------------|---------------------------|
| `POST` | `/api/tasks/create`  | Create a new task         |
| `GET`  | `/api/tasks/:id`     | Get task details by ID    |

### **File Upload & Streaming**
| Method | Endpoint                    | Description                     |
|--------|----------------------------|---------------------------------|
| `POST` | `/api/tasks/create`        | Upload a file with a task       |
| `GET`  | `/api/tasks/:id/file`      | Stream the file associated with a task |

---

## **📜 License**
This project is licensed under the **MIT License**.

---

## **👨‍💻 Author**
**Rushikesh Amberkar**  
🚀 *Full-Stack Developer | Blockchain Enthusiast*  
🔗 [GitHub](https://github.com/WDev-Com) | [LinkedIn](www.linkedin.com/in/rushikesh-amberkar)  

---
