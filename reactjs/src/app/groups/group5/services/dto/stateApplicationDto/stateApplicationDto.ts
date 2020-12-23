export interface CreateStateApplicationInput {
    IDJobSeeker: number,
    IDRecruitment: number,
    State: string,
}

export interface UpdateStateApplicationInput extends CreateStateApplicationInput {
    id: number
}

export interface GetStateApplicationByJSInput {
    IDJobSeeker: number,
    IDRecruitment: number,
}