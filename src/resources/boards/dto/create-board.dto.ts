export interface CreateBoardDto {
  readonly id: string;

  readonly title: string;

  readonly columns?: [];
}
