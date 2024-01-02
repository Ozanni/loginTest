export type StatisticsTypeDTO = {
    id: string;
    name: string;
    description: string;
    config: string;
    filterParams: Array<string>;
    outputSchema: string;
}

export type StatisticsTypeDTODelete = {
    id: string;
}