Sure! Here's the updated `README.md` in **English**, including Cloudinary support:

---

# 🛒 E-Commerce API

A RESTful API for an online store built with **Node.js**, **Express**, and **MongoDB**. It includes JWT authentication, product and order management, shopping carts, image uploads via **Cloudinary**, security middleware, and Swagger documentation.

---

## 🚀 Technologies Used

* **Node.js** + **Express**
* **MongoDB** + **Mongoose**
* **JWT (JSON Web Tokens)**
* **Cloudinary** (image hosting)
* **Swagger (OpenAPI)**
* **Helmet** + **CORS**
* **Rate Limiting**

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone 
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add your environment variables:

   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/your-db
   JWT_SECRET=your_jwt_secret

   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

---

## 📚 Main Endpoints

| Base Route      | Description                                             |
| --------------- | ------------------------------------------------------- |
| `/api/auth`     | User registration, login, and current user info         |
| `/api/admin`    | Admin routes (user & product control)                   |
| `/api/products` | Public CRUD operations for products (with image upload) |
| `/api/cart`     | Manage shopping carts                                   |
| `/api/orders`   | Create and track orders                                 |
| `/debug`        | Debug route to inspect request body                     |

---

## 🖼️ Image Uploads with Cloudinary

This project uses **Cloudinary** to handle product image uploads.

* Images are uploaded through the product endpoints (`/api/products`).
* The returned Cloudinary `secure_url` and `public_id` are stored in MongoDB.
* Uploads are handled using `multer` or `form-data` via a POST request.

### 🔧 Example: Uploading an image via Postman

* Endpoint: `POST /api/products`
* Body type: `form-data`
* Fields:

  * `name` – Product name
  * `price` – Product price
  * `image` – Type: `File` → Choose an image from your computer

---

## 🔐 Security Features

* **Helmet**: Sets secure HTTP headers
* **CORS**: Configures cross-origin requests
* **Rate Limiting**:

  * Global rate limit for all `/api/` routes
  * Additional protection for `/api/auth` and `/api/admin`

---

## 📊 API Documentation (Swagger)

Once the server is running, access Swagger UI at:

```
http://localhost:5000/api-docs
```

You can test and explore all endpoints from there.

---

## 📁 Project Structure

```
├── config/
│   ├── db.js
│   └── cloudinary.js
├── routes/
│   ├── auth.routes.js
│   ├── admin.routes.js
│   ├── product.routes.js
│   ├── cart.routes.js
│   └── order.routes.js
├── controllers/
│   └── productController.js (includes Cloudinary logic)
├── middlewares/
│   ├── ratelimit.js
│   └── security.js
├── swagger.js
├── .env
├── app.js
└── package.json
```

---

## 🧪 Testing (Coming Soon)


---

## ☁️ Deployment Ready

This API can be deployed to platforms like:

* [Render](https://render.com)
* [Railway](https://railway.app)
* [Vercel](https://vercel.com) (for serverless functions)

---

