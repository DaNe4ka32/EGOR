# Техническая спецификация веб-приложения "САВ-сервис"

## Обзор

Веб-приложение для покупки спецодежды с функциональностью каталога, корзины, оформления заказов и аутентификации пользователей.

## Стек технологий

- **Frontend**: React.js с TypeScript, Redux Toolkit для управления состоянием, Axios для HTTP запросов, Material-UI для компонентов UI.
- **Backend**: Node.js с Express.js и TypeScript, JWT для аутентификации.
- **Database**: PostgreSQL для хранения данных о товарах, пользователях, заказах.
- **Дополнительно**: Docker для контейнеризации, Git для контроля версий.

## Архитектура приложения

Приложение построено по архитектуре клиент-сервер с разделением на фронтенд и бэкенд.

### Диаграмма архитектуры

```mermaid
graph TD
    A[Пользователь] --> B[Frontend React SPA]
    B --> C[Backend API Express]
    C --> D[PostgreSQL Database]
    C --> E[Authentication JWT]
```

## Структура компонентов фронтенда

- **Страницы**:
  - HomePage (Главная)
  - CatalogPage (Каталог)
  - ProductPage (Страница товара)
  - CartPage (Корзина)
  - CheckoutPage (Оформление заказа)
  - LoginPage (Вход)
  - RegisterPage (Регистрация)
- **Общие компоненты**:
  - Header (Навигация)
  - Footer
  - ProductCard
  - SizeGrid (Размерная сетка)
  - ReviewForm (Форма отзыва)
- **Хуки и утилиты**:
  - useAuth (для аутентификации)
  - useCart (для корзины)

## API Спецификация

### Endpoints

- **GET /api/products** - Получить список товаров
- **GET /api/products/:id** - Получить товар по ID
- **POST /api/auth/login** - Вход пользователя
- **POST /api/auth/register** - Регистрация пользователя
- **GET /api/cart** - Получить корзину (требует аутентификации)
- **POST /api/cart** - Добавить товар в корзину
- **DELETE /api/cart/:id** - Удалить товар из корзины
- **POST /api/orders** - Создать заказ
- **GET /api/orders** - Получить заказы пользователя

### Структура данных

- **Product**: { id, name, description, image, sizes: [{ size, available }], price }
- **User**: { id, email, password, role }
- **CartItem**: { productId, quantity, size }
- **Order**: { id, userId, items: [CartItem], total, status }

## Диаграмма компонентов

```mermaid
graph TD
    A[App] --> B[Router]
    B --> C[HomePage]
    B --> D[CatalogPage]
    B --> E[ProductPage]
    B --> F[CartPage]
    B --> G[CheckoutPage]
    B --> H[LoginPage]
    B --> I[RegisterPage]
    C --> J[Header]
    D --> J
    E --> J
    F --> J
    G --> J
    H --> J
    I --> J
    J --> K[Footer]
```

## Безопасность

- Аутентификация через JWT токены.
- Защищенные маршруты для авторизованных пользователей.
- Валидация данных на фронтенде и бэкенде.

## Компонент SizeSelectorModal

### Описание

Модальное окно для выбора размера товара перед добавлением в корзину. Открывается при нажатии "Добавить в корзину" в каталоге, если товар имеет несколько доступных размеров.

### Интерфейс Props

```typescript
interface SizeSelectorModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (size: string) => void;
}
```

### Состояние компонента

```typescript
const [selectedSize, setSelectedSize] = useState<string | null>(null);
```

### UI Элементы

- **Dialog**: Модальное окно с Material-UI Dialog
- **DialogTitle**: Заголовок "Выберите размер"
- **DialogContent**: Содержимое с сеткой кнопок размеров
- **Grid**: Сетка кнопок для размеров (используем Grid из MUI)
- **Button**: Кнопки размеров (только для available: true)
- **DialogActions**: Кнопки "Добавить" и "Отмена"
  - "Добавить" - disabled если selectedSize === null
  - "Отмена" - закрывает модальное окно

### Поведение

- Показывать только размеры с available: true
- При выборе размера устанавливать selectedSize
- При нажатии "Добавить" вызывать onAddToCart(selectedSize) и закрывать модальное окно
- При нажатии "Отмена" закрывать модальное окно без действий

### Стилизация

- Соответствует стилю приложения: Material-UI компоненты
- Градиенты как в CatalogPage (linear-gradient(135deg, #1976d2 0%, #388e3c 100%))
- Кнопки размеров: variant="outlined", цвет primary
- Выбранный размер: variant="contained"

### Интеграция в CatalogPage

- Добавить состояние для модального окна: `const [modalProduct, setModalProduct] = useState<Product | null>(null);`
- Изменить обработчик кнопки "Добавить в корзину":
  - Если sizes.length === 1 и available: true, добавить напрямую
  - Иначе, открыть модальное окно: `setModalProduct(product);`
- Добавить компонент SizeSelectorModal в рендер
- Обработчики:
  - onClose: `() => setModalProduct(null)`
  - onAddToCart: `(size) => { addToCart({...}); setModalProduct(null); }`

## Будущие расширения

- Профиль пользователя
- Админская панель для управления товарами и заказами
