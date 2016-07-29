angular.module('book_keeper')
    .directive('isbn', ['BookService', function(BookService){
        return {
            restrict : 'A',
            link : function(s,e,a){
                e.on('blur', function(e){
                    var value = e.target.value;
                        if(value.length > 0){
                            BookService.getByIsbn(value)
                                .success(function(response){
                                        s.listFromResponse = response.items;
                                })
                        }else{
                            $('#book_image_placeholder').html( '<div id="book_image_placeholder"></div>');
                            s.listFromResponse = [];
                        }
                });
            }
        }
    }]);