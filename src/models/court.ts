import { CourtImage, CourtImageRequest } from "./court-image";
import { CourtType } from "./court-type";

interface CourtBase {
  courtName: string;
  courtDescription: string;
  courtAddress: string;
  rentalPricePerHour: number;
  minimumRentalTime: number;
  maximumRentalTime: number;
}

export interface Court extends CourtBase {
  id: string;
  courtType: CourtType;
  courtImageList: CourtImage[];
  isDeleted: number;
}

export interface CourtRequest extends CourtBase {
  courtTypeId: string;
}
