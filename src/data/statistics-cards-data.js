import { CalendarIcon, WrenchIcon, CheckCircleIcon, TruckIcon } from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    icon: TruckIcon,
    title: "Véhicules en entretien",
    value: 120,
    footer: {
      value: 3,
      label: "par rapport à hier",
    },
  },
  {
    icon: CalendarIcon, 
    title: "Maintenances/mois",
    value: 150,
    footer: {
      value: 5,
      label: "par rapport au mois dernier",
    },
  },
  {
    icon: WrenchIcon,
    title: "Véhicules à réparer",
    value: 30,
    footer: {
      value: -2,
      label: "par rapport à hier",
    },
  },
  {
    icon: CheckCircleIcon, 
    title: "Véhicules ok",
    value: 90,
    footer: {
      value: 1,
      label: "par rapport à hier",
    },
  },
];

export default statisticsCardsData;
