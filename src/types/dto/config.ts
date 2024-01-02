import { ConfigAttributeDTO } from "./configAttribute";

export type ConfigDTO = {
    id: number;
    attributeID: string;
    attribute: ConfigAttributeDTO;
    attributeValue: string;
    preferred: boolean;
    hospitalID: string;
} 

export type ConfigDTOCreate = {
    attributeValue: string;
    attributeID: string;
    preferred: boolean;
}

export type ConfigDTOUpdate = {
    attributeValue: string;
    attributeID: string;
    preferred: boolean;
}

export type ConfigDTODelete = {
    id: string;
    attributeValue: string;
    preferred: boolean;
}
