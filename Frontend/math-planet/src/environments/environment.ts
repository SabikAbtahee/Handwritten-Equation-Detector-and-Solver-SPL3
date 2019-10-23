// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const baseURL= 'http://127.0.0.1:5000'

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyA_jwBuq-i6KYbbC0jyULazdY8C2QnYAxE",
    authDomain: "math-planet.firebaseapp.com",
    databaseURL: "https://math-planet.firebaseio.com",
    projectId: "math-planet",
    storageBucket: "math-planet.appspot.com",
    messagingSenderId: "83413687909",
    appId: "1:83413687909:web:ae6d335a95c5966347b08c",
    measurementId: "G-24S8NLKZHZ"
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
