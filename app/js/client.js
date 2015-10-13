require('angular/angular'); // the way of angular into app, no variable, has to be set on the window add global level two functions 

var stocksApp = angular.module('stocksApp', []); //[] global level app dependencies [] creating a new module called checkoutApp
require('./services/services')(stocksApp);
require('./directives/directives')(stocksApp);
require('./stocks/stocks')(stocksApp);

