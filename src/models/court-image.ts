export interface CourtImageBase {
  
  imageType: string;
}

export interface CourtImage extends CourtImageBase {
  id: string;
  courtImageSrc: string;
}

export interface CourtImageRequest extends CourtImageBase {
  courtImageSrc: File;
}
