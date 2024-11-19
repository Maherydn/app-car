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
  Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { carsTableData } from "@/data";
import React, { useState } from "react";
import { CarModal } from "@/modals/carCard";
import EditCarForm from "@/modals/editCarModal";
import CreateCarForm from "@/modals/createCarForm"; 
import { useNavigate } from "react-router-dom";

export function Tables() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateCar = (newCar) => {
    console.log("Nouvelle voiture créée :", newCar);
    setIsCreateModalOpen(false);
  };

  const handleFormSubmit = (updatedCar) => {
    console.log("Données mises à jour :", updatedCar);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Car
            </Typography>
            <Button
              variant="gradient"
              color="green"
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create
            </Button>
          </div>
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
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {carTableData.brand}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {carTableData.model}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {carTableData.registration_number}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={
                            carTableData.status === "ok"
                              ? "teal"
                              : carTableData.status === "in repair"
                              ? "red"
                              : carTableData.status === "in service"
                              ? "blue"
                              : "blue-gray"
                          }
                          value={carTableData.status}
                          className={`py-1 px-3 text-xs font-semibold w-fit rounded-full shadow-md tracking-wide ${
                            carTableData.status  === "in repair"
                              ? "bg-red-600 text-white"
                              : carTableData.status === "in service"
                              ? "bg-blue-600 text-white"
                              : "bg-blue-gray-500 text-gray-100"
                          }`}
                        />
                      </td>
                      <td className={className}>
                        <Menu>
                          <MenuHandler>
                            <EllipsisVerticalIcon
                              strokeWidth={2}
                              className="h-5 w-5 text-inherit"
                            />
                          </MenuHandler>
                          <MenuList className="py-1">
                            <MenuItem
                              className="text-sm"
                              onClick={(e) => {e.stopPropagation(); setIsCarModalOpen(true)}}
                            >
                              Voir les détails
                            </MenuItem>
                            <MenuItem
                              className="text-sm"
                              onClick={(e) =>{e.stopPropagation(); setIsEditModalOpen(true)} }
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

      {isCreateModalOpen && (
        <CreateCarForm
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateCar}
        />
      )}
    </div>
  );
}

export default Tables;
