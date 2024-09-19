import React, { useState } from 'react';

interface BeerEntry {
  id: number;
  glassType: string;
  price: number;
  size: number;
  isOpen: boolean;
}

interface BeerTableProps {
  entries: BeerEntry[];
  searchTerm: string;
  onEdit: (id: number, updatedEntry: BeerEntry) => void;
  onDelete: (id: number) => void;
  onToggleOpen: (id: number) => void;
}

const BeerTable: React.FC<BeerTableProps> = ({ entries, searchTerm, onEdit, onDelete, onToggleOpen }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<BeerEntry | null>(null);

  const calculateCostPer100ml = (price: number, size: number) => {
    return ((price / size) * 100).toFixed(2);
  };

  const filteredEntries = entries.filter((entry) =>
    entry.glassType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (entry: BeerEntry) => {
    setEditingId(entry.id);
    setEditForm(entry);
  };

  const handleSaveEdit = () => {
    if (editForm) {
      onEdit(editForm.id, editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        [e.target.name]: e.target.name === 'glassType' ? e.target.value : Number(e.target.value),
      });
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Glass Type</th>
          <th>Price</th>
          <th>Cost per 100ml</th>
          <th>Size (ml)</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {filteredEntries.map((entry) => (
          <tr key={entry.id}>
            {editingId === entry.id ? (
              <>
                <td><input name="glassType" value={editForm?.glassType} onChange={handleInputChange} /></td>
                <td><input name="price" type="number" value={editForm?.price} onChange={handleInputChange} /></td>
                <td>{calculateCostPer100ml(editForm?.price || 0, editForm?.size || 1)}</td>
                <td><input name="size" type="number" value={editForm?.size} onChange={handleInputChange} /></td>
                <td>
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{entry.glassType}</td>
                <td>${entry.price.toFixed(2)}</td>
                <td>${calculateCostPer100ml(entry.price, entry.size)}</td>
                <td>{entry.size}</td>
                <td>
                  <button onClick={() => handleEdit(entry)}>Edit</button>
                  <button onClick={() => onDelete(entry.id)}>Delete</button>
                  <button onClick={() => onToggleOpen(entry.id)}>
                    {entry.isOpen ? 'Close' : 'Open'}
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BeerTable;