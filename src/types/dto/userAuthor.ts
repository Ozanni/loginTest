export type UserAuthorDTOBase = {
    id: string;
    name: string;
};

export type UserAuthorDTO = {} & UserAuthorDTOBase;

export type UserAuthorDTOCreate = {
    description: string;
} & UserAuthorDTOBase;

export type UserAuthorDTOUpdate = {
    description: string;
} & UserAuthorDTOBase;

export type UserAuthorDTODelete = {
    id: string;
}