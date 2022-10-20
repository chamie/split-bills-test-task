import './App.css';
import { ContactList } from './features/contacts/ContactList';
import { BillsList } from './features/bills/BillsList';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { setBills } from './features/bills/billsSlice';
import { loadBills, loadContacts } from './services/storageService';
import { setContacts } from './features/contacts/contactsSlice';
import { ExportImport } from './features/exportImport/ExportImport';

function App() {
  const dispatch = useAppDispatch();
  useEffect(()=> window.addEventListener('storage', (event)=> {
    if(event.key === 'bills') {
      dispatch(setBills(loadBills()));
    } else {
      dispatch(setContacts(loadContacts()));
    }
  }), [dispatch]);

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <div className="header-links">
            <Link to="/">Bills</Link>
            <Link to="/contacts">Contacts</Link>
            <Link to="/export-import">Export/Import</Link>
          </div>
        </header>
        <Routes>
          <Route path="/:id" element={<BillsList />} />
          <Route path="/" element={<BillsList />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/export-import" element={<ExportImport />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
