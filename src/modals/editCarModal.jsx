import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  Input,
  Button,
} from "@material-tailwind/react"; // Importation des composants Material Tailwind

const EditCarForm = ({ car, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    brand: car.brand || "",
    model: car.model || "",
    year: car.year || "",
    registration_number: car.registration_number || "",
    available: car.available || false,
  });

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();  // Mettre le focus sur le premier champ input
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); 
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg animate__animated animate__fadeIn animate__faster"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique à l'intérieur du modal
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Modifier les informations de la voiture
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Input
              label="Marque"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              ref={firstInputRef}
              color="indigo" // Définir la couleur comme indigo pour se rapprocher du style Material
            />
          </div>

          <div>
            <Input
              label="Modèle"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div>
            <Input
              label="Année"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div>
            <Input
              label="Numéro d'immatriculation"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              id="available"
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="available" className="text-sm text-gray-700">
              Disponible
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={onClose}
              color="gray"
              className="px-4 py-2 text-gray-500 rounded-md shadow-sm hover:bg-gray-400 hover:text-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              color="indigo"
              className="px-4 py-2 text-white rounded-md shadow-md hover:bg-indigo-800  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default EditCarForm;
