angular.module('book_keeper')
    .directive('bookFromList', [ '$compile', function($compile){
        return {
            restrict : 'E',
            template : '<md-radio-button value="{{book.volumeInfo.title}}" class="md-primary">{{book.volumeInfo.title}} by {{book.volumeInfo.authors[0]}}</md-radio-button>',
            link : function(s,e,a){

                s.$watch('book', function(oldV, newV){

                    
                    if(newV && newV.volumeInfo.hasOwnProperty('imageLinks')){
                        var lazyImage   = '<img data-ng-src="{{book.volumeInfo.imageLinks.thumbnail}}" id="book_image_placeholder" alt="{{book.volumeInfo.title}}">';
                        var compiled    = $compile( lazyImage )( s );
                        $('#book_image_placeholder').html( compiled );
                    }

                });

            }
        }
    }]);