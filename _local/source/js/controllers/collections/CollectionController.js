angular.module('book_keeper')
    .controller('CollectionController', [ '$scope', 'CollectionService', 'BookService', '$stateParams', '$mdDialog', function($scope, CollectionService, BookService, $stateParams, $mdDialog){

        //Init function
        (function($scope, CollectionService){
            $scope.collections = [];
            CollectionService.getAllCollections().success(function(response){
                $scope.collections = response;
                $scope.books = [];
            });
        })($scope, CollectionService);

        $scope.toolbox = {
            isOpen : false,
            selectedDirection : 'left',
            selectedMode : 'md-scale'
        };

        //New collection added
        $scope.addNewCollection = function(){
            var collection = $scope.newCollection;

            CollectionService.insertNewCollection(collection)
                .success(function(response){
                    $scope.collections.push(response);
                    $scope.newCollection = {};
                })
                .error(function(response){
                    console.error(response);
                });
        };
        
        $scope.getBooksForCollection = function(){
            $scope.books = [];
            var collectionId = $stateParams.collectionId;
            angular.forEach($scope.collections, function(value, key){
                if(value._id == collectionId){
                    $scope.currentCollection = value;
                    BookService.getAll('/api/books')
                        .success(function(response){
                            angular.forEach($scope.currentCollection.books, function(collectionBook, key){
                                angular.forEach(response, function(responseBook, key){
                                    if(collectionBook == responseBook._id){

                                        $scope.books.push(responseBook);
                                    }
                                })
                            })
                        });
                }
            });

        };

        $scope.addNewBook = function(){

            $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                templateUrl: 'app/templates/books/new2.tpl.html' ,
                controller: ['$scope', 'BookService', '$mdDialog', function($scope, BookService, $mdDialog){

                    $scope.book = {};
                    $scope.book.read = false;

                    //the save method
                    $scope.submit = function() {
                        BookService.insert('api/books/', $scope.book)
                            .success(function(){
                                $scope.books.push($scope.book);
                                $scope.book = {};
                                $mdDialog.hide();
                            });
                    };
                }]
            })

        };

        $scope.addByIsbn = function(){
            $mdDialog.show({
                clickOutsideToClose : true,
                scope : $scope,
                templateUrl : 'app/templates/books/newByIsbn.tpl.html',
                controller : ['$scope', 'BookService', '$mdDialog', function($scope, BookService, $mdDialog){

                    $scope.submit = function(){

                        angular.forEach($scope.listFromResponse, function(item, index){

                            if(item.volumeInfo.title == $scope.selectedBook){

                                var industrId = item.volumeInfo.industryIdentifiers;

                                angular.forEach(industrId, function(identifier, index){
                                    if(identifier.type == 'ISBN_13'){

                                        var isbn = identifier.identifier;
                                        var obj = {};
                                        obj["isbn"] = isbn;

                                        BookService.insertJson('api/books/isbn', obj)
                                            .success(function(){

                                            });
                                    }
                                });

                            }
                        });

                    };

                }]

            })
        };
        
        $scope.removeFromCollection = function(bookId){

            var collection = $scope.currentCollection;
            var objectId = $scope.currentCollection._id;
            // Start with an initial array
            var array = collection.books;

            // Find and remove item from an array
            var i = array.indexOf(objectId);

            if(i != -2) {
                array.splice(i, 1);
            }

            CollectionService.removeBookFromCollection(objectId, {books : array})
                .success(function(response){
                    angular.forEach($scope.books, function(value, key){
                        if(value._id == bookId){
                            $scope.books.splice(key, 1);
                        }
                    })
                });

        };
    }]);