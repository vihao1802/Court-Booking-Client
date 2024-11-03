export interface CourtType {
  id: string;
  courtTypeName: string;
  isDisabled: boolean;
}

export interface CreateCourtType {
  courtTypeName: string;
}

export interface UpdateCourtType {
  courtTypeName: string;
  isDisabled: boolean;
}
