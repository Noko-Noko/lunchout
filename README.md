# TimeOut

## Development notes
The task was actually great, the best one I came across sp far, in fact I hope you don't mind me borrowing some inpiration from it on my next role (I often send task to candidates on interviews, and to be honest this task I would say it hit the right sweetspot of complexity time required to complete).

I used Angular as the framework as it's the one I'm most familiar with and offers a fair few things out of the box that are very handy, specially with the angular CLI compiler. On the other hand it's still a bit slow.

I tried to keep the logic as compact and simple to follow as possible by not creating many different independent components, services, etc. (only one service to fetch the data and then used the 'out of the box' component for the rest of the aplication).

I did start doing it "properly" with observables but I got stuck for a while so decided to simplify it and just manipulate the arrays intead (I know, shame on me).

And finalay I did not have time (nor that is something we do very often) to write some test, there is a test environment setup already but not much is being tested at all, oh and my typings left a lot to be desired there too (just created a few interfaces for the data), hopefully it's something that you can see past as I did not want to spend too much time on it.

## Project setup
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.0.

For the initial setup you can follow the steps here [Angular setup](https://angular.io/guide/setup-local) 

or simple run `npm install -g @angular/cli` and follow the following steps.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
