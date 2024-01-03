export type UserAuthor = {
    authorId: string;
    authorName: string;
    description: string;
}

export interface IJwtToken {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    expiresIn: number;
    issuedAt: number;
    type: string;
  }

// export interface IJwtToken {
//     access_token: string;
//     token_type: string;
//     expires_in: number;
// }