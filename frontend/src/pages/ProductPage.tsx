import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import type { Product, Comment } from "../types/product";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Куртка строительная утепленная",
    description:
      "Теплая куртка с водонепроницаемым покрытием для работы в холодных условиях на строительных площадках. Обеспечивает защиту от ветра и осадков.",
    fullDescription:
      "Высококачественная утепленная куртка для строителей, изготовленная из прочного материала с водонепроницаемым покрытием. Обеспечивает защиту от холода, ветра и влаги. Идеально подходит для работы на открытом воздухе в холодное время года. Доступна в размерах S, M, L, XL.",
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
    fullDescription:
      "Удобный рабочий комбинезон с множеством карманов для инструментов и материалов. Изготовлен из прочной ткани, устойчивой к истиранию и загрязнениям. Обеспечивает комфорт и функциональность при выполнении различных работ. Доступен в размерах M, L, XL.",
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
    fullDescription:
      "Легкая и дышащая футболка с длинным рукавом для работы в теплую погоду. Изготовлена из качественного хлопка, обеспечивает комфорт и защиту кожи от солнечных ожогов и мелких травм. Идеально подходит для летних работ на открытом воздухе. Доступна в размерах S, M, L, XL.",
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
    fullDescription:
      "Крепкие ботинки из натуральной кожи с металлическим носком для защиты пальцев ног от ударов и падений тяжелых предметов. Подходят для строительных и промышленных работ. Обеспечивают комфорт и безопасность в течение всего рабочего дня. Доступны в размерах 39-44.",
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
    fullDescription:
      "Высокие резиновые сапоги для работы в условиях повышенной влажности и грязи. Обеспечивают полную защиту ног от воды и химических веществ. Легкие и удобные, с антискользящей подошвой. Идеально подходят для сельскохозяйственных и строительных работ. Доступны в размерах 36-43.",
    image: "/image/Сапоги резиновые непромокаемые.jpg",
    price: 120,
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
    fullDescription:
      "Специальные кроссовки с антистатическим покрытием для работы в помещениях с электрооборудованием. Предотвращают накопление статического электричества и снижают риск пожара. Комфортные и дышащие, с амортизирующей подошвой. Доступны в размерах 38-44.",
    image: "/image/Кроссовки антистатические.jpg",
    price: 180,
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
    fullDescription:
      "Легкий и прочный шлем для защиты головы от ударов и падений. Оснащен регулируемым подбородочным ремнем для надежной фиксации. Внутренняя подкладка обеспечивает комфорт при длительном ношении. Соответствует стандартам безопасности.",
    image: "/image/Шлем защитный с подбородочным ремнем.jpg",
    price: 95,
    category: "СИЗ",
    sizes: [{ size: "One Size", available: true }],
  },
  {
    id: 8,
    name: "Очки защитные с боковой защитой",
    description:
      "Прозрачные очки с полной боковой защитой для предотвращения попадания инородных частиц в глаза. Устойчивы к царапинам и запотеванию.",
    fullDescription:
      "Прозрачные очки с полной боковой защитой для предотвращения попадания инородных частиц в глаза. Устойчивы к царапинам и запотеванию. Легкая рамка обеспечивает комфорт при длительном ношении. Идеально подходят для строительных и промышленных работ.",
    image: "/image/Очки защитные с боковой защитой.jpg",
    price: 35,
    category: "СИЗ",
    sizes: [{ size: "One Size", available: true }],
  },
  {
    id: 9,
    name: "Респиратор с клапаном выдоха",
    description:
      "Многоразовый респиратор для защиты органов дыхания от пыли, аэрозолей и вредных веществ. Оснащен клапаном для облегчения выдоха.",
    fullDescription:
      "Многоразовый респиратор для защиты органов дыхания от пыли, аэрозолей и вредных веществ. Оснащен клапаном для облегчения выдоха и снижения сопротивления. Фильтры можно заменять. Соответствует стандартам защиты органов дыхания.",
    image: "/image/Респиратор с клапаном выдоха.jpg",
    price: 125,
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
    fullDescription:
      "Яркий жилет с светоотражающими элементами для обеспечения видимости в условиях низкой освещенности. Обязателен для работы на дорогах и в условиях плохой видимости. Изготовлен из легкого и прочного материала. Доступен в размерах S, M, L, XL.",
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
    fullDescription:
      "Защитный нагрудник из прочного пластика для предотвращения травм грудной клетки при ударах и падениях тяжелых предметов. Оснащен регулируемыми ремнями для надежной фиксации. Легкий и удобный в ношении. Доступен в размерах S, M, L, XL.",
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
    fullDescription:
      "Мягкие наколенники с гелевыми вставками для защиты коленей при работе в положении на коленях. Обеспечивают комфорт и защиту от травм. Регулируемые ремни позволяют подогнать под любую ногу. Доступны в размерах S, M, L.",
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
    fullDescription:
      "Полный комплект камуфляжной одежды для маскировки в лесной местности. Включает куртку и штаны с множеством карманов для снаряжения. Изготовлен из качественной ткани с камуфляжным рисунком. Обеспечивает эффективную маскировку в лесу. Доступен в размерах S, M, L, XL.",
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
      "Легкая кепка с камуфляжным узором для защиты от солнца и маскировки. Регулируемый размер для комфортной посадки.",
    fullDescription:
      "Легкая кепка с камуфляжным узором для защиты от солнца и маскировки. Регулируемый размер для комфортной посадки на голове. Изготовлена из дышащей ткани. Идеально подходит для тактических операций и охоты.",
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
    fullDescription:
      "Тонкие перчатки с камуфляжным узором для тактических операций. Обеспечивают хорошую тактильную чувствительность и защиту от мелких травм. Изготовлены из качественного материала с антискользящим покрытием. Доступны в размерах S, M, L.",
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
    fullDescription:
      "Стерильная трехслойная маска для защиты от инфекций в медицинских учреждениях. Обеспечивает барьер для бактерий и вирусов. Изготовлена из нетканого материала с высоким уровнем фильтрации. Удобные резинки для фиксации.",
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
    fullDescription:
      "Современный термометр для бесконтактного измерения температуры тела. Быстрый и точный результат за секунды. Оснащен большим дисплеем и памятью последних измерений. Идеально подходит для медицинских учреждений и домашнего использования.",
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
    fullDescription:
      "Комплект первой медицинской помощи с перевязочными материалами, антисептиками и инструментами для оказания экстренной помощи. Включает бинты, пластыри, жгуты и лекарства. Компактный и прочный кейс для хранения.",
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
    fullDescription:
      "Тонкие латексные перчатки для медицинских процедур. Обеспечивают защиту от инфекций и хорошую чувствительность пальцев. Порошковые для легкого надевания. Соответствуют медицинским стандартам. Доступны в размерах S, M, L.",
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
    fullDescription:
      "Прочные кожаные перчатки для тяжелых работ. Защищают руки от порезов, ожогов и механических повреждений. Усиленные пальцы и ладонь. Обеспечивают хорошую хватку и комфорт. Доступны в размерах S, M, L, XL.",
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
    fullDescription:
      "Нитриловые перчатки для работы с химическими веществами. Устойчивы к кислотам, щелочам и растворителям. Без латекса, подходят для аллергиков. Обеспечивают надежную защиту и чувствительность. Доступны в размерах S, M, L.",
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
    fullDescription:
      "Комплект основных инструментов для ремонта и обслуживания: отвертки разных размеров, плоскогубцы, молоток, пассатижи и другие. Все в пластиковом кейсе для удобного хранения и транспортировки. Качественные инструменты для домашнего и профессионального использования.",
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
    fullDescription:
      "Мощная угловая шлифовальная машина для резки и шлифовки металла, камня и бетона. Оснащена защитным кожухом и дополнительными дисками. Высокая мощность и скорость вращения для эффективной работы. Идеально подходит для строительных и ремонтных работ.",
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
    fullDescription:
      "Прочное пластиковое ведро объемом 10 литров для различных хозяйственных нужд. Устойчиво к ударам и химическим веществам. Оснащено удобной ручкой для переноски. Подходит для строительства, уборки и других работ.",
    image: "/image/Ведро пластиковое с ручкой.jpg",
    price: 200,
    category: "Хоз товары",
    sizes: [{ size: "One Size", available: true }],
  },
];

