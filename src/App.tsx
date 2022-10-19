import './App.css';
import { ContactList } from './features/contacts/ContactList';
import { BillsList } from './features/bills/BillsList';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <div className="header-links">
            <Link to="/">Bills</Link>
            <Link to="/contacts">Contacts</Link>
          </div>
        </header>
        <Routes>
          <Route path="/:id" element={<BillsList />} />
          <Route path="/" element={<BillsList />} />
          <Route path="/contacts" element={<ContactList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
