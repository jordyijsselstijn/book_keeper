angular.module('book_keeper')
    .service('BookService', ['$http', function ($http) {

        this.insert = function(url, data){
            var fd = new FormData();
            for(var key in data){
                fd.append(key, data[key]);

            }
            console.log(fd);
            return $http.post(url, fd, {
                transformRequest : angular.identity,
                headers : {'Content-Type' : undefined}
            });
        };

        this.insertJson = function(url, data){

            return $http.post(url, data, {
                headers : {'Content-Type' : 'Application/json'}
            });
        };

        this.getAll = function(url){
            return $http.get(url);
        };

        this.getSingle = function(url, id){
            return $http.get(url + "/" + id);
        };

        this.search = function(url, verb){
          return { url : url, search : verb };
        };

        this.getByIsbn = function(isbn){
            return $http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn);
        };
        
        this.removeBook = function(bookId){
          return $http.delete('/api/books/'+ bookId);
        };
            

    }]);