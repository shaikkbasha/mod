import { environment } from '../environments/environment';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Keepalive } from '@ng-idle/keepalive';
import { Idle, DEFAULT_INTERRUPTSOURCES, AutoResume } from '@ng-idle/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IdleModalComponent } from './common/idle-modal/idle-modal.component';

import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  modalRef = null;

  constructor(public oktaAuth: OktaAuthService,
              private idle: Idle,
              private keepAlive: Keepalive,
              private modalService: NgbModal,
              private userService: UserService) { }

  async ngOnInit() {
    // get authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    console.log('AppComponent#ngOnInit - isAuthenticated? => ', this.isAuthenticated);

    // We start the idle monitoring when the user is already authenticated
    // The use case is the user is already authenticated and calls route from url directly
    if (this.isAuthenticated) {
      console.log('AppComponent#ngOnInit - getting user identity!');
      const user = await this.userService.identity();
      console.log('AppComponent#ngOnInit - user is authenticated and we have its details => ', user);

      // console.log('start idle mode');
      this.startIdleMonitoring();

      return;
    }

    // subscribe to authentication state changes
    // The use case is after the user gets logged in
    // if (this.oktaAuth.$authenticationState) {
      // Observable version
      if (this.oktaAuth.$authenticationState) {
        this.oktaAuth.$authenticationState.subscribe(
          async (isAuthenticated: boolean) => {
            // console.log('authenticationState:', isAuthenticated);
            this.isAuthenticated = isAuthenticated;

            console.log('AppComponent#ngOnInit - subscribe - isAuthenticated? => ', this.isAuthenticated);

            // We only start the idle monitoring when the user is authenticated
            if (this.isAuthenticated === true) {
              console.log('AppComponent#ngOnInit - subscribe - user is authenticate and we have its details');
              await this.userService.identity();

              // console.log('start idle mode');
              this.startIdleMonitoring();
            }
          }
        );
      }
    // }
  }

  startIdleMonitoring() {

    const idleDuration = parseInt(`${environment.IDLE_DURATION}`, 0);
    const idleTimeoutDuration = parseInt(`${environment.IDLE_TIMEOUT_DURATION}`, 0);

    // sets an idle timeout of 600 seconds (10 minutes)
    this.idle.setIdle(idleDuration);

    // sets a timeout period of 120 seconds (2 minutes). after 720 seconds of inactivity (600 + 120),
    // the user will be considered timed out.
    this.idle.setTimeout(idleTimeoutDuration);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // https://github.com/HackedByChinese/ng2-idle/issues/59
    this.idle.setAutoResume(AutoResume.notIdle);

    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.modalRef.close();
      this.oktaAuth.logout('/login');
    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      // this.modalRef = this.modalService.open(IdleModalComponent);
      this.modalRef = this.modalService.open(
        IdleModalComponent,
        {centered: true}
        );
      this.modalRef.componentInstance.countdown = '5';
      this.modalRef.result.then((result) => {
        // console.log(`Closed with: ${result}`);
        // this.closeResult = `Closed with: ${result}`;
        if (result !== undefined) {
          this.reset();
        } else {
          // This is the closing once the time out is reached.
          // As we automatically closed the modal we have to ignore the event and not reset the idle mode
        }
      }, (reason) => {
        // console.log(`Dismissed ${reason}`);
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.reset();
      });
    });
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      this.modalRef.componentInstance.countdown = countdown;
    });

    // sets the ping interval to 15 seconds
    this.keepAlive.interval(15);

    this.keepAlive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
