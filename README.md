
---

# Category & Product REST API

This is a simple REST API built using **Express**, **PostgreSQL**, **Prisma**, and **TypeScript**. The API allows you to manage categories and products, including CRUD (Create, Read, Update, Delete) operations, with a **one-to-many relationship** between categories and products.

## Features
- **Categories**: Manage product categories.
- **Products**: Manage products, with each product linked to a category.
- **CRUD Operations**: Create, Read, Update, and Delete categories and products.
- **Relations**: A product can belong to a category, and you can easily retrieve products by category.

## Technologies Used
- **Express**: Web framework for building the REST API.
- **PostgreSQL**: Database to store category and product data.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **TypeScript**: Provides type safety and enhanced developer experience.

## Getting Started

### Prerequisites
Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TahaZoabi/REST-API.git
   cd REST-API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:
   - Ensure you have a running PostgreSQL instance.
   - Create a `.env` file in the root of your project with the following content (replace with your actual database credentials):

     ```
     DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
     ```

4. Run the Prisma migration to set up the database schema:

   ```bash
   npx prisma migrate dev --name init
   ```

   This will create the necessary tables in your PostgreSQL database.

### Running the Project

1. Start the development server:

   ```bash
   npm run dev
   ```

   This will start the API server on `http://localhost:5000`.

2. The API will now be accessible, and you can interact with it via your browser or tools like **Postman** or **Insomnia**.

### Available Endpoints

#### Categories

- **GET** `/api/categories`: Get all categories
- **GET** `/api/categories/:id`: Get a specific category by ID
- **POST** `/api/categories`: Create a new category
- **PATCH** `/api/categories/:id`: Update a category
- **DELETE** `/api/categories/:id`: Delete a category

#### Products

- **GET** `/api/products`: Get all products
- **GET** `/api/products/:id`: Get a specific product by ID
- **GET** `/api/products/category/:categoryId`: Get all products in a specific category
- **POST** `/api/products`: Create a new product
- **PATCH** `/api/products/:id`: Update a product
- **DELETE** `/api/products/:id`: Delete a product

### Example Requests

#### Create a New Category
**POST** `/api/categories`

Request Body:
```json
{
  "name": "Electronics"
}
```

#### Create a New Product
**POST** `/api/products`

Request Body:
```json
{
  "name": "Smartphone",
  "price": 499.99,
  "categoryId": 1
}
```

#### Get All Products in a Category
**GET** `/api/products/category/1`

#### Update a Product
**PATCH** `/api/products/1`

Request Body:
```json
{
  "name": "Smartphone Pro",
  "price": 599.99,
  "categoryId": 1
}
```

#### Delete a Product
**DELETE** `/api/products/1`

### Prisma Data Model

The Prisma schema defines the structure of the database. Below is the schema for the project:

```prisma

model Category {
  id        Int       @id @default(autoincrement())
  name      String    @unique @db.VarChar(50)
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")
  products  Product[]

  @@map("categories")
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String   @db.VarChar(90)
  description String?  @db.Text
  price       Decimal  @db.Decimal(10, 2)
  currency    String   @default("USD") @db.VarChar(5)
  quantity    Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  Int      @map("category_id")

  @@map("products")
}
```

### Database Migration

To apply future database changes (if you update the Prisma schema), you can run:

```bash
npx prisma migrate dev --name <migration-name>
```

This will create and apply a new migration to update your database schema.

### Testing

You can use **Postman** or **Insomnia** to test the API endpoints, or use any HTTP client like **curl** or **Axios** in your frontend app.

---


### Acknowledgments
- This project was built as part of learning **Express**, **PostgreSQL**, **Prisma**, and **TypeScript**.
- Thanks to the **Prisma** and **Express** documentation for their excellent resources.

---


