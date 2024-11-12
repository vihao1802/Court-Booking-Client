export interface CourtTypeBase {
  courtTypeName: string;
  isDisabled: boolean;
}

export interface CourtType extends CourtTypeBase {
  id: string;
}

export interface CourtTypeRequest extends CourtTypeBase {}