import SizeSelectorModal from "../components/SizeSelectorModal";

const ProductPage: React.FC = () => {
  console.log("ProductPage rendered");
  const { id } = useParams<{ id: string }>();
  console.log("ProductPage: id from params:", id);
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const productId = parseInt(id || "0");
  console.log("ProductPage: parsed productId:", productId);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showSizeModal, setShowSizeModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/${productId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [productId]);
  const product = mockProducts.find((p) => p.id === productId);
  console.log("ProductPage: found product:", product);

  if (!product) {
    return (
      <Box sx={{ mt: 4, mb: 4, width: "100%", px: 2 }}>
        <Typography variant="h4">Товар не найден</Typography>
      </Box>
    );
  }

  const handleAddToCart = (size: string) => {
    console.log("ProductPage: handleAddToCart called with size:", size);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      image: product.image,
    });
    setShowSizeModal(false);
  };

  const handleAddComment = async () => {
    if (newComment.trim() && user) {
      try {
        const response = await axios.post("/api/comments", {
          productId,
          user: user.name || user.email,
          text: newComment.trim(),
        });
        setComments([...comments, response.data]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const similarProducts = mockProducts.filter(
    (p) => p.category === product.category && p.id !== product.id,
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
          {product.name}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 4, mb: 4, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1, minWidth: "300px" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          {product.fullDescription && (
            <Typography variant="body2" paragraph sx={{ mb: 2 }}>
              {product.fullDescription}
            </Typography>
          )}
          <Typography variant="h6" color="primary" gutterBottom>
            Цена: {product.price} руб.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Размерная сетка:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
            {product.sizes.map((size) => (
              <Button
                key={size.size}
                variant={size.available ? "outlined" : "contained"}
                disabled={!size.available}
                color={size.available ? "primary" : "secondary"}
                sx={{ cursor: "default" }}
              >
                {size.size}
              </Button>
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            disabled={!product.sizes.some((s) => s.available)}
            onClick={() => setShowSizeModal(true)}
            sx={{ mb: 2 }}
          >
            Добавить в корзину
          </Button>
        </Box>
      </Box>

      {similarProducts.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Похожие товары
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 3,
            }}
          >
            {similarProducts.map((similarProduct) => (
              <Link
                key={similarProduct.id}
                to={`/product/${similarProduct.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    borderRadius: 3,
                    boxShadow: 2,
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={similarProduct.image}
                    alt={similarProduct.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {similarProduct.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {similarProduct.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {similarProduct.price} руб.
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Box>
        </Box>
      )}

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Отзывы
        </Typography>
        {comments.map((comment) => (
          <Card key={comment.id} sx={{ mb: 2, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" color="primary">
                {comment.user}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {comment.date}
              </Typography>
              <Typography variant="body1">{comment.text}</Typography>
            </CardContent>
          </Card>
        ))}
        {isAuthenticated && (
          <Box sx={{ mt: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Ваш отзыв"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              Добавить отзыв
            </Button>
          </Box>
        )}
      </Box>

      {showSizeModal && (
        <SizeSelectorModal
          product={product}
          onClose={() => setShowSizeModal(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </Box>
  );
};

export default ProductPage;
