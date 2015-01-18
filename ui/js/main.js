requirejs.config({
	paths:{
		jquery: 'bower_components/jquery/dist/jquery.min',
		bootstrap: 'bower_components/bootstrap/dist/js/bootstrap.min',
		app: 'app'
	},
	
	shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    callback:function(){
    	require(['app'], function(app){

		});
    }
});