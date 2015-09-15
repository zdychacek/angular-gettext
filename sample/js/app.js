angular.module('app', ['gettext'])
	.controller('AppCtrl', function ($scope, $rootScope, gettextCatalog, gettext) {
		$rootScope.$on('gettextLanguageChanged', function () {
			$scope.langs = {
				selected: 'en',
				available: [
					{ code: 'en', title: gettext('Angličtina') },
					{ code: 'cs', title: gettext('Čeština') },
					{ code: 'ru', title: gettext('Ruština') }
				]
			};
		});

		gettextCatalog.setBaseLanguage('cs');
		gettextCatalog.setCurrentLanguage('cs');
		gettextCatalog.debug = true;

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
		$scope.test = gettext('Králík');
		
		// observable plurals - can be changed
		$scope.plurals = ['{{count}} lodě', '{{count}} lodí'];

		$timeout(function () {
			$scope.plurals[1] = '{{count}} lodííí';
		}, 2000);
	})
	.filter('curr', function ($filter, gettextCatalog) {
		return function (input) {
			return $filter('currency')(input, gettextCatalog.currentLanguage);
		}
	});