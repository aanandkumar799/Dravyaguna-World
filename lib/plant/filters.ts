import type { Plant } from "./types";

export type PlantFilters = {
  family?: string;
  part?: string;
  status?: Plant["status"];
};

export function filterPlants(plants: Plant[], filters: PlantFilters) {
  return plants.filter(
    (plant) =>
      (!filters.family || plant.taxonomy.family === filters.family) &&
      (!filters.part || plant.parts?.some((part) => part === filters.part) ?? false) &&
      (!filters.status || plant.status === filters.status),
  );
}
