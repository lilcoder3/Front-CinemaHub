// has-role.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoginService } from '../services/login.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {  // ✅ Este nombre DEBE coincidir con lo que importas
  private rolesAllowed: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loginService: LoginService
  ) {}

  @Input()
  set appHasRole(roles: string | string[]) {
    this.rolesAllowed = Array.isArray(roles) ? roles : [roles];

    const userRole = this.loginService.showRole();

    if (this.rolesAllowed.includes(userRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
