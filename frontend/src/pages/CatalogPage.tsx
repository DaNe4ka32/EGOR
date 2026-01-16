import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import { useCart } from "../hooks/useCart";
import SizeSelectorModal from "../components/SizeSelectorModal";
import type { Product } from "../types/product";

const mockProducts = [
  {
    id: 1,
    name: "Куртка строительная утепленная",
    description:
      "Теплая куртка с водонепроницаемым покрытием для работы в холодных условиях на строительных площадках. Обеспечивает защиту от ветра и осадков.",
    image: "/image/Куртка строительная утепленная.jpg",
    price: 250,
    category: "Спецодежда",
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: false },
    ],
  },
  {
    id: 2,
    name: "Комбинезон рабочий с карманами",
    description:
      "Удобный комбинезон с множеством карманов для инструментов и материалов. Изготовлен из прочной ткани, устойчивой к истиранию.",
    image: "/image/Комбинезон рабочий с карманами.jpg",
    price: 320,
    category: "Спецодежда",
    sizes: [
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
    ],
  },
  {
    id: 3,
    name: "Футболка с длинным рукавом",
    description:
      "Легкая и дышащая футболка с длинным рукавом для работы в теплую погоду. Защищает кожу от солнечных ожогов и мелких травм.",
    image: "/image/Футболка с длинным рукавом.jpeg",
    price: 150,
    category: "Спецодежда",
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
    ],
  },
  {
    id: 4,
    name: "Ботинки кожаные с металлическим носком",
    description:
      "Крепкие ботинки из натуральной кожи с металлическим носком для защиты пальцев ног. Подходят для строительных и промышленных работ.",
    image: "/image/Ботинки кожаные с металлическим носком.jpg",
    price: 280,
    category: "Спецобувь",
    sizes: [
      { size: "39", available: true },
      { size: "40", available: true },
      { size: "41", available: true },
      { size: "42", available: true },
      { size: "43", available: true },
      { size: "44", available: false },
    ],
  },
  {
    id: 5,
    name: "Сапоги резиновые непромокаемые",
    description:
      "Высокие резиновые сапоги для работы в условиях повышенной влажности и грязи. Обеспечивают полную защиту ног от воды и химических веществ.",
    image: "/image/Сапоги резиновые непромокаемые.jpg",
    price: 1200,
    category: "Спецобувь",
    sizes: [
      { size: "36", available: true },
      { size: "37", available: true },
      { size: "38", available: true },
      { size: "39", available: true },
      { size: "40", available: true },
      { size: "41", available: true },
      { size: "42", available: true },
      { size: "43", available: true },
    ],
  },
  {
    id: 6,
    name: "Кроссовки антистатические",
    description:
      "Специальные кроссовки с антистатическим покрытием для работы в помещениях с электрооборудованием. Предотвращают накопление статического электричества.",
    image: "/image/Кроссовки антистатические.jpg",
    price: 1800,
    category: "Спецобувь",
    sizes: [
      { size: "38", available: true },
      { size: "39", available: true },
      { size: "40", available: true },
      { size: "41", available: true },
      { size: "42", available: true },
      { size: "43", available: true },
      { size: "44", available: true },
    ],
  },
  {
    id: 7,
    name: "Шлем защитный с подбородочным ремнем",
    description:
      "Легкий и прочный шлем для защиты головы от ударов и падений. Оснащен регулируемым подбородочным ремнем для надежной фиксации.",
    image: "/image/Шлем защитный с подбородочным ремнем.jpg",
    price: 950,
    category: "СИЗ",
    sizes: [{ size: "One Size", available: true }],
  },
  {
    id: 8,
    name: "Очки защитные с боковой защитой",
    description:
      "Прозрачные очки с полной боковой защитой для предотвращения попадания инородных частиц в глаза. Устойчивы к царапинам и запотеванию.",
    image: "/image/Очки защитные с боковой защитой.jpg",
    price: 350,
    category: "СИЗ",
    sizes: [{ size: "One Size", available: true }],
  },
  {
    id: 9,
    name: "Респиратор с клапаном выдоха",
    description:
      "Многоразовый респиратор для защиты органов дыхания от пыли, аэрозолей и вредных веществ. Оснащен клапаном для облегчения выдоха.",
    image: "/image/Респиратор с клапаном выдоха.jpg",
    price: 650,
    category: "СИЗ",
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
    ],
  },
  {
    id: 10,
    name: "Жилет сигнальный светоотражающий",
    description:
      "Яркий жилет с светоотражающими элементами для обеспечения видимости в условиях низкой освещенности. Обязателен для работы на дорогах.",
    image: "/image/Жилет сигнальный светоотражающий.jpg",
    price: 800,
    category: "Защитная",
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
    ],
  },
  {
    id: 11,
    name: "Нагрудник ударопрочный",
    description:
      "Защитный нагрудник из прочного пластика для предотвращения травм грудной клетки при ударах и падениях тяжелых предметов.",
    image: "/image/Защитный нагрудник .jpg",
    price: 2200,
    category: "Защитная",
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
    ],
  },
  {
    id: 12,
    name: "Наколенники с амортизацией",
    description:
      "Мягкие наколенники с гелевыми вставками для защиты коленей при работе в положении на коленях. Обеспечивают комфорт и защиту.",
    image: "/image/Наколенники с амортизацией.jpg",
    price: 600,
    category: "Защитная",
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
    ],
  },
  {
    id: 13,
    name: "Костюм лесной камуфляж",
    description:
      "Полный комплект камуфляжной одежды для маскировки в лесной местности. Включает куртку и штаны с множеством карманов.",
    image: "/image/Костюм лесной камуфляж.jpg",
    price: 4500,
    category: "Камуфляж",
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
    ],
  },
  {
    id: 14,
    name: "Кепка камуфляжная с козырьком",
    description:
      "Легкая кепка с камуфляжным рисунком для защиты от солнца и маскировки. Регулируемый размер для комфортной посадки.",
    image: "/image/Кепка камуфляжная с козырьком.jpg",
    price: 350,
    category: "Камуфляж",
    sizes: [{ size: "One Size", available: true }],
  },
  {
    id: 15,
    name: "Перчатки камуфляжные тактические",
    description:
      "Тонкие перчатки с камуфляжным узором для тактических операций. Обеспечивают хорошую тактильную чувствительность и защиту.",
    image: "/image/Перчатки камуфляжные тактические.jpg",
    price: 800,
    category: "Камуфляж",
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
    ],
  },
  {
    id: 16,
    name: "Маска хирургическая трехслойная",
    description:
      "Стерильная трехслойная маска для защиты от инфекций в медицинских учреждениях. Обеспечивает барьер для бактерий и вирусов.",
    image: "/image/Маска хирургическая трехслойная.jpg",
    price: 25,
    category: "Медицина",
    sizes: [{ size: "One Size", available: true }],
  },
  {
    id: 17,
    name: "Термометр электронный бесконтактный",
    description:
      "Современный термометр для бесконтактного измерения температуры тела. Быстрый и точный результат за секунды.",
    image: "/image/Термометр электронный бесконтактный.jpg",
    price: 1200,
    category: "Медицина",
    sizes: [{ size: "One Size", available: true }],
  },
  {
    id: 18,
    name: "Аптечка первой помощи",
    description:
      "Комплект первой медицинской помощи с перевязочными материалами, антисептиками и инструментами для оказания экстренной помощи.",
    image: "/image/Аптечка первой помощи.jpg",
    price: 1500,
    category: "Медицина",
    sizes: [{ size: "One Size", available: true }],
  },
  {
    id: 19,
    name: "Перчатки латексные медицинские",
    description:
      "Тонкие латексные перчатки для медицинских процедур. Обеспечивают защиту от инфекций и хорошую чувствительность пальцев.",
    image: "/image/Перчатки латексные медицинские.jpg",
    price: 150,
    category: "Перчатки",
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
    ],
  },
  {
    id: 20,
    name: "Перчатки кожаные рабочие",
    description:
      "Прочные кожаные перчатки для тяжелых работ. Защищают руки от порезов, ожогов и механических повреждений.",
    image: "/image/Перчатки кожаные рабочие.png",
    price: 750,
    category: "Перчатки",
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
    ],
  },
  {
    id: 21,
    name: "Перчатки нитриловые химически стойкие",
    description:
      "Нитриловые перчатки для работы с химическими веществами. Устойчивы к кислотам, щелочам и растворителям.",
    image: "/image/Перчатки нитриловые химически стойкие.png",
    price: 300,
    category: "Перчатки",
    sizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
    ],
  },
  {
    id: 22,
    name: "Набор инструментов универсальный",
    description:
      "Комплект основных инструментов для ремонта и обслуживания: отвертки, плоскогубцы, молоток и другие. В пластиковом кейсе.",
    image: "/image/Набор инструментов универсальный.jpg",
    price: 2500,
    category: "Хоз товары",
    sizes: [{ size: "One Size", available: true }],
  },
  {
    id: 23,
    name: "Шлифовальная машина угловая",
    description:
      "Мощная угловая шлифовальная машина для резки и шлифовки металла, камня и бетона. Оснащена защитным кожухом и дополнительными дисками.",
    image: "/image/Шлифовальная машина угловая.jpg",
    price: 4500,
    category: "Хоз товары",
    sizes: [{ size: "One Size", available: true }],
  },
  {
    id: 24,
    name: "Ведро пластиковое с ручкой",
    description:
      "Прочное пластиковое ведро объемом 10 литров для различных хозяйственных нужд. Устойчиво к ударам и химическим веществам.",
    image: "/image/Ведро пластиковое с ручкой.jpg",
    price: 200,
    category: "Хоз товары",
    sizes: [{ size: "One Size", available: true }],
  },
];

const CatalogPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const categoryParam = useMemo(
    () => searchParams.get("category"),
    [searchParams],
  );

  const [categoryFilter, setCategoryFilter] = useState(categoryParam || "");

  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(mockProducts.map((p) => p.category)),
    );
    return uniqueCategories;
  }, []);

  const filteredProducts = useMemo(() => {
    let products = mockProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-asc") {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      products = [...products].sort((a, b) => b.price - a.price);
    }

    return products;
  }, [search, categoryFilter, sortBy]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

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
          Каталог товаров
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          label="Поиск по названию"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{ minWidth: 200 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Категория</InputLabel>
          <Select
            value={categoryFilter}
            label="Категория"
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="">Все</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Сортировка</InputLabel>
          <Select
            value={sortBy}
            label="Сортировка"
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="">Без сортировки</MenuItem>
            <MenuItem value="price-asc">По возрастанию цены</MenuItem>
            <MenuItem value="price-desc">По убыванию цены</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredProducts.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            minHeight: "300px",
          }}
        >
          <Typography variant="h6">Товар не найден</Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 3,
              flex: 1,
            }}
          >
            {paginatedProducts.map((product) => (
              <Card
                key={product.id}
                sx={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  borderRadius: 3,
                  boxShadow: 2,
                  maxWidth: 350,
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 8,
                  },
                }}
              >
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ cursor: "pointer", objectFit: "contain" }}
                  />
                </Link>
                <CardContent
                  sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ cursor: "pointer" }}
                    >
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Box
                    sx={{
                      mt: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                      {product.price} руб.
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setModalProduct(product)}
                      sx={{ width: "100%" }}
                    >
                      Добавить в корзину
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
              />
            </Box>
          )}
        </>
      )}
      {modalProduct && (
        <SizeSelectorModal
          key={modalProduct.id}
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onAddToCart={(size) => {
            addToCart({
              id: modalProduct.id,
              name: modalProduct.name,
              price: modalProduct.price,
              size,
              image: modalProduct.image,
            });
            setModalProduct(null);
          }}
        />
      )}
    </Box>
  );
};

export default CatalogPage;
