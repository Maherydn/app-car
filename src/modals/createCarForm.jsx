import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Input, Button, Select, Option } from "@material-tailwind/react";

const CreateCarForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    registration_number: "",
    mileage: "",
    fuel_type: "",
    transmission: "",
    available: false,
    carte_grise: "",
    visite_technique_date: "",
    visite_technique_file: null,
  });

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus(); // Set focus on the first input field
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Save the first file chosen
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the data to the parent
    setFormData({
      brand: "",
      model: "",
      year: "",
      registration_number: "",
      mileage: "",
      fuel_type: "",
      transmission: "",
      available: false,
      carte_grise: "",
      visite_technique_date: "",
      visite_technique_file: null,
    }); // Reset the form
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto max-h-[80vh] animate__animated animate__fadeIn animate__faster"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create a New Car
        </h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              ref={firstInputRef}
              color="indigo"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Registration Number"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Mileage (km)"
              name="mileage"
              type="number"
              value={formData.mileage}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div className="mb-4">
            <Select
              label="Fuel Type"
              name="fuel_type"
              value={formData.fuel_type}
              onChange={(value) => setFormData({ ...formData, fuel_type: value })}
              required
              color="indigo"
            >
              <Option value="diesel">Diesel</Option>
              <Option value="petrol">Petrol</Option>
              <Option value="electric">Electric</Option>
              <Option value="hybrid">Hybrid</Option>
            </Select>
          </div>

          <div className="mb-4">
            <Select
              label="Transmission"
              name="transmission"
              value={formData.transmission}
              onChange={(value) => setFormData({ ...formData, transmission: value })}
              required
              color="indigo"
            >
              <Option value="manual">Manual</Option>
              <Option value="automatic">Automatic</Option>
            </Select>
          </div>

          <div className="mb-4">
            <Input
              label="Carte Grise Number"
              name="carte_grise"
              value={formData.carte_grise}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Visite Technique Date"
              name="visite_technique_date"
              type="date"
              value={formData.visite_technique_date}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div className="mb-4">
            <input
              type="file"
              name="visite_technique_file"
              onChange={handleFileChange}
              accept="application/pdf"
              className="block w-full text-sm text-gray-700 py-2 px-3 border border-gray-300 rounded-md"
            />
            <p className="text-sm text-gray-500">Upload Visite Technique File (PDF)</p>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <input
              id="available"
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="available" className="text-sm text-gray-700">
              Available
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={onClose}
              color="gray"
              className="px-4 py-2 text-gray-500 rounded-md shadow-sm hover:bg-gray-400 hover:text-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="indigo"
              className="px-4 py-2 text-white rounded-md shadow-md hover:bg-indigo-800 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CreateCarForm;
