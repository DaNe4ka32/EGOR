// api/auth/register.js
const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '../../src/users.json');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  try {
    const { email, password, name } = req.body;

    // Валидация
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    // Читаем текущих пользователей
    const usersData = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);

    // Проверяем, есть ли уже такой email
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(409).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Создаем нового пользователя
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      email,
      password, // В реальном приложении хэшируйте пароль!
      name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };

    users.push(newUser);

    // Сохраняем в файл
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + Date.now()
    });

  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};