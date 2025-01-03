export interface PaginationBase {
	page: number
	size: number
}

export interface Pagination extends PaginationBase {
	search: string
}

export interface ReservationPagination extends Pagination {
	from: string
	to: string
}

export interface AvailableCourtPagination extends PaginationBase {
	date: string | null
	start: string | null
	end: string | null
}