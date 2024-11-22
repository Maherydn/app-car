import React, { useState } from "react";
import { TruckIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import EditMaintenanceForm from "@/modals/editMaintenanceForm";
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

  const maintenanceData = [
    { maintenance_id: 1, maintenance_type: "Oil Change", maintenance_date: "2024-11-10", comments: "Routine oil change" },
    { maintenance_id: 2, maintenance_type: "Tire Replacement", maintenance_date: "2024-11-15", comments: "Replaced all four tires" },
  ];

  // States pour chaque modal
  const [isEditCarModalOpen, setIsEditCarModalOpen] = useState(false);
  const [isEditMaintenanceModalOpen, setIsEditMaintenanceModalOpen] = useState(false);
  const [isCreateMaintenanceModalOpen, setIsCreateMaintenanceModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      name: "Maintenance Type",
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
      sortable: true,
    },
    {
      cell: (row) => (
        <Button
          onClick={() => setIsEditMaintenanceModalOpen(true)}
          className="p-2 bg-teal-500 text-white rounded"
        >
          Modifier
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const updateMaintenance = (data) => {
    console.log("Updated maintenance data:", data);
  };

  const updateCar = (data) => {
    console.log("Updated car data:", data);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredMaintenanceData = maintenanceData.filter(
    (item) =>
      item.maintenance_type.toLowerCase().includes(searchText.toLowerCase()) ||
      item.comments.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <header className="mb-8 relative">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <TruckIcon className="h-6 w-6 text-blue-500" />
          {carTableData.brand} {carTableData.model} ({carTableData.year})
        </h1>
        <p className="text-sm text-gray-500">
          Registration: {carTableData.registration_number}
        </p>
        <Link to="/dashboard/tables">
          <button className="absolute -bottom-2 right-0 py-1 px-3 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-lg flex items-center gap-1">
            <TruckIcon className="h-4 w-4" />
            Back
          </button>
        </Link>
      </header>

      {/* Car Details */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Car Details</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <p>
              <span className="font-medium">Mileage:</span> {carTableData.mileage}{" "}
              km
            </p>
            <p>
              <span className="font-medium">Fuel Type:</span>{" "}
              {carTableData.fuel_type}
            </p>
            <p>
              <span className="font-medium">Transmission:</span>{" "}
              {carTableData.transmission}
            </p>
            <p>
              <span
                className={`font-medium ${
                  carTableData.available ? "text-green-600" : "text-red-600"
                }`}
              >
                Status:
              </span>{" "}
              {carTableData.available ? "Available" : "Unavailable"}
            </p>
          </div>
        </div>
      
        {isEditCarModalOpen && (
          <EditCarForm
            isOpen={isEditCarModalOpen}
            onClose={() => setIsEditCarModalOpen(false)}
            carData={carTableData}
            onSubmit={updateCar}
          />
        )}
      </section>

      {/* Maintenance Section */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Maintenance History
        </h2>
        <div className="mt-4 mb-4 flex items-center gap-2 w-80">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search maintenance..."
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div className="mt-4 rounded-lg">
          <DataTable
            columns={columns}
            data={filteredMaintenanceData}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 20]}
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          <Button
            onClick={() => setIsCreateMaintenanceModalOpen(true)}
            className="mt-4 py-2 px-4 flex items-center justify-center bg-green-500 text-white font-medium text-sm rounded-full shadow hover:bg-green-600 transition gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Maintenance
          </Button>
          {isCreateMaintenanceModalOpen && (
            <CreateMaintenanceForm
              isOpen={isCreateMaintenanceModalOpen}
              onClose={() => setIsCreateMaintenanceModalOpen(false)}
              onSubmit={updateMaintenance}
            />
          )}
        </div>
      </section>

      {/* Edit Maintenance Modal */}
      {isEditMaintenanceModalOpen && (
        <EditMaintenanceForm
          isOpen={isEditMaintenanceModalOpen}
          onClose={() => setIsEditMaintenanceModalOpen(false)}
          onSubmit={updateMaintenance}
        />
      )}

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
    