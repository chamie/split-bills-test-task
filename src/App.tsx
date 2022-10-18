import './App.css';
import { ContactList } from './features/contacts/ContactList';
import { BillsList } from './features/bills/BillsList';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Routes>
            <Route path="/:id" element={<BillsList />} />
            <Route path="/contacts" element={<ContactList />} />
          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;
