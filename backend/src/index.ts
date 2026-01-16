import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

const usersFile = path.join(__dirname, "../users.json");
const commentsFile = path.join(__dirname, "../comments.json");
const ordersFile = path.join(__dirname, "../orders.json");

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeUsers = (users: any[]) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

const readComments = () => {
  try {
    const data = fs.readFileSync(commentsFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeComments = (comments: any[]) => {
  fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2));
};

const readOrders = () => {
  try {
    const data = fs.readFileSync(ordersFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeOrders = (orders: any[]) => {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
};

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(
    (u: any) => u.email === email && u.password === password
  );
  if (user) {
    res.json({
      token: "mocktoken",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/api/auth/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const users = readUsers();
  if (users.find((u: any) => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = {
    id: users.length + 1,
    email,
    password,
    name: `${firstName} ${lastName}`,
    avatar: `https://picsum.photos/100/100?random=${users.length + 1}`,
  };
  users.push(newUser);
  writeUsers(users);
  res.json({
    token: "mocktoken",
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      avatar: newUser.avatar,
    },
  });
});

app.get("/api/comments/:productId", (req, res) => {
  const { productId } = req.params;
  const comments = readComments();
  const productComments = comments.filter(
    (c: any) => c.productId === parseInt(productId)
  );
  res.json(productComments);
});

app.post("/api/comments", (req, res) => {
  const { productId, user, text } = req.body;
  const comments = readComments();
  const newComment = {
    id: comments.length + 1,
    productId: parseInt(productId),
    user,
    text,
    date: new Date().toISOString().split("T")[0],
  };
  comments.push(newComment);
  writeComments(comments);
  res.json(newComment);
});

app.post("/api/orders", (req, res) => {
  const { userId, items, total, shippingInfo, paymentInfo } = req.body;
  const orders = readOrders();
  const newOrder = {
    id: Date.now(),
    userId,
    items,
    total,
    shippingInfo,
    paymentInfo,
    date: new Date().toISOString(),
  };
  orders.push(newOrder);
  writeOrders(orders);
  console.log("New order:", newOrder);
  res.json({ message: "Order placed successfully", orderId: newOrder.id });
});

app.get("/api/orders/:userId", (req, res) => {
  const { userId } = req.params;
  const orders = readOrders();
  const userOrders = orders.filter(
    (order: any) => order.userId === parseInt(userId)
  );
  res.json(userOrders);
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { avatar } = req.body;
  const users = readUsers();
  const userIndex = users.findIndex((u: any) => u.id === parseInt(id));
  if (userIndex !== -1) {
    users[userIndex].avatar = avatar;
    writeUsers(users);
    res.json({ id: parseInt(id), avatar });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
