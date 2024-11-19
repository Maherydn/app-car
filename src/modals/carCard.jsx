import React from "react";
import ReactDOM from "react-dom";

export const CarModal = ({ car, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-sm bg-gray-100 border border-gray-300 rounded-lg shadow-md shadow-gray-400 p-5 relative">
        <button
          className="absolute top-2 right-4 bg-white text-red-500 hover:bg-red-500 hover:text-white px-1.5 rounded-lg text-sm font-bold duration-200 border border-red-500 "
          onClick={onClose}
        >
          X
        </button>
        <h5 className="text-xl font-bold tracking-tight text-gray-900">
          {car.brand} {car.model}
        </h5>
        <p className="mt-2 text-sm text-gray-700">
          <span className="font-semibold">Année :</span> {car.year}
        </p>
        <p className="mt-2 text-sm text-gray-700">
          <span className="font-semibold">Numéro d'immatriculation :</span>{" "}
          {car.registration_number}
        </p>
        <p className="mt-2 text-sm text-gray-700">
          <span className="font-semibold">Status :</span>{" "}
          {car.available ? "Available" : "Not Available"}
        </p>
      </div>
    </div>,
    document.getElementById("modal-root") 
  );
};


  