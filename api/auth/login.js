// api/auth/login.js - альтернативный вариант
module.exports = async (req, res) => {
  // Разрешаем CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Устанавливаем CORS для основного ответа
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ТЕСТ: Проверьте, что файл существует
  console.log('Current dir:', __dirname);
  
  const users = [
    {
      id: 1,
      email: "oplikov@gmail.com",
      password: "op12op77",
      name: "Антон Опилков",
      avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQEA..."
    },
    {
      id: 2,
      email: "qwe@gmail.com",
      password: "12332111",
      name: "qwe qwe",
      avatar: "https://pic.usm.photos/100/100?random=2"
    }
  ];

  const { email, password } = req.body;
  
  const user = users.find(u => 
    u.email === email && u.password === password
  );

  if (user) {
    const { password: _, ...userData } = user;
    return res.status(200).json({
      success: true,
      user: userData,
      token: 'test-token'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Неверные данные'
  });
};
