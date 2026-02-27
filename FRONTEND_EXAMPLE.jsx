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
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('brand', formData.brand);
    data.append('model', formData.model);
    data.append('fuel', formData.fuel);
    data.append('price', formData.price);
    data.append('Publishdate', formData.Publishdate);
    if (image) data.append('image', image);

    const res = await fetch('http://localhost:3000/api/cars', {
      method: 'POST',
      body: data,
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
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Add Car</button>
    </form>
  );
}
