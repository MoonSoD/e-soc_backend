import { SetMetadata } from "@nestjs/common";

export enum Roles {
  USER = 1,
  ADMIN = 2,
}

export const Role = (role: Roles) => SetMetadata("role", role);
