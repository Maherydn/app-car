import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData, carsTableData} from "@/data";
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
                {["brand", "model", "registration number", "status", ""].map(
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
                        color={carTableData.available ? "green" : "blue-gray"}
                        value={carTableData.available ? "available" : "not available"}
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
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

      {/* <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Driver
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["author", "function", "status", "employed", ""].map((el) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ img, name, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {job[0]}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography>
                      </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={online ? "green" : "blue-gray"}
                            value={online ? "online" : "offline"}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                      <Button
                        variant="text"
                        className="bg-white text-gray-600 font-semibold px-4 py-1 rounded-lg transition duration-300 ease-in-out border border-transparent hover:border-gray-500 hover:text-gray-800 normal-case"
                      >
                        Edit
                      </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card> */}
      {/* <CarDetails/> */}
    </div>
  );
}

export default Tables;
