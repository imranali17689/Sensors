/**
 * Parking counts for one category (student or faculty) in a garage.
 */
export type ParkingCounts = {
  occupied: number,
  available: number;
  total: number;
};

/**
 * Data for one garage: student and faculty parking.
 */
export type GarageParking = {
  student: ParkingCounts;
  faculty: ParkingCounts;
};

/**
 * Garage identifier used for tabs and data lookup.
 */
export type GarageId = "Grand" | "Sykes" | "West";

/**
 * Garage record with id and parking data.
 */
export type Garage = {
  id: GarageId;
  name: GarageId;
  parking: GarageParking;
};

/**
 * Status shown on a parking card (e.g. Available, Nearly full, Full).
 */
export type ParkingStatus = "Available" | "Nearly full" | "Full";

/**
 * Heatmap cell intensity (1 = low activity, 5 = high). Replace with API values later.
 */
export type TrendIntensity = 1 | 2 | 3 | 4 | 5;

/**
 * Placeholder trends for one garage — heatmap rows × columns + prediction copy.
 */
export type LocationTrendsData = {
  garageId: GarageId;
  /** e.g. 5 rows × 6 columns */
  heatmap: TrendIntensity[][];
  bestTimeLabel: string;
  bestTimeDescription: string;
};
