import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BeerTable from './components/BeerTable';
import Footer from './components/Footer';
import './App.css';

interface BeerEntry {
  id: number;
  glassType: string;
  price: number;
  size: number;
  isOpen: boolean;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState<BeerEntry[]>([
    { id: 1, glassType: 'Middy', price: 5, size: 285, isOpen: false },
    { id: 2, glassType: 'Schooner', price: 7, size: 425, isOpen: false },
    { id: 3, glassType: 'Pint', price: 9, size: 570, isOpen: false },
    { id: 4, glassType: 'Jug', price: 15, size: 1140, isOpen: false },
  ]);

  const handleEdit = (id: number, updatedEntry: BeerEntry) => {
    setEntries(entries.map(entry => entry.id === id ? updatedEntry : entry));
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleToggleOpen = (id: number) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, isOpen: !entry.isOpen } : entry
    ));
  };

  const handleAddEntry = () => {
    const newId = Math.max(...entries.map(e => e.id)) + 1;
    const newEntry: BeerEntry = { id: newId, glassType: 'New Glass', price: 0, size: 0, isOpen: false };
    setEntries([...entries, newEntry]);
  };

  const handleSave = () => {
    localStorage.setItem('beerEntries', JSON.stringify(entries));
    alert('Entries saved to local storage!');
  };

  return (
    <div className="App">
      <Header />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BeerTable 
        entries={entries}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleOpen={handleToggleOpen}
      />
      <Footer onAddEntry={handleAddEntry} onSave={handleSave} />
    </div>
  );
};

export default App;