export type ConsumableTypeDTOBase = {
    id: string;
    name: string;
};

export type ConsumableTypeDTO = {} & ConsumableTypeDTOBase;

export type ConsumableTypeDTOCreate = {
    description: string;
} & ConsumableTypeDTOBase;

export type ConsumableTypeDTOUpdate = {
    description: string;
} & ConsumableTypeDTOBase;

export type ConsumableTypeDTODelete = {
    id: string;
}