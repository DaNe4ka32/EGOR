// api/auth/login.js
const users = require('../../src/users.json');

module.exports = async (req, res) => {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Для предварительных запросов
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  try {
    const { email, password } = req.body;

    // Валидация
    if (!email || !password) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    // Ищем пользователя
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // Возвращаем данные пользователя (без пароля!)
    const { password: _, ...userWithoutPassword } = user;
    
    // Можно сгенерировать JWT токен, но для простоты вернем пользователя
    res.status(200).json({
      success: true,
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + Date.now() // Замените на реальный JWT
    });

  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};