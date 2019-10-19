// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const baseURL= 'http://127.0.0.1:5000'

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyC7ypCEligvG5nbvrIiDZp_yrDL-JcTtUU",
    authDomain: "oshop-e9657.firebaseapp.com",
    databaseURL: "https://oshop-e9657.firebaseio.com",
    projectId: "oshop-e9657",
    storageBucket: "oshop-e9657.appspot.com",
    messagingSenderId: "538826248465",
    appId: "1:538826248465:web:063d1821727fa5ea"
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
