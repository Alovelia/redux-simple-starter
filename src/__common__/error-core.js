import ExtendableError from 'es6-error';
import StackTrace from 'stacktrace-js';

/* eslint-disable no-console */
/*
* @description
* https://medium.com/@xjamundx/custom-javascript-errors-in-es6-aa891b173f87
* https://github.com/bjyoungblood/es6-error
* */
export class ApiError extends ExtendableError {
  // constructor is optional; you should omit it if you just want a custom error
  // type for inheritance and type checking
  constructor(message = 'Api Error') {
    super(message);
  }
}

export class CustomError extends ExtendableError {
  // constructor is optional; you should omit it if you just want a custom error
  // type for inheritance and type checking
  constructor(message = 'Custom Error') {
    super(message);
  }
}

/*
* @description
* http://2ality.com/2016/04/unhandled-rejections.html
* handle all unhandled promise rejections
* see - http://bluebirdjs.com/docs/api/error-management-configuration.html#global-rejection-events
* or for latest node - https://nodejs.org/api/process.html#process_event_unhandledrejection
* */
export function listenGlobalPromiseRejections() {
  if (typeof window === 'object') {
    window.addEventListener('unhandledrejection', (event) => {
      // Prevent error output on the console:
      event.preventDefault();
      console.groupCollapsed('Unhandled Rejection');
      console.error(`Reason: ${event.detail.reason.message}`);
      console.groupCollapsed('Stacktrace');
      console.log(`%cReason: ${event.detail.reason.stack}`, 'color:red');
      console.groupEnd();
      console.groupEnd();
    });

    window.addEventListener('rejectionhandled', () => {
      console.log('%cRejection Handled', 'color:grey');
    });
  }

  // process.on('unhandledRejection', (reason) => {
  //   console.log(`Reason: ${reason}`);
  // });
}

/*
* @description
* handle all uncaught exceptions
* see - https://nodejs.org/api/process.html#process_event_uncaughtexception
* to read https://github.com/aleksandr-oleynikov/uncaught
* The largest example if the current variant is not enough
* https://stackoverflow.com/a/36317375/6190198
* */
export function listenGlobalExceptions() {
  if (typeof window === 'object') {
    window.onerror = (msg, url, lineNo, columnNo, error) => {

      if (process.env.NODE_ENV === 'production') {
        // https://www.stacktracejs.com/#!/docs/stacktrace-js
        StackTrace.fromError(error).then((stackframes) => {
          StackTrace.report(stackframes, '/errorlog', 'error message')
            .catch(() => {
              // console.log('EPIC FAIL');
            });
        }).catch(() => {
          // console.log('EPIC FAIL', err);
        });

        let string = msg.toLowerCase();
        let substring = 'script error';
        if (string.indexOf(substring) > -1) {
          console.log('%cScript Error: See Console for Detail', 'color:red');
        } else {
          console.groupCollapsed('%cError', 'color:red');
          console.log(`%cMessage: ${msg}`.padEnd(16), 'color:red');
          console.log(`%cUrl: ${url}:${lineNo}:${columnNo}`.padEnd(16), 'color:red');
          console.error(error.stack);
          console.groupEnd();
        }
        return false;
      }
    };
  }
}

export function errorLoading(err) {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
}

export function handleGlobalErrors() {
  listenGlobalExceptions();
  listenGlobalPromiseRejections();
}
