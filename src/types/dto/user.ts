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