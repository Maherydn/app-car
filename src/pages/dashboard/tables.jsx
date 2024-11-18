import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {carsTableData} from "@/data";
import React, { useState } from "react";
import { CarModal } from "@/modals/carCard";
import EditCarForm from "@/modals/editCarModal";
import CarDetails from "@/layouts/detail";
import { useNavigate } from "react-router-dom";

export function Tables() {
  
  const navigate = useNavigate();
  const handleFormSubmit = (updatedCar) => {
    console.log("Données mises à jour :", updatedCar);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Car
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["brand", "model", "registration number", "status", "action"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
            {carsTableData.map((carTableData, key) => {
              const className = `py-3 px-5 ${
                key === carsTableData.length - 1 ? "" : "border-b border-blue-gray-50"
              }`;

              const [isCarModalOpen, setIsCarModalOpen] = React.useState(false);
              const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

              return (
                <React.Fragment key={key}>
                  <tr 
                    onClick={() => navigate(`/dashboard/tables/1`)} 
                    className="hover:bg-blue-gray-100 duration-500 cursor-pointer"
                  >
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {carTableData.brand}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {carTableData.model}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {carTableData.registration_number}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                    <Chip
                      variant="gradient"
                      color={carTableData.available ? "teal" : "blue-gray"}
                      value={carTableData.available ? "Available" : "Not Available"}
                      className={`py-1 px-3 text-xs font-semibold w-fit rounded-full shadow-md tracking-wide  
                        ${
                          carTableData.available
                            ? "bg-teal-700 text-white"
                            : "bg-blue-gray-500 text-gray-100"
                        }`}
                    />

                    </td>
                    <td className={className}>
                      <Menu>
                        <MenuHandler>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            <EllipsisVerticalIcon
                              strokeWidth={2}
                              className="h-5 w-5 text-inherit"
                            />
                          </Typography>
                        </MenuHandler>
                        <MenuList className="py-1">
                          <MenuItem
                            className="text-sm"
                            onClick={() => setIsCarModalOpen(true)}
                          >
                            Voir les détails
                          </MenuItem>
                          <MenuItem
                            className="text-sm"
                            onClick={() => setIsEditModalOpen(true)}
                          >
                            Modifier
                          </MenuItem>
                          <MenuItem className="text-sm text-red-500">Supprimer</MenuItem>
                        </MenuList>
                      </Menu>
                    </td>
                  </tr>

                  {isCarModalOpen && (
                    <CarModal
                      car={carTableData}
                      isOpen={isCarModalOpen}
                      onClose={() => setIsCarModalOpen(false)}
                    />
                  )}

                  {isEditModalOpen && (
                    <EditCarForm
                      car={carTableData}
                      isOpen={isEditModalOpen}
                      onClose={() => setIsEditModalOpen(false)}
                      onSubmit={handleFormSubmit}
                    />
                  )}
                </React.Fragment>
              );
            })}

            </tbody>
          </table>

        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
