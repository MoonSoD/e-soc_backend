import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  protected static roles = {
    1: Roles.USER,
    2: Roles.ADMIN,
  };

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<number>("role", context.getHandler());
    Logger.debug("Activating");
    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === Roles.ADMIN) {
      return true;
    }

    return user.role === role;
  }
}
