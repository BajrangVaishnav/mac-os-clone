import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  lazy,
  Suspense,
} from 'react';

// import Header from './component/Header'
import {
  Route,
  Routes,
} from 'react-router-dom';

const Desktop = lazy(() => import('./component/Desktop'));
const Loader = lazy(() => import('./component/Loader'));

function App() {



  return (

    <>
      {/* <Desktop /> */}
    <Suspense fallback={<Loader height="100dvh" background="#fff" imgUrl="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=" />}>
      <Routes>
        <Route element={<Desktop/>} path='/os' />
      </Routes>
    </Suspense>
    </>
  )
}

export default App
