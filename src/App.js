import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import AsteroidsPage from './components/AsteroidsPage/AsteroidsPage';
import DailyPicturePage from './components/DailyPicturePage/DailyPicturePage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<AsteroidsPage />}>
          <Route
            path='asteroids/:asteroidId'
            element={<AsteroidsPage />}
          />
        </Route>
        <Route
          path='/picture'
          element={<DailyPicturePage />} />
      </Routes>
    </Router>
  );
}

export default App;
