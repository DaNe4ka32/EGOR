import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Order } from "../types/product";

const ProfilePage: React.FC = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (user?.id) {
      axios.get(`/api/orders/${user.id}`).then((res) => setOrders(res.data));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAvatarChange = async () => {
    if (selectedFile && user) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        try {
          await axios.put(`/api/users/${user.id}`, { avatar: dataUrl });
          const updatedUser = { ...user, avatar: dataUrl };
          login("mocktoken", updatedUser); // Обновить контекст
          setOpen(false);
          setSelectedFile(null);
        } catch (error) {
          console.error("Error updating avatar:", error);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  if (!user) return null;

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        width: "100%",
        px: 2,
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        py: 12,
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #388e3c 100%)",
          color: "white",
          py: 4,
          px: 2,
          borderRadius: 3,
          mb: 4,
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Профиль
        </Typography>
      </Box>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 4 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Avatar
              src={user.avatar}
              sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
            />
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => setOpen(true)}
            >
              Изменить аватар
            </Button>
          </CardContent>
        </Card>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            История заказов
          </Typography>
          {orders.length === 0 ? (
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography>Нет заказов</Typography>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card
                key={order.id}
                sx={{ borderRadius: 3, boxShadow: 2, mb: 2 }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Заказ #{order.id}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Дата: {new Date(order.date).toLocaleDateString()} | Итого:{" "}
                    {order.total} руб.
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Товары:
                  </Typography>
                  {order.items.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                        pl: 2,
                      }}
                    >
                      <Typography variant="body2">
                        {item.name} (Размер: {item.size})
                      </Typography>
                      <Typography variant="body2">
                        {item.quantity} шт. × {item.price} руб. ={" "}
                        {item.quantity * item.price} руб.
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            ))
          )}
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Выйти
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Изменить аватар</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={handleAvatarChange}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
