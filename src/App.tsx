import { useState } from 'react';
import Header from './components/Header/Header';
import './App.css';
import data from '../public/productData.json';
import Table from './components/Table/Table';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <BrowserRouter>
        <Header setSearchValue={setSearchValue} />
        <Routes>
          <Route path='/' element={<Table searchValue={searchValue} data={data.products} />} />
          <Route path='/pages' element={<Table searchValue={searchValue} data={data.Pages} />} />
          <Route path='/price-plans' element={<Table searchValue={searchValue} data={data['Price plans']} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
