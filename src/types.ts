export interface IUser {
    username: string
    token: string
}

export interface ICredentials {
    username: string
    password: string
}

export interface IOperation {
    id: number
    type: string
    cost: number
}

export interface IRecord {
    id: number
    operation_id: number
    user_id: number
    amount: number
    user_balance: number
    operation_response: string
    date: string
    operation: IOperation
}

export interface INewOperation {
    x?: number,
    y?: number,
    type: string
}

export interface INewOperationResponse extends IRecord { }

export interface IRecordsResponse {
    records: IRecord[],
    total_count: number,
    page_number: number
}

export interface ISearchRecords {
    searchTerm?: string,
    pageNumber?: number,
    pageSize: number,
    sort: 'ASC' | 'DESC'
}

export interface IUserBalanceResponse {
    balance: number
}