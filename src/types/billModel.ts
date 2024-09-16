import { DeepReadonly } from "../utils/utils"

export type BillCreateModel = {
    contactIds: number[],
}

export type BillDto = DeepReadonly<
    BillCreateModel & {
        id: number,
        title: string,
        sum: number,
        idsPaidOut: number[]
        creationDate: Date,
    }
>