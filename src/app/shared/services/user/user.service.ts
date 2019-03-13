import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { AirlineService } from '../admin/airline/airline.service';

interface Claim {
  claim: string;
  value: string;
}

@Injectable()
export class UserService {
  private userIdentity: any;
  private authenticated = false;
  public authenticationState = new Subject<any>();
  private claims: Array<Claim>;

  private userInfoIdentify = new BehaviorSubject({});
  public userInfo = this.userInfoIdentify.asObservable();

  constructor(
    private oktaAuth: OktaAuthService,
    private airlineService: AirlineService
  ) {}

  authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[]): Promise<boolean> {
    return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
  }

  hasAnyAuthorityDirect(authorities: string[]): boolean {
    if ( (authorities === null) || (authorities === undefined) ) {
      // no authorities to look
      return true;
    }
    if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }

    for (let i = 0; i < authorities.length; i++) {
      if (this.userIdentity.authorities.includes(authorities[i])) {
        return true;
      }
    }

    return false;
  }

  hasAuthority(authority: string): Promise<boolean> {
    if (!this.authenticated) {
      return Promise.resolve(false);
    }

    return this.identity().then((id) => {
      return Promise.resolve(id.authorities && id.authorities.includes(authority));
    }, () => {
      return Promise.resolve(false);
    });
  }

  identity(force?: boolean): Promise<any> {
    if (force === true) {
      this.userIdentity = undefined;
    }

    // check and see if we have retrieved the userIdentity data from the server.
    // if we have, reuse it by immediately resolving
    if (this.userIdentity) {
      console.log('UserService#identity - known user: ', this.userIdentity);
      return Promise.resolve(this.userIdentity);
    }

    console.log('UserService#identity - NOT known user: ');

    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    // return this.account.get().toPromise().then((account) => {
      return this.oktaAuth.getUser().then(async (userClaims) => {
      console.log('UserService#identity - oktaAuth.getUser(): ', userClaims);
      if (userClaims) {
        this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));
        this.userIdentity = {
          id: this.claims.find(item => item.claim === 'sub').value,
          firstName: this.claims.find(item => item.claim === 'given_name').value,
          lastName: this.claims.find(item => item.claim === 'family_name').value,
          email: this.claims.find(item => item.claim === 'email').value,
          groups: this.claims.find(item => item.claim === 'groups').value,
          authorities: this.claims.find(item => item.claim === 'groups').value,
          airlines: this.claims.find(item => item.claim === 'airlines').value,
          accessToAllAirlines:
            this.claims.find(item => item.claim === 'accessToAllAirlines') ?
              this.claims.find(item => item.claim === 'accessToAllAirlines').value :
              false
        };
        this.userInfoIdentify.next(this.userIdentity);
        this.authenticated = true;

        // Set current airline for the first time here
        // We can set preferred airline here in the future.
        if (!this.userIdentity.accessToAllAirlines) {
          this.userIdentity.currentAirline = this.userIdentity.airlines[0];
        } else {
          // Need to retrieve all airlines and get the first one
          // or need to use preferred airline attribute (TO BE DONE)
          const airlines = await this.airlineService.getAirlines().toPromise();
          // console.log('access to all airlines - airlines => ', airlines[0].icao);
          if (airlines && airlines[0]) {
            this.userIdentity.currentAirline = airlines[0].icao;
          }
        }

        console.log('UserService#identity - userIdentity: ', this.userIdentity);
      } else {
        this.userIdentity = null;
        this.authenticated = false;
      }
      this.authenticationState.next(this.userIdentity);
      return this.userIdentity;
    }).catch((err) => {
      console.log('UserService#identity - error => ', err);

      this.userIdentity = null;
      this.authenticated = false;
      this.authenticationState.next(this.userIdentity);

      return null;
    });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(): boolean {
    return this.userIdentity !== undefined;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  hasAirlineAccess(icao: string): boolean {
    const icaoToVerify = icao.toUpperCase();
    if (this.isIdentityResolved()) {
      if ((this.userIdentity.airlines && this.userIdentity.airlines.includes(icaoToVerify)) || this.userIdentity.accessToAllAirlines) {
        return true;
      }
    } else {
      return false;
    }
  }

  hasSeveralAirlines(): boolean {
    // console.log('UserService#hasSeveralAirline() - isIdentityResolved? ', this.isIdentityResolved());

    if (this.isIdentityResolved()) {
      if ( this.userIdentity.accessToAllAirlines ||  (this.userIdentity.airlines && this.userIdentity.airlines.length > 1) ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  setCurrentAirline(icao: string) {
    console.log('UserService#oktaAuth.setCurrentAirline() - icao: ', icao);

    this.userIdentity.currentAirline = icao;
  }

  getCurrentAirline(): string {
    console.log('UserService#oktaAuth.getCurrentAirline() - isIdentityResolved: ', this.isIdentityResolved());

    if (this.isIdentityResolved()) {
      return this.userIdentity.currentAirline;
    } else {
      return null;
    }
  }
}
