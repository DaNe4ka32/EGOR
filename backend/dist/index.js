"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const usersFile = path_1.default.join(__dirname, "../users.json");
const commentsFile = path_1.default.join(__dirname, "../comments.json");
const ordersFile = path_1.default.join(__dirname, "../orders.json");
const readUsers = () => {
    try {
        const data = fs_1.default.readFileSync(usersFile, "utf8");
        return JSON.parse(data);
    }
    catch {
        return [];
    }
};
const writeUsers = (users) => {
    fs_1.default.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};
const readComments = () => {
    try {
        const data = fs_1.default.readFileSync(commentsFile, "utf8");
        return JSON.parse(data);
    }
    catch {
        return [];
    }
};
const writeComments = (comments) => {
    fs_1.default.writeFileSync(commentsFile, JSON.stringify(comments, null, 2));
};
const readOrders = () => {
    try {
        const data = fs_1.default.readFileSync(ordersFile, "utf8");
        return JSON.parse(data);
    }
    catch {
        return [];
    }
};
const writeOrders = (orders) => {
    fs_1.default.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
};
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
// Auth
app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find((u) => u.email === email && u.password === password);
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
    }
    else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});
app.post("/api/auth/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const users = readUsers();
    if (users.find((u) => u.email === email)) {
        return res.status(400).json({ message: "User already exists" });
    }
    const newUser = {
        id: users.length + 1,
        email,
        password, // В реальном приложении хэшировать пароль
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
// Comments
app.get("/api/comments/:productId", (req, res) => {
    const { productId } = req.params;
    const comments = readComments();
    const productComments = comments.filter((c) => c.productId === parseInt(productId));
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
// Orders
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
    const userOrders = orders.filter((order) => order.userId === parseInt(userId));
    res.json(userOrders);
});
// Update user
app.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const { avatar } = req.body;
    const users = readUsers();
    const userIndex = users.findIndex((u) => u.id === parseInt(id));
    if (userIndex !== -1) {
        users[userIndex].avatar = avatar;
        writeUsers(users);
        res.json({ id: parseInt(id), avatar });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map