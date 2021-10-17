import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from './permission.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requirePermissions = this.reflector.getAllAndOverride<Permission[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    if (!requirePermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requirePermissions.some((permissions) =>
      user.permissions?.includes(permissions),
    );
  }
}
