// Измените URL для запроса
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Пожалуйста, заполните все поля");
    return;
  }

  if (!validateEmail(email)) {
    setError("Введите корректный email");
    return;
  }

  setLoading(true);
  try {
    // Измените URL на абсолютный путь
    const response = await axios.post(
      process.env.NODE_ENV === 'production' 
        ? '/api/auth/login' 
        : 'http://localhost:3000/api/auth/login',
      { email, password }
    );
    
    login(response.data.token, response.data.user);
    localStorage.setItem("justLoggedIn", "true");
    navigate("/");
  } catch (err) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || "Ошибка входа");
    } else {
      setError("Неизвестная ошибка");
    }
  } finally {
    setLoading(false);
  }
};
