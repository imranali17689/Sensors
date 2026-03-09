/**
 * Parking counts for one category (student or faculty) in a garage.
 */
export type ParkingCounts = {
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
