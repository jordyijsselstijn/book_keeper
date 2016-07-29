angular.module('book_keeper')
    .directive('card', function($parse){
        return {
            restrict : 'E',
            scope : {
                type : '@',
                book : '&'
            },
            templateUrl : 'app/templates/directives/card.tpl.html',
            link : function(s,e,a){

                var cardStyle = a.type;
                var proxy = s.book();
                var card = $(e).find('div');
                    s.book = proxy;
                    
                    

            }
        }
    });