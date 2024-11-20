import React, { useState } from "react";
import { TruckIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"; // Importation de Link pour la navigation
import { PlusIcon } from "@heroicons/react/24/solid";
import EditMaintenanceForm from "@/modals/editMaintenanceForm";
import { Button } from "@material-tailwind/react";
import CreateMaintenanceForm from "@/modals/createMaintenanceForm";
import EditCarForm from "@/modals/editCarModal";


export default function CarDetailsPage() {

  const carTableData = {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    registration_number: "AB123CD",
    available: true,
    mileage: 25000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    carte_grise: "123456789",
    visite_technique_date: "2024-10-01",
    visite_technique_file: "visite_technique.pdf",
  };
  
  const car = {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    registration_number: "AB123CD",
    available: true,
    mileage: 25000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    carte_grise: "123456789",
    visite_technique_date: "2024-10-01",
    visite_technique_file: "visite_technique.pdf",
  };
  
  const maintenanceData = [
    {
      maintenance_id: 1,
      car_id: 2,
      garage_id: 1,
      car: "Toyota",
      maintenance_type: "Oil Change",
      maintenance_date: "2024-11-10",
      comments: "Routine oil change",
    },
    {
      maintenance_id: 2,
      car_id: 2,
      car: "Toyota",
      garage_id: 1,
      maintenance_type: "Tire Replacement",
      maintenance_date: "2024-11-15",
      comments: "Replaced all four tires",
    },
  ];

  const [createMaintenanceForm, setCreatetMaintenanceForm] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const createMaintenance = (data) => {
    console.log("Updated maintenance data:", data);
  };

  const updateCar = (data) => {
    console.log("Updated maintenance data:", data);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <header className="mb-8 relative">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <TruckIcon className="h-6 w-6 text-blue-500" />
          {car.brand} {car.model} ({car.year})
        </h1>
        <p className="text-sm text-gray-500">Registration: {car.registration_number}</p>

        {/* Back to Tables Button */}
        <Link to="/dashboard/tables">
          <button className="absolute -bottom-2 right-0 mt-2  mr-4 py-1 px-3 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-lg flex items-center gap-1">
            <TruckIcon className="h-4 w-4" />
            Back
          </button>
        </Link>
      </header>

      {/* Car Status */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Car Details</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <p>
              <span className="font-medium">Mileage:</span> {car.mileage} km
            </p>
            <p>
              <span className="font-medium">Fuel Type:</span> {car.fuel_type}
            </p>
            <p>
              <span className="font-medium">Transmission:</span> {car.transmission}
            </p>
            <p>
              <span className={`font-medium ${car.available ? "text-green-600" : "text-red-600"}`}>
                Status:
              </span>{" "}
              {car.available ? "Available" : "Unavailable"}
            </p>
          </div>
        </div>
      </section>

      {/* Maintenance Section */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Maintenance History</h2>
        <div className="bg-white shadow rounded-lg">

        {maintenanceData.map((maintenance, index) => {

            const [editMaintenanceForm, setEditMaintenanceForm] = useState(false);

            const updateMaintenance = (data) => {
              console.log("Updated maintenance data:", data);
            };

            return (
            <div
              key={maintenance.maintenance_id}
              className={`p-4 border-b ${index === maintenanceData.length - 1 ? "border-none" : "border-gray-200"}`}
            >
              <p className="font-medium text-gray-800">{maintenance.maintenance_type}</p>
              <p className="text-sm text-gray-600">Date: {maintenance.maintenance_date}</p>
              <p className="text-sm text-gray-600">Comments: {maintenance.comments}</p>

              <Button
                onClick={() => setEditMaintenanceForm(true)}
                className="mt-2 p-2 bg-teal-500 text-white rounded"
              >
                Modifier
              </Button>
              {editMaintenanceForm && (
                <EditMaintenanceForm
                  maintenance={maintenance}
                  isOpen={editMaintenanceForm}
                  onClose={() => setEditMaintenanceForm(false)}
                  onSubmit={updateMaintenance}
                />
              )}
            </div>

            )})}
        </div>
        <div
          className="flex justify-center items-center"
        >
          <Button
            onClick={() => setCreatetMaintenanceForm(true)}
            className="mt-4 py-2 px-2 w-auto flex items-center justify-center bg-green-500 text-white font-medium text-sm rounded-lg shadow hover:bg-green-600 transition gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Maintenance
          </Button>

          {createMaintenanceForm && (
                <CreateMaintenanceForm
                  isOpen={createMaintenanceForm}
                  onClose={() => setCreatetMaintenanceForm(false)}
                  onSubmit={createMaintenance}
                />
              )}
        </div>
      </section>

      {/* Administrative Section */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Administrative Documents</h2>
        <div className="bg-white shadow rounded-lg p-4 space-y-4">
          {/* Carte Grise */}
          <div className="flex justify-between items-center">
            <p className="flex items-center text-sm text-gray-600">
              Registration Certificate: {car.carte_grise}
            </p>
            <a
              href={`/files/${car.carte_grise}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              View File
            </a>
          </div>

          {/* Visite Technique */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Technical Inspection Date: {car.visite_technique_date}
            </p>
            <a
              href={`/files/${car.visite_technique_file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              View File
            </a>
          </div>
        </div>
      </section>

      {/* Edit Button */}
      <footer className="mt-8">
        <Button 
          className="w-full py-2 flex items-center justify-center bg-blue-500 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-600 transition gap-2"
          onClick={() => setIsEditModalOpen(true)}
        >
          <PencilIcon className="h-5 w-5" />
          Edit Car Details
        </Button>

        {isEditModalOpen && (
          <EditCarForm
            car={carTableData}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={updateCar}
          />
        )}
      </footer>
    </div>
  );
}
