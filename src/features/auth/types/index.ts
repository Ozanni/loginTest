import { Nullable } from "../../../types";
import { IJwtToken } from "../../../types/dto/user";

export type LoginCredentialsDTO = {
    username: string;
    password: string;
}

export type AuthState = {
    token: Nullable<IJwtToken> | null;
}