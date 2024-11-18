import { chartsConfig } from "@/configs";

const vehicleRepairsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Repairs",
      data: [15, 12, 18, 20, 22, 17, 25], 
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"], 
    },
  },
};

const repairRevenueChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Revenue",
      data: [1200, 1500, 1300, 1800, 1600, 1900, 1700],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"], // Couleur bleue pour les revenus
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"], 
    },
  },
};

const completedMaintenanceTasksChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Tasks Completed",
      data: [5, 8, 7, 10, 6, 9, 11], 
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"], 
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"], 
    },
  },
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Réparations de véhicules",
    description: "Performance des réparations effectuées",
    footer: "campagne envoyée il y a 2 jours",
    chart: vehicleRepairsChart,
  },
  {
    color: "white",
    title: "Revenus des réparations",
    description: "Augmentation de 15% des revenus d'entretien aujourd'hui",
    footer: "mis à jour il y a 4 minutes",
    chart: repairRevenueChart,
  },
  {
    color: "white",
    title: "Tâches d'entretien complétées",
    description: "Performance des tâches d'entretien complétées",
    footer: "juste mis à jour",
    chart: completedMaintenanceTasksChart,
  },
];

export default statisticsChartsData;
