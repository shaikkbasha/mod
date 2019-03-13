import {HasAnyAuthorityDirective} from './has-any-authority.directive';
import { TestBed, ComponentFixture, async, inject, fakeAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

xdescribe('HasAnyAuthorityDirective', () => {
    let component: HasAnyAuthorityDirective;
    let fixture: ComponentFixture<HasAnyAuthorityDirective>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HasAnyAuthorityDirective]
        });
        fixture = TestBed.createComponent(HasAnyAuthorityDirective);
        component = fixture.componentInstance;
    });
    // it('should create an instance', () => {
    //     expect(fixture).toBeTruthy();
    // });
});
