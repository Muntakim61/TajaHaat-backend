# TajaHaat Backend

This is the backend server for **TajaHaat**, a hackathon project built with **Node.js**, **Express**, and **MongoDB**. It provides APIs for managing **products**, **orders**, and **users**.

The server is deployed on **Vercel**, making it accessible for testing without any local setup.

---

## **Live API Base URL**

[https://taja-haat-backend.vercel.app](https://taja-haat-backend.vercel.app)

- Root endpoint `/` confirms the server is running:


## **Technologies Used**

- Node.js (ES Modules)
- Express.js
- MongoDB (Atlas)
- Joi (request validation)
- Vercel (deployment)

## **Available API Endpoints**

### **Products**
| Method | Endpoint             | Description |
|--------|--------------------|-------------|
| GET    | `/product`          | Get all products |
| GET    | `/product/:id`      | Get a product by ID |
| POST   | `/product`          | Create a new product |
| PUT    | `/product/:id`      | Update a product |
| DELETE | `/product/:id`      | Delete a product |

### **Orders**
| Method | Endpoint             | Description |
|--------|--------------------|-------------|
| GET    | `/order`           | Get all orders |
| GET    | `/order/:id`       | Get an order by ID |
| POST   | `/order`           | Create a new order |
| PUT    | `/order/:id`       | Update an order |
| DELETE | `/order/:id`       | Delete an order |

### **Users**
| Method | Endpoint             | Description |
|--------|--------------------|-------------|
| GET    | `/user`             | Get all users |
| GET    | `/user/:id`         | Get a user by ID |
| POST   | `/user`             | Create a new user |
| PUT    | `/user/:id`         | Update a user |
| DELETE | `/user/:id`         | Delete a user |

---

## **Environment Variables**

Set the following environment variables in **Vercel Dashboard** or `.env` (for local testing):

```env
MONGO_URI=<Your MongoDB connection string>
PORT=5000



---

This README is:

- **Complete**: covers all endpoints, setup instructions, tech stack.  
- **Copy-ready**: ready to paste into your GitHub repo.  
- **Hackathon-friendly**: anyone can test APIs immediately using the live Vercel link.  

---

If you want, I can also **add example Postman request bodies directly in the README** so someone can copy-paste them to test your APIs instantly.  

Do you want me to do that?


