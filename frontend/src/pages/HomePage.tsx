import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useCategories } from "../hooks/useCategories";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const categories = useCategories();

  const [notification, setNotification] = useState(() => {
    const justRegistered = localStorage.getItem("justRegistered");
    if (justRegistered) {
      localStorage.removeItem("justRegistered");
      return {
        message: "Вы успешно зарегистрировались и вошли в аккаунт!",
        severity: "success" as const,
      };
    }
    const justLoggedIn = localStorage.getItem("justLoggedIn");
    if (justLoggedIn) {
      localStorage.removeItem("justLoggedIn");
      return {
        message: "Вы успешно вошли в аккаунт!",
        severity: "success" as const,
      };
    }
    return null;
  });

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #388e3c 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: "100%", px: 2 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Добро пожаловать в САВ-сервис
          </Typography>
          <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Ваш надежный партнер по поставке качественной спецодежды для любых
            отраслей
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/catalog"
              sx={{
                backgroundColor: "white",
                color: "#1976d2",
                "&:hover": { backgroundColor: "#e3f2fd" },
              }}
            >
              Перейти в каталог
            </Button>
            {!isAuthenticated && (
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/register"
                sx={{
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    borderColor: "#e3f2fd",
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                Зарегистрироваться
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Categories Section */}
      <Box sx={{ mt: 4, mb: 4, width: "100%", px: 2 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Популярные категории
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3,
            justifyItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {categories.map((category) => (
            <Card
              key={category.name}
              sx={{
                flex: "1 1 250px",
                maxWidth: 300,
                boxShadow: 2,
                "&:hover": { boxShadow: 8, transform: "translateY(-6px)" },
                transition: "all 0.3s ease",
                cursor: "pointer",
                borderRadius: 3,
                backgroundColor: "#ffffff",
              }}
              component={Link}
              to={`/catalog?category=${encodeURIComponent(category.name)}`}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                  {category.icon}
                </Typography>
                <Typography variant="h6" component="h3" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Специализированная спецодежда для{" "}
                  {category.name.toLowerCase()} отрасли
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* About Section */}
      <Box sx={{ mt: 8, mb: 8, width: "100%", px: 2 }}>
        <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            textAlign="center"
            sx={{ mb: 4, color: "#1976d2" }}
          >
            О нашей компании
          </Typography>
          <Box
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 3,
              p: 4,
              boxShadow: 2,
            }}
          >
            <Typography
              variant="body1"
              paragraph
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              Частное предприятие «САВ СЕРВИС» основано в 2003 году. Предприятие
              занимается пошивом спецодежды и оптовой торговлей и имеет своё
              швейное производство. Пошив спецодежды осуществляется на
              современном оборудовании, при этом огромное внимание уделяется
              созданию с помощью рабочей одежды фирменного стиля Вашего
              предприятия. По Вашему желанию производится разработка и нанесение
              на изделие фирменной символики различными методами: термопечать,
              вышивка. Подходы к созданию спецодежды для Вашей компании.
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              Высокая квалификация работников позволяет выпускать продукцию
              высокого качества по сравнительно низким ценам.
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              Мы не просто продаем товар, мы пытаемся решить проблемы наших
              Клиентов. Наши менеджеры проведут подробнейшие консультации. Для
              каждого Клиента у нас существует индивидуальный подход к
              ценообразованию и предоставлению дополнительного комплекса услуг,
              что позволяет решить вопросы охраны труда и техники безопасности.
              Много лет наша компания является официальным дилером компании
              «ЭКСПЕРТ СПЕЦОДЕЖДА» РФ. Мы намерены и дальше развивать и
              усиливать сервисную составляющую в отношениях с нашими Клиентами,
              не останавливаясь на достигнутом и предлагать новые услуги и новые
              модели спецодежды для разнопрофильных производств.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Главный принцип нашей работы — личный контакт с клиентом. При
              поступлении заказа на создание фирменной рабочей одежды, к Вам
              прикрепляют персонального менеджера, который поможет решить все
              вопросы, учтет все требования.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification(null)}
          severity={notification?.severity || "success"}
          sx={{ width: "100%" }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HomePage;
