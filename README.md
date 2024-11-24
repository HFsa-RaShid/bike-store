# Bike Store API with Express and TypeScript

**[Live URL] (https://bike-strore-and-order.vercel.app/)**

This project is an Express-based application built with TypeScript and integrates MongoDB using Mongoose. The goal is to create a bike store management system, where we manage products (bikes) and orders. It implements CRUD operations for products and orders, along with proper error handling and inventory management.

# Features
+ **Bike Management:** Create, read, update, and delete bikes in the store.
+ **Order Management:** Allow users to place orders for bikes and automatically update inventory.
+ **Revenue Calculation:** Calculate the total revenue generated from all orders using MongoDB aggregation.
+ **Mongoose Schema Validation:** Ensure data integrity for bike and order details using Mongoose schemas.
+ **Error Handling:** Provide detailed error responses for invalid requests and stock shortages.

# Technology Stack
+ **Backend Framework:** Express.js
+ **Programming Language:** TypeScript
+ **Database:** MongoDB (with Mongoose)
+ **API Format:** RESTful API


# Setup Instructions
+ **Step 1:** Clone the repository
Clone this repository to your local machine using the following command:

```
https://github.com/HFsa-RaShid/bike-store
```
+ **Step 2:** Navigate to the project directory:

```
cd bike-store
```

+ **Step 3:** Install dependencies:
```
npm install
```
+ **Step 4:** Create an .env file in the root of the project and add the following:
```
NODE_ENV = development
PORT = 5000
DATABASE_URL = mongodb+srv://bike-store:wGIYaOMVHOflmzOO@cluster0.aq8mwv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

+ **Step 5:** Run the application:
```
npm run start:dev
```

