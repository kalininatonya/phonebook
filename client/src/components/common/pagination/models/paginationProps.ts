export interface PaginationProps {
    page: number,
    pages: number[],
    changeCurrentPage: (page: number) => void
}