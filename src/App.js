import './App.css';
import Header from './component/Header';
import { Outlet } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDataProduct } from './redux/productSlide';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    (async() => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/products`)
      const resData = await res.json()
      dispatch(setDataProduct(resData))
    })()
  }, [])

  return (
    <>
      <Toaster/>
      <div>
        <Header/>
        <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
          <Outlet/>
        </main>
      </div>
    </>
  );
}

export default App;
