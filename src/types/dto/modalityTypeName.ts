export type ModalityTypeNameDTOBase = {
    id: string;
    name: string;
};

export type ModalityTypeNameDTO = {} & ModalityTypeNameDTOBase;

export type ModalityTypeNameDTOCreate = {
    description: string;
} & ModalityTypeNameDTOBase;

export type ModalityTypeNameDTOUpdate = {
    description: string;
} & ModalityTypeNameDTOBase;

export type ModalityTypeNameDTODelete = {
    id: string;
};