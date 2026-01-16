import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Badge,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar>
        <Box
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", lineHeight: 1, color: "black" }}
            >
              САВ - СЕРВИС
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: "0.7rem", lineHeight: 1, color: "black" }}
            >
              (спецодежда)
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/catalog">
            Каталог
          </Button>
          {isAuthenticated && (
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
          {isAuthenticated ? (
            <IconButton color="inherit" component={Link} to="/profile">
              <Avatar src={user?.avatar} sx={{ width: 32, height: 32 }} />
            </IconButton>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Войти
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Регистрация
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
