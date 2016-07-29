angular.module('book_keeper')
    .config(['$urlRouterProvider', '$stateProvider', function($urlProvider, $stateProvider){

    var templateHome = 'app/templates/';
    $stateProvider
        .state('home', {
            url : '/home',
            templateUrl : templateHome + 'home.tpl.html'
        })
        .state('collections', {
            url : '/collections',
            abstract : true,
            template : '<div data-ng-controller="CollectionController" ui-view></div>'
        })
        .state('collections.overview', {
            url : '/all',
            templateUrl : templateHome + 'collections/collections.tpl.html'
        })
        .state('collections.detail',{
            url : '/{collectionId}',
            templateUrl : templateHome + 'collections/collections.detail.tpl.html'
        })
        .state('books', {
            abstract : true,
            url : '/books',
            templateUrl : templateHome + 'books/books.tpl.html'
        })
        .state('books.overview',{
            url : '/all',
            templateUrl : templateHome + 'books/overview.tpl.html'
        })
        .state('books.detail', {
            url : '/{bookId}',
            templateUrl : templateHome + 'books/detail.tpl.html'
        });


}]);