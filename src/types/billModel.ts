export type BillCreateModel = {
    peopleIds: number[],
}

export type BillDto = BillCreateModel & {
    id: number,
    title: string,
    sum: number,
    idsPaidOut: number[]
    creationDate: Date,
};