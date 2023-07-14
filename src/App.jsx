import './App.scss';
import EnterSite from './pages/EnterSite/EnterSite.jsx';
import Main from './pages/Main/Main';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const authorizated = useSelector((state) => state.authorizationReducer.authorizated);
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizated) {
      navigate('/hotels');
    } else {
      navigate('/auth');
    }
  }, [authorizated]);

  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<EnterSite />} />
        <Route path="/hotels" element={<Main />} />
        <Route path="*" element={<EnterSite />} />
      </Routes>
    </div>
  );
}

export default App;
