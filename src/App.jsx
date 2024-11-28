import './App.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Main } from './components/layout/Main';
import { useState } from 'react';

function App() {
  const [activeComponent, setActiveComponent] = useState('timer');

  return (
    <>
      <Header setActiveComponent={setActiveComponent} />
      <Main activeComponent={activeComponent} />
      <Footer />
    </>
  );
}

export default App;
