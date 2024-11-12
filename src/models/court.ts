import { CourtImage, CourtImageRequest } from "./court-image";

interface CourtBase {
  courtName: string;
  courtDescription: string;
  courtAddress: string;
  rentalPricePerHour: number;
  minimumRentalTime: number;
  maximumRentalTime: number;
  courtTypeId: string;
}

export interface Court extends CourtBase {
  id: string;
  courtImageList: CourtImage[];
}

export interface CourtRequest extends CourtBase {
  courtImageList: CourtImageRequest[];
}
