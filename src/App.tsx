// App.js
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BookContent from './components/BookContent';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookContent />} />
      </Routes>
    </Router>
  );
}

export default App;
