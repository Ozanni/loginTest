export type HospitalDTOBase = {
    id: string;
    name: string;
    address: string;
    enabled: boolean;
}

export type HospitalDTO = {} & HospitalDTOBase;

export type HospitalDTOCreate = {
    phone: string;
    description: string;
    email: string;
    logo: string;
    logoFull: string;
} & HospitalDTOBase;

export type HospitalDTOUpdate = {
    phone: string;
    description: string;
    email: string;
    logo: string;
    logoFull: string;
} & HospitalDTOBase;

export type HospitalDTODelete = {
    id: string;
}