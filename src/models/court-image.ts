export interface CourtImageBase {
  courtImageSrc: string;
  imageType: string;
}

export interface CourtImage extends CourtImageBase {
  id: string;
}

export interface CourtImageRequest extends CourtImageBase {}
