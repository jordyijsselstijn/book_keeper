angular.module('book_keeper')
    .directive('search', ['BookService', function(BookService){

        return {
            restrict : 'E',
            templateUrl : 'app/templates/directives/search.tpl.html',
            link : function(s,e,a){

                var mag = $(e).find('img');
                var input = $(e).find('input');

                
                mag.on('click', function(event){
                   input.toggleClass('open');
                });
                
                var doSearch = function(){
                    if(angular.isDefined(s.searchVal)){
                        console.log(BookService.search('Jemoeder.nl', s.searchVal));
                    }else{
                        console.log("nothing to search for!");
                    }
                };
                
                e.on('keyup', function(event){
                    if(event.keyCode == 13){
                        doSearch();
                    }
                }.bind(this));
            }
        }
    }]);