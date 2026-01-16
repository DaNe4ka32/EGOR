import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();
  const { isAuthenticated } = useAuth();

  const total = getTotal();

  if (cart.length === 0) {
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
            Корзина
          </Typography>
        </Box>
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <Typography variant="body1" paragraph>
            Ваша корзина пуста.
          </Typography>
          <Button variant="contained" component={Link} to="/catalog">
            Перейти в каталог
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        px: 2,
        py: 12,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f7fa",
        maxWidth: "1200px",
        margin: "0 auto",
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
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Корзина
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {cart.map((item) => (
          <Box key={`${item.id}-${item.size}`} sx={{ width: "100%" }}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100, mr: 2 }}
                    image={item.image}
                    alt={item.name}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Размер: {item.size}
                    </Typography>
                    <Typography variant="body1">
                      Цена: {item.price} руб.
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          item.size,
                          parseInt(e.target.value) || 0
                        )
                      }
                      inputProps={{ min: 1 }}
                      sx={{ width: 60, mx: 1 }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </Box>
                  <Typography variant="h6" sx={{ mr: 2 }}>
                    {item.price * item.quantity} руб.
                  </Typography>
                  <IconButton
                    onClick={() => removeFromCart(item.id, item.size)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 4, textAlign: "right" }}>
        <Typography variant="h5" gutterBottom>
          Итого: {total} руб.
        </Typography>
        {isAuthenticated && (
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/checkout"
          >
            Оформить заказ
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;
