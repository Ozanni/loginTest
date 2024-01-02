export type ExtensionTypeDTOBase = {
    id: string;
    name: string;
}

export type ExtensionTypeDTO = {} & ExtensionTypeDTOBase;

export type ExtensionTypeDTOCreate = {
    description: string;
} & ExtensionTypeDTOBase;

export type ExtensionTypeDTOUpdate = {
    description: string;
} & ExtensionTypeDTOBase;

export type ExtensionTypeDTODelete = {
    id: string;
}