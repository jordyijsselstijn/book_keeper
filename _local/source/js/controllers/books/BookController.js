angular.module('book_keeper')
    .controller('BookController', ['$scope', 'BookService', 'CollectionService', '$mdDialog',
        function($scope, BookService, CollectionService, $mdDialog){
            $scope.books = [];
            $scope.viewModel = {};
            $scope.toolbox = {
                isOpen : false,
                selectedDirection : 'left',
                selectedMode : 'md-scale'
            };
            $scope.currentCollection = '';
            $scope.loader = {};
            $scope.loader.activated = true;
            $scope.collections = [];
            (function($scope, CollectionService, BookService){
                BookService.getAll('/api/books')
                    .success(function(response){
                        $scope.books = response;
                        $scope.loader.activated = false;
                    })
                    .error(function(response){
                        console.log(response);
                    });
                CollectionService.getAllCollections()
                    .success(function(response){
                        $scope.collections = response;
                    })
                    .error(function(response){
                        console.log(response);
                    });
            })($scope, CollectionService, BookService);

            

            $scope.addNewBook = function(){

                $mdDialog.show({
                    
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
                    scope : $scope,
                    templateUrl : 'app/templates/books/newByIsbn.tpl.html',
                    controller : ['$scope', 'BookService', '$mdDialog', 
                                function($scope, BookService, $mdDialog){

                      $scope.submit = function(){

                          angular.forEach($scope.listFromResponse, function(item, index){

                              if(item.volumeInfo.title == $scope.selectedBook){
                                  angular.forEach(item.volumeInfo.industryIdentifiers, function(identifier, index){
                                      if(identifier.type == 'ISBN_13'){
                                          var isbn = identifier.identifier;
                                          var obj = {isbn : isbn};
                                          BookService.insertJson('api/books/isbn', obj)
                                              .success(function(){
                                                  BookService.getAll('api/books')
                                                      .success(function(response){
                                                          $scope.books = response;
                                                      });
                                              });
                                      }
                                  });

                              }
                          });

                      };

                    }]

                })
            };

            $scope.removeBookFromCollection = function(){

            };

            $scope.addBookToCollection = function(bookId, collectionId){

                var id = collectionId;

                CollectionService.getCollectionById(id)
                    .success(function(response){
                        if(response.books.length == 0 ){
                            response.books.push(bookId);
                            CollectionService.insertBookIntoCollection(id, response)
                                .success(function(response){
                                    console.log(response);
                                });
                        }else{
                            angular.forEach(response.books, function(value, key){
                                if(value != bookId){
                                    response.books.push(bookId);
                                    CollectionService.insertBookIntoCollection(id, response)
                                        .success(function(response){
                                            console.log(response);
                                        });
                                }
                            });
                        }

                    });
            };

            $scope.removeBook = function(bookId){
                $mdDialog.show({
                    scope : $scope,
                    templateUrl : 'app/templates/books/removePrompt.tpl.html',
                    controller : ['$scope', 'BookService', '$mdDialog', function($scope, BookService, $mdDialog){

                        $scope.clearDialog = function(){
                            $mdDialog.hide();
                        };
                        $scope.confirm = function(){
                            var id = $scope.bookToDelete._id;

                            BookService.removeBook(id)
                                .success(function(response){
                                    console.log(response);
                                    angular.forEach($scope.books, function(value, key){
                                       if(value._id == id){
                                           $scope.books.splice(key, 1);
                                       }
                                    });
                                    $mdDialog.hide();
                                });

                        };
                        angular.forEach($scope.books, function(value, key){
                           if(value._id == bookId){
                               $scope.bookToDelete = value;
                           }
                        });

                    }]

                })
            }

    }]);