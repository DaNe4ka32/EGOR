import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Alert,
  Snackbar,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

interface ShippingInfo {
  name: string;
  address: string;
  phone: string;
}

interface PaymentInfo {
  type: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, getTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    address: "",
    phone: "",
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    type: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const total = getTotal();

  if (!isAuthenticated) {
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
            Оформление заказа
          </Typography>
        </Box>
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <Typography variant="body1" paragraph>
            Пожалуйста, войдите в систему для оформления заказа.
          </Typography>
          <Button variant="contained" component={Link} to="/login">
            Войти
          </Button>
        </Box>
      </Box>
    );
  }

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setPaymentInfo({ ...paymentInfo, type: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Submitting order:", {
      cart,
      total,
      shippingInfo,
      paymentInfo,
    });

    try {
      const orderData = {
        userId: user?.id,
        items: cart,
        total,
        shippingInfo,
        paymentInfo,
      };

      console.log("Sending POST to /api/orders with data:", orderData);
      const response = await axios.post("/api/orders", orderData);
      console.log("Order response:", response.data);
      clearCart();
      setSuccessMessage("Спасибо ваш заказ принят! С вами свяжется менеджер.");
      setSuccess(true);
      setOpenSnackbar(true);
      console.log("Success set to true, snackbar opened");
    } catch (err) {
      console.error("Order submission error:", err);
      setError("Ошибка при оформлении заказа. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !success) {
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
            Оформление заказа
          </Typography>
        </Box>
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <Typography variant="body1" paragraph>
            Ваша корзина пуста. Добавьте товары перед оформлением заказа.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/catalog")}>
            Перейти в каталог
          </Button>
        </Box>
      </Box>
    );
  }

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
          Оформление заказа
        </Typography>
      </Box>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        {success ? (
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Заказ оформлен!
              </Typography>
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
              <Button variant="contained" onClick={() => navigate("/catalog")}>
                Вернуться в каталог
              </Button>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mb: 4 }}>
              <Box sx={{ flex: "1 1 500px" }}>
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Данные доставки
                    </Typography>
                    <TextField
                      fullWidth
                      label="Имя"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleShippingChange}
                      required
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Адрес"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      required
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Телефон"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      required
                    />
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: "1 1 500px" }}>
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Оплата
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Тип оплаты</InputLabel>
                      <Select
                        name="type"
                        value={paymentInfo.type}
                        onChange={handleSelectChange}
                      >
                        <MenuItem value="card">Карта</MenuItem>
                        <MenuItem value="cash">Наличными</MenuItem>
                      </Select>
                    </FormControl>
                    {paymentInfo.type === "card" && (
                      <>
                        <TextField
                          fullWidth
                          label="Номер карты"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentChange}
                          required
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Срок действия (MM/YY)"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          required
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="CVV"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          required
                        />
                      </>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Подтверждение заказа
                </Typography>
                <Typography variant="body1" paragraph>
                  Итого: {total} руб.
                </Typography>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button variant="outlined" onClick={() => navigate("/cart")}>
                    Вернуться в корзину
                  </Button>
                  <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? "Оформление..." : "Подтвердить заказ"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </form>
        )}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CheckoutPage;
