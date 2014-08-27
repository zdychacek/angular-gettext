angular.module('app', ['gettext'])
	.controller('AppCtrl', function ($scope, $rootScope, gettextCatalog) {
		gettextCatalog.setBaseLanguage('cs');
		gettextCatalog.setCurrentLanguage('cs');
		gettextCatalog.debug = true;

		// save dictionary on $rootScope for global access
		$rootScope.$dictionary = {};

		// when lang is changed update global dictionary
		$scope.$on('gettextLanguageChanged', function () {
			$rootScope.$dictionary = gettextCatalog.getCurrentStrings();
		});

		// list of languages
		$scope.languages = {
			current: gettextCatalog.currentLanguage,
			available: {
				'cs': 'Česky',
				'en': 'English'
			}
		};

		// change language
		$scope.$watch('languages.current', function (lang) {
			if (lang) {
				gettextCatalog.setCurrentLanguage(lang);
			}
		});
	})
	.controller('MainCtrl', function ($scope, $timeout, gettext) {
		$scope.count = 5;
		
		// sentences which have to be included in translation template MUST BE annotated with function `gettext(...)`
		$scope.test = $scope.$dictionary[gettext('Králík')];
		
		// observable plurals - can be changed
		$scope.plurals = ['{{count}} lodě', '{{count}} lodí'];

		$timeout(function () {
			$scope.plurals[1] = '{{count}} lodííí';
		}, 2000);
	});