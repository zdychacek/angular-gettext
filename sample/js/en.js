angular.module('app').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('en', {"Ahoj":"Hello","Jazyk":"Language","Jeden králík":["One rabbit","{{count}} rabbits"],"Jedna loď":["One boat","{{count}} boats"],"Králík":"Rabbit","Počet":"Count"});
/* jshint +W100 */
}]);