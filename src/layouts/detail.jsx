import React, { useState } from "react";
import { TruckIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
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
    { maintenance_id: 6, car: "Toyota", maintenance_type: "Engine Check", maintenance_date: "2024-12-01", comments: "Engine performance optimized" },
    { maintenance_id: 7, car: "Honda", maintenance_type: "Air Filter Replacement", maintenance_date: "2024-12-05", comments: "Air filter replaced for better efficiency" },
    { maintenance_id: 8, car: "Ford", maintenance_type: "Coolant Flush", maintenance_date: "2024-12-10", comments: "Coolant system flushed and refilled" },
    { maintenance_id: 9, car: "Nissan", maintenance_type: "Transmission Service", maintenance_date: "2024-12-15", comments: "Transmission oil replaced" },
    { maintenance_id: 10, car: "Toyota", maintenance_type: "Suspension Repair", maintenance_date: "2024-12-20", comments: "Suspension components adjusted and repaired" },
    { maintenance_id: 11, car: "Honda", maintenance_type: "Spark Plug Replacement", maintenance_date: "2024-12-22", comments: "Spark plugs replaced for smooth ignition" },
    { maintenance_id: 12, car: "Ford", maintenance_type: "Exhaust Inspection", maintenance_date: "2024-12-25", comments: "Exhaust system checked for leaks" },
    { maintenance_id: 13, car: "Nissan", maintenance_type: "Steering Adjustment", maintenance_date: "2024-12-28", comments: "Steering alignment adjusted" },
    { maintenance_id: 14, car: "Toyota", maintenance_type: "Timing Belt Replacement", maintenance_date: "2025-01-01", comments: "Timing belt replaced to prevent engine damage" },
    { maintenance_id: 15, car: "Honda", maintenance_type: "Fuel System Cleaning", maintenance_date: "2025-01-05", comments: "Fuel injectors cleaned for better performance" },
];


  const [search, setSearch] = useState(""); // État pour le champ de recherche
  const [filteredData, setFilteredData] = useState(maintenanceData); // Données filtrées
  const [createMaintenanceForm, setCreatetMaintenanceForm] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMaintenanceForm, setEditMaintenanceForm] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  const updateMaintenance = (data) => {
    console.log("Updated maintenance data:", data);
  };

  const updateCar = (data) => {
    console.log("Updated car data:", data);
  };

  // Filtrer les données en fonction de la recherche
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = maintenanceData.filter(
      (item) =>
        item.maintenance_type.toLowerCase().includes(query) ||
        item.comments.toLowerCase().includes(query) ||
        item.maintenance_date.includes(query)
    );

    setFilteredData(filtered);
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
          <button className="absolute -bottom-2 right-0 mt-2 mr-4 py-1 px-3 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-lg flex items-center gap-1">
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

        {/* Barre de recherche */}
        <div className="mb-4 lg:w-96">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Rechercher dans les maintenances..."
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-brown-500/60 focus:border-brown-500/60"
          />
        </div>

        {/* Tableau des maintenances */}
        <div className="mt-4 rounded-lg bg-white shadow">
          <DataTable columns={columns} data={filteredData} pagination />
        </div>

        {/* Modal d'édition */}
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
