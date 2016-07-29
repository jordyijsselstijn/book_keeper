angular.module('book_keeper')
    .service('CollectionService', ['$http', function($http){

        return{
            getAllCollections : function(){
                return $http.get('/api/collections');
            },
            getCollectionById : function(id){
                return $http.get('/api/collections/' + id);
            },
            insertNewCollection : function(data){
                return $http.post('/api/collections', data);
            },
            insertBookIntoCollection : function(objectId, data){
                return $http.put('/api/collections/'+objectId, data);
            },
            removeBookFromCollection : function(objectId, data){
                return $http.put('/api/collections/'+objectId, data);
            }
        }

    }]);