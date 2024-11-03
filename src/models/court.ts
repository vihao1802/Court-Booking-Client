import { CourtImage, CreateCourtImage } from "./court-image";

export interface Court {
  id: string;
  courtName: string;
  courtDescription: string;
  courtAddress: string;
  rentalPricePerHour: number;
  minimumRentalTime: number;
  maximumRentalTime: number;
  courtTypeId: string;
  courtImageList: CourtImage[];
}

export interface CreateCourt {
  courtName: string;
  courtDescription: string;
  courtAddress: string;
  rentalPricePerHour: number;
  minimumRentalTime: number;
  maximumRentalTime: number;
  courtTypeId: string;
  courtImageList: CreateCourtImage[];
}
