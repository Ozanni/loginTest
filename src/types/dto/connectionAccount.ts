export type ConnectionAccountDTOBase = {
    id: string;
    type: string;
    ipAllowed: Array<string>;
    authorities: Array<string>;
}

export type ConnectionAccountDTO = {
    hospitalID: string;
} & ConnectionAccountDTOBase;

export type ConnectionAccountDTOCreate = {
    secret: string;
} & ConnectionAccountDTO;
export type ConnectionAccountDTOFormCreate = {
    id: string;
    secret: string;
    type: string;
    ipAllowed: string;
    authorities: Array<string>;
    hospitalID: string;
}

export type ConnectionAccountDTOUpdate = {
    secret: string;
} & ConnectionAccountDTOBase;
export type ConnectionAccountDTOFormUpdate = {
    id: string;
    secret: string;
    type: string;
    ipAllowed: string;
    authorities: Array<string>;
}

export type ConnectionAccountDTODelete = {
    id: string;
}