// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  baseUrl: 'http://localhost:4200',
  production: false,
  API: 'https://health-app-api-staging.cfapps.io',
  INGESTION_API: 'https://health-app-offloads-ingestion-service-dev.cfapps.io',
  OKTA_REDIRECT_URI: 'http://localhost:4200/implicit/callback',
  OKTA_CLIENT_ID: '0oafnbd9qkEb6IBDB0h7',
  IDLE_DURATION: 3600, // show idle dialog 60 minutes after user inactivity
  IDLE_TIMEOUT_DURATION: 300, // close idle dialog 5 minutes after opening it
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
