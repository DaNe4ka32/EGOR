import React from "react";
import { Typography, Box, Link } from "@mui/material";
import { useCategories } from "../hooks/useCategories";

const Footer: React.FC = () => {
  const categories = useCategories();

  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        py: 4,
        px: 2,
        mt: 4,
      }}
    >
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Box sx={{ flex: "1 1 300px" }}>
            <Typography variant="h6" gutterBottom>
              О компании
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Частное предприятие «САВ СЕРВИС» осуществляет пошив спецодежды на
              заказ в Минске и реализацию спецобуви и СИЗ для Ваших сотрудников.
              Сегодня все отрасли промышленности,сферы обслуживания и
              т.д.используют спецодежду,спецобувь и СИЗ отвечающие специальным
              требованиям Охраны труда. Наши специалисты проведут подробную
              консультацию, учтут Ваши пожелания и комплексно подберут
              соответствующюю продукцию.
            </Typography>
          </Box>
          <Box sx={{ flex: "1 1 300px", pl: 15 }}>
            <Typography variant="h6" gutterBottom>
              Категории
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/catalog?category=${encodeURIComponent(
                    category.name
                  )}`}
                  color="inherit"
                  sx={{ mb: 1 }}
                >
                  {category.name}
                </Link>
              ))}
            </Box>
          </Box>
          <Box sx={{ flex: "1 1 300px" }}>
            <Typography variant="h6" gutterBottom>
              Контактная информация
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Адрес:</strong> Магазин: г. Минск, ул. Машиностроителей,
              д. 29, помещение 15, первый этаж. Магазин: г. Минск, ул.
              Тимирязева, д. 67. Склад: г. Минск, ул. Машиностроителей, д. 31.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Телефон:</strong> МТС/Viber +375 33 387-11-06 A1 +375 29
              387 11 07 Отдел оптовых продаж, склад, магазин: +375 17 388 41 06
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong> sav-servis@mail.ru
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Режим работы:</strong> пн-чт. с 8:30 до 17:00, пт. с 8:30
              до 16:00 Склад: пн-чт. с 8:30 до 16:30, пт. с 8:30 до 16:00
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            pt: 2,
            borderTop: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Typography variant="body2">
            © 2026 САВ-сервис. Все права защищены.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
