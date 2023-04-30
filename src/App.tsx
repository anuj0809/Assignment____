import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TradeScreen from './pages/TradeScreen/TradeScreen';
import NotFound from './pages/NotFoundScreen/NotFound';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<TradeScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;