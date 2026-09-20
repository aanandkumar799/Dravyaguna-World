import type { Plant } from "./types";

export type PlantFilters = {
  family?: string;
  part?: Plant["parts"][number];
  status?: Plant["status"];
};

export function filterPlants(plants: Plant[], filters: PlantFilters) {
  return plants.filter(
    (plant) =>
      (!filters.family || plant.taxonomy.family === filters.family) &&
      (!filters.part || plant.parts.includes(filters.part)) &&
      (!filters.status || plant.status === filters.status),
  );
}
