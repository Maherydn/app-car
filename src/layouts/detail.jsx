import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Avatar,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

const car = {
  id: 1,
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
  registration_number: "AB123CD",
  available: true,
  company_id: 2,
};

const maintenances = [
  {
    maintenance_id: 1,
    car_id: 1,
    garage_id: 2,
    maintenance_type: "Oil Change",
    maintenance_date: "2024-11-10",
    comments: "Routine oil change",
  },
  {
    maintenance_id: 2,
    car_id: 1,
    garage_id: 1,
    maintenance_type: "Tire Replacement",
    maintenance_date: "2024-11-15",
    comments: "Replaced all four tires",
  },
];

export default function CarDetails() {
  return (
    <div className="flex flex-col gap-6 p-4 h-screen">
      <Card>
        <CardBody>
          <div className="flex items-center gap-6">
            <div>
              <Typography variant="h5" color="blue-gray" className="mb-1">
                {car.brand} {car.model}
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Year: {car.year}
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Registration: {car.registration_number}
              </Typography>
              <Typography
                variant="small"
                className={`font-normal ${
                  car.available ? "text-green-500" : "text-red-500"
                }`}
              >
                {car.available ? "Available" : "Unavailable"}
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>

      <div>
        <Typography variant="h6" color="blue-gray" className="mb-3">
          Maintenance Records
        </Typography>
        <div className="grid gap-6 md:grid-cols-3">
          {maintenances.map((maintenance) => (
            <Card key={maintenance.maintenance_id} className="shadow-md">
              <CardHeader
                floated={false}
                className="bg-blue-gray-100 px-4 py-2 text-blue-gray-600"
              >
                {maintenance.maintenance_type}
              </CardHeader>
              <CardBody className="p-4">
                <Typography variant="small" className="text-blue-gray-500">
                  Date: {maintenance.maintenance_date}
                </Typography>
                <Typography variant="small" className="text-blue-gray-500">
                  Garage ID: {maintenance.garage_id}
                </Typography>
                <Typography variant="small" className="text-blue-gray-500">
                  Comments: {maintenance.comments}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
