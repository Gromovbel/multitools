import React, { useState, useEffect } from 'react';

// Конвертер валют
const Converter = () => {
  const [currencies, setCurrencies] = useState([]); // Массив всех валют
  const [fromCurrency, setFromCurrency] = useState('USD'); // Валюта исходная
  const [toCurrency, setToCurrency] = useState('EUR'); // Валюта, в которую конвертируем
  const [amount, setAmount] = useState(1); // Сумма для конвертации
  const [convertedAmount, setConvertedAmount] = useState(null); // Конвертированная сумма
  const [loading, setLoading] = useState(true); // Индикатор загрузки
  const [error, setError] = useState(null); // Ошибки

  const apiKey = '415bf1c5fd54503fa6a8cc96'; // Вставьте свой ключ API
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  // Загружаем валюты при монтировании компонента
  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.result === 'success') {
          const currencyList = Object.keys(data.conversion_rates); // Извлекаем список валют
          setCurrencies(currencyList); // Устанавливаем валюты
        } else {
          setError(data.error);
        }
      } catch (err) {
        console.error('Ошибка запроса:', err);
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []); // Загружаем валюты только при монтировании компонента

  // Функция для конвертации валют
  const convertCurrency = async (amount) => {
    setLoading(true);
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
      const data = await response.json();

      if (data.result === 'success') {
        const conversionRate = data.conversion_rates[toCurrency];
        setConvertedAmount((amount * conversionRate).toFixed(2)); // Конвертируем
      } else {
        setError('Ошибка при конвертации');
      }
    } catch (err) {
      console.error('Ошибка при конвертации:', err);
      setError('Ошибка при конвертации');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currencies.length > 0) {
      convertCurrency(amount); // Конвертация при изменении валют
    }
  }, [fromCurrency, toCurrency, amount, currencies]); // Зависимости для перезапуска конвертации

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Добавим проверку, что валюты загружены
  const renderCurrencyOptions = () => {
    if (loading) {
      return <option value="">Загружаем валюты...</option>;
    }
    if (error) {
      return <option value="">Ошибка загрузки валют</option>;
    }
    if (currencies.length === 0) {
      return <option value="">Нет доступных валют</option>;
    }

    return currencies.map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));
  };

  return (
    <div className="converter">
      <h1>Конвертер валют</h1>
      <div>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Введите сумму"
        />
        <div>
          <label>Из какой валюты:</label>
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {renderCurrencyOptions()}
          </select>
        </div>

        <div>
          <label>В какую валюту:</label>
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            {renderCurrencyOptions()}
          </select>
        </div>

        {loading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p>Ошибка: {error}</p>
        ) : (
          <div>
            <h2>
              Результат: {convertedAmount} {toCurrency}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export { Converter };
