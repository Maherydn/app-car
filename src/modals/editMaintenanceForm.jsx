import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Input, Button } from "@material-tailwind/react";

const EditMaintenanceForm = ({ maintenance, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    maintenance_id: maintenance.maintenance_id || "",
    car_id: maintenance.car_id || "",
    garage_id: maintenance.garage_id || "",
    maintenance_type: maintenance.maintenance_type || "",
    maintenance_date: maintenance.maintenance_date || "",
    comments: maintenance.comments || "",
  });

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus(); 
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Maintenance Information
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          <div>
            <Input
              label="Car ID"
              name="car_id"
              value={formData.car_id}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div>
            <Input
              label="Garage ID"
              name="garage_id"
              value={formData.garage_id}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div>
            <Input
              label="Maintenance Type"
              name="maintenance_type"
              value={formData.maintenance_type}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div>
            <Input
              label="Maintenance Date"
              name="maintenance_date"
              type="date"
              value={formData.maintenance_date}
              onChange={handleChange}
              required
              color="indigo"
            />
          </div>

          <div>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="4"
              className="block w-full text-gray-700 p-2 border border-gray-300 rounded-md"
              placeholder="Comments"
            ></textarea>
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
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default EditMaintenanceForm;
