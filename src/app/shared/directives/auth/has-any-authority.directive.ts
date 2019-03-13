import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *hasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *hasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
  selector: '[userHasAnyAuthority]'
})
export class HasAnyAuthorityDirective {

  private authorities: string[];

  constructor(private userService: UserService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
  }

  @Input()
  set userHasAnyAuthority(value: string|string[]) {
    this.authorities = typeof value === 'string' ? [ value ] :  value;

    this.updateView();
    // Get notified each time authentication state changes.
    this.userService.getAuthenticationState().subscribe((identity) => {
      this.updateView();
    });
  }

  private updateView(): void {
    this.userService.hasAnyAuthority(this.authorities).then((result) => {
      this.viewContainerRef.clear();
      if (result) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
