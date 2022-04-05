import { useState, useEffect } from 'react';
import ThemeContext from './context/theme-context';

import ApiService from './Api.service';

import Background from './components/Background';
import Header from './components/Header';
import Form from './components/Form';
import List from './components/List';

function App() {
  const [themeDark, setDarkTheme] = useState(true);
  const [comingData, setComingData] = useState([]);

  const toggleTheme = () => {
    setDarkTheme((prevState) => !prevState);
  };

  const themeValue = {
    themeDark,
  };

  useEffect(() => {
    getTodoHandler();
  }, []);

  const getTodoHandler = async () => {
    const todo = await ApiService.httpGet('.json');
    setComingData(todo);
  };

  const addTodoHandler = async (data) => {
    await ApiService.httpPost('.json', data);
    getTodoHandler();
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <Background>
        <Header onThemeChange={toggleTheme} />
        <Form onAdd={addTodoHandler} />
        <List content={comingData} onUpdating={getTodoHandler} />
      </Background>
    </ThemeContext.Provider>
  );
}

export default App;
