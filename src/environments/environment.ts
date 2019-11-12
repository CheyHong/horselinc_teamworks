// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// dev server

export const environment = {
    production: false,
    hmr       : false,
    staging   : false,
    firebaseConfig : {
        apiKey: 'AIzaSyCTsF9zQFVOokM-DgkDBLQ6dOUkrT97gtA',
        authDomain: 'horselinc-dev.firebaseapp.com',
        databaseURL: 'https://horselinc-dev.firebaseio.com',
        projectId: 'horselinc-dev',
        storageBucket: 'horselinc-dev.appspot.com',
        messagingSenderId: '23680078262',
        appId: '1:23680078262:web:f81a8ac5342e0357'
      }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
