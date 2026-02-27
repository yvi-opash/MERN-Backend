import { useState } from 'react';

export default function CarForm() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    fuel: 'Diesel',
    price: '',
    Publishdate: '',
  });
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('http://localhost:3000/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, image }),
    });
    
    const result = await res.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Brand"
        value={formData.brand}
        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
      />
      <input
        type="text"
        placeholder="Model"
        value={formData.model}
        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
      />
      <select
        value={formData.fuel}
        onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
      >
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="EV">EV</option>
      </select>
      <input
        type="text"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <input
        type="date"
        value={formData.Publishdate}
        onChange={(e) => setFormData({ ...formData, Publishdate: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Add Car</button>
    </form>
  );
}
