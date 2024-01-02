export type ConfigAttributeDTOBase = {
    id: string;
    name: string;
    datatype: string;
    minOccurs: number;
}

export type ConfigAttributeDTO = {} & ConfigAttributeDTOBase;

export type ConfigAttributeDTOCreate = {
    description: string;
    datatypeConfig: string;
    maxOccurs: number;
} & ConfigAttributeDTOBase;

export type ConfigAttributeDTOUpdate = {
    description: string;
    datatypeConfig: string;
    maxOccurs: number;
} & ConfigAttributeDTOBase;

export type ConfigAttributeDTODelete = {
    id: string;
}