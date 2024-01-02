export type BodyPartDTOBase = {
    id: string;
    name: string;
};

export type BodyPartDTO = {} & BodyPartDTOBase;

export type BodyPartDTOCreate = {
    description: string;
} & BodyPartDTOBase;

export type BodyPartDTOUpdate = {
    description: string;
} & BodyPartDTOBase;

export type BodyPartDTODelete = {
    id: string;
}