export interface Credentials {
  id: number;
  userId: number;
  title: string;
  url: string;
  username: string;
  password: string;
}

export type CreateCredentialData = Omit<Credentials, "id">;
