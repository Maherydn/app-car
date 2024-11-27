import React, { useState } from "react";
import { TruckIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Select, Option, Button } from "@material-tailwind/react";
import EditMaintenanceForm from "@/modals/editMaintenanceForm";
import CreateMaintenanceForm from "@/modals/createMaintenanceForm";
import EditCarForm from "@/modals/editCarModal";
import { PlusIcon } from "@heroicons/react/24/solid";
import DataTable from "react-data-table-component";

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

  const car = { ...carTableData };

  const maintenanceData = [
    { maintenance_id: 1, car: "Toyota", maintenance_type: "Oil Change", maintenance_date: "2024-11-10", comments: "Routine oil change" },
    { maintenance_id: 2, car: "Toyota", maintenance_type: "Tire Replacement", maintenance_date: "2024-11-15", comments: "Replaced all four tires" },
    { maintenance_id: 3, car: "Honda", maintenance_type: "Brake Inspection", maintenance_date: "2024-11-20", comments: "Brake pads checked and cleaned" },
    { maintenance_id: 4, car: "Ford", maintenance_type: "Battery Replacement", maintenance_date: "2024-11-22", comments: "Replaced with a new battery" },
    { maintenance_id: 5, car: "Nissan", maintenance_type: "Alignment", maintenance_date: "2024-11-25", comments: "Wheel alignment done" },
  ];

  const [createMaintenanceForm, setCreatetMaintenanceForm] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editMaintenanceForm, setEditMaintenanceForm] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  const updateMaintenance = (data) => {
    console.log("Updated maintenance data:", data);
  };

  const updateCar = (data) => {
    console.log("Updated car data:", data);
  };

  const columns = [
    {
      name: "Type",
      selector: (row) => row.maintenance_type,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.maintenance_date,
      sortable: true,
    },
    {
      name: "Comments",
      selector: (row) => row.comments,
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          onClick={() => {
            setEditMaintenanceForm(true);
            setSelectedMaintenance(row);
          }}
          className="p-2 bg-teal-500 text-white rounded"
        >
          Modifier
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <header className="mb-8 relative">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <TruckIcon className="h-6 w-6 text-blue-500" />
          {car.brand} {car.model} ({car.year})
        </h1>
        <p className="text-sm text-gray-500">Registration: {car.registration_number}</p>
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
        <div className="w-72 mx-auto md:mx-0">
          <Select label="Choisissez une option">
            <Option value="assurance">Entretiens</Option>
            <Option value="reparation">Assurances</Option>
          </Select>
        </div>

        <div className="mt-4">
          <DataTable columns={columns} data={maintenanceData} pagination />
        </div>

        {editMaintenanceForm && selectedMaintenance && (
          <EditMaintenanceForm
            isOpen={editMaintenanceForm}
            onClose={() => setEditMaintenanceForm(false)}
            onSubmit={updateMaintenance}
            maintenance={selectedMaintenance}
          />
        )}
      </section>

      {/* Create Maintenance */}
      <div className="flex justify-center items-center mt-4">
        <Button
          onClick={() => setCreatetMaintenanceForm(true)}
          className="mt-4 py-2 px-4 w-auto flex items-center justify-center bg-green-500 text-white font-medium text-sm rounded-full shadow hover:bg-green-600 transition gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add Maintenance
        </Button>
        {createMaintenanceForm && (
          <CreateMaintenanceForm
            isOpen={createMaintenanceForm}
            onClose={() => setCreatetMaintenanceForm(false)}
            onSubmit={updateMaintenance}
          />
        )}
      </div>

      {/* Footer Edit Button */}
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
