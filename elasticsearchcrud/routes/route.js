var express = require('express');
var router =express.Router();
// var app =express();
var client = require ('../server.js');

var getall = function(req, res){
	console.log("getting all records.");
	client.search({	
		index: 'vishwa',
    	type: 'external',
    	body: {
        	"query": {
    	    	"match_all": {}
        	}
    	}
	}).then((response)=>{
	     res.send(response);
	     //console.log("get all user",res);
	}).catch((err)=>{
		res.send(err);
		console.log("unexpected error",err);
	})
};

var getbyId = function (req, res) {
	console.log ( "getting record with id");
	//console.log("this is id--->>>",req.params.pid);
	var _id = req.params.pid;
	//console.log("this is _id-->>",_id);
    client.get({
        index: 'vishwa',
        id: _id,
        type: 'external',
    }).then((response)=>{
	    res.send(response);
	    //console.log("user getbyid",res);
	}).catch((err)=>{
		console.log("unexpected error",err);
	})
};

var user_post =function (req, res){
	console.log("user post");
	const user = req.body;
	client.index({
        index: 'vishwa',
        type: 'external',
        body: user,
    }).then((response)=>{
	    res.send(response);
		//console.log("user added succesfully",res);
	}).catch((err)=>{
		console.log("unexpected error",err);
	}) 	
};

var postbyId =function (req, res){
	console.log("user post by id");
	const user = req.body;
	var _id = req.params.pid;
	//console.log("this is id for post--->>>>" , req.params.pid);
	client.index({
        index: 'vishwa',
        type: 'external',
        id: _id,
        body: user,
    }).then((response)=>{
	    res.send(response);
		//console.log("user updated by id",res);
	}).catch((err)=>{
		res.send(err);
		console.log("unexpected error",err);
	}) 	
};

var user_put = function (req, res) {
	console.log (" upadte record with id");
	console.log("this id will be updated--->>>",req.params.pid);
	const user = req.body;
    var _id = req.params.pid;
    client.update({
    	index: 'vishwa',
        id: _id,
        type: 'external',
        body: {
        	"doc": {
        		"name": user.name,
              	"age": user.age
            }
        }
    }).then((response)=>{
	    res.send(response);
		//console.log("user updated",res);
	}).catch((err)=>{
		res.send(err);
		console.log("unexpected error",err);
	})
};

var deletebyId = function (req, res) {
	console.log(" record delete by id");
	//console.log("user delete id---->>>>",req.params.pid);
	var _id = req.params.pid;
    client.delete({
    index: 'vishwa',
    type: 'external',
    id: req.params.pid
    }).then((response)=>{
	    res.send(response);
		//console.log("user deleted by id",res);
	}).catch((err)=>{
		res.send(err);
		console.log("unexpected error",err);
	})	
};

// var exact_search = function(req , res){
// 	console.log("exact search records");
// 	//console.log("this is text to be serch--->>>",req.params.pname);
// 	client.search({
// 		index : 'vishwa',
// 		type : 'external',
// 		body : {
// 			"query": {
//     			"query_string" : {	
//     				"query" : req.params.pname
//     			}
// 			}
// 		}	 
// 	}).then((response)=>{
// 		res.send(response);
// 		//console.log("exact_search data--->>>",response);
// 	}).catch((err)=>{
// 		res.send(err);
// 		console.log("unexpected error", err);
// 	})
// };

var exact_search = function(req , res){
	console.log("exact search records");
	//console.log("this is text to be serch--->>>",req.params.pname);
	client.search({
		index : 'vishwa',
		type : 'external',
		body : {
			"query": {
    			"match" : {	
    				"name" : req.params.pname
    			}
			}
		}	 
	}).then((response)=>{
		res.send(response);
		//console.log("exact_search data--->>>",response);
	}).catch((err)=>{
		res.send(err);
		console.log("unexpected error", err);
	})
};

// var partial_search = function(req , res){
// 	console.log("partial search records");
// 	//console.log("this is text to be serch--->>>",req.params.pname);
// 	//var getname = req.params.pname + "*";
// 	client.search({
// 		index : 'vishwa',
// 		type : 'external',
// 		body : {
// 			"query": {
//         		"match_phrase_prefix" : {
//         			"name" : req.params.pname+"*"
//         			//"name" : "getname"
//     			}
//     		}
// 		}
// 	}).then((response)=>{
// 		res.send(response);
// 		// console.log("partial_search data--->>>",response);
// 	}).catch((err)=>{
// 		res.send(err);
// 		console.log("unexpected error", err);
// 	})
// };

var partial_search = function(req , res){
	console.log("partial search records");
	//console.log("this is text to be serch--->>>",req.params.pname);
	//var getname = req.params.pname + "*";
	client.search({
		index : 'vishwa',
		type : 'external',
		body : {
			"query": {
        		"query_string" : {
        			"query" : req.params.pname+"*"
        			//"name" : "getname"
    			}
    		}
		}
	}).then((response)=>{
		res.send(response);
		// console.log("partial_search data--->>>",response);
	}).catch((err)=>{
		res.send(err);
		console.log("unexpected error", err);
	})
};

var querystringand = function(req , res){
	console.log("query_string and query");
	client.search({
		index : 'vishwa',
		type : 'external',
		body : {
			"query": {
        		"query_string" : {
        			"default_field" : "name",
        			"query" : "vishwa AND patel"
        		}
    		}
		}
	}).then((response)=>{
		res.send(response);
	}).catch((err)=>{
		res.send(err);
		console.log("unexpected error", err);
	})
};

var querystringor = function(req , res){
	console.log("query_string or query");
	client.search({
		index : 'vishwa',
		type : 'external',
		body : {
			"query": {
        		"query_string" : {
        			"default_field" : "name",
        			"query" : "vishwa OR jerry"
        		}
    		}
		}
	}).then((response)=>{
		res.send(response);
	}).catch((err)=>{
		res.send(err);
		console.log("unexpected error", err);
	})
};

var querydismax = function(req , res){
	console.log("dis_max query");
	client.search({
		index : 'vishwa',
		type : 'external',
		body : {
			"query": {
        		"dis_max" : {
            		"tie_breaker" : 0.0,
            		"boost" : 1.2,
            		"queries" : [
                		{
                    		"term" : { "name" : "vishwa" }
                    		//"term" : { "age" : 23 }
                		},
                		{
                    		"term" : { "name" : "harsha" }
                    		//"term" : { "age" : 25 }
                		}
            		]
        		}
    		}
		}
	}).then((response)=>{
		res.send(response);
	}).catch((err)=>{
		res.send(err);
		console.log("unexpected error", err);
	})
};

var queryconstantscrore = function(req , res){
	console.log("constant_score query");
	client.search({
		index : 'vishwa',
		type : 'external',
		body : {
			"query": {
        		"constant_score" : {
            		"filter" : {
                		"term" : { "age" : 23}
                		//"term" : { "name" : "vishwa"}
            		},
            		"boost" : 1.2
        		}
    		}
		}
	}).then((response)=>{
		res.send(response);
	}).catch((err)=>{
		res.send(err);
		console.log("unexpected error", err);
	})
};

var querybool = function(req , res){
	console.log("bool query");
	client.search({
		index : 'vishwa',
		type : 'external',
		body : {
			"query": {
    			"bool" : {
      				"must" : {
        				"term" : { "name" : "vishwa" }
      				},
      				"filter": {
        				"term" : { "age" : 25 }
      				},
      				"must_not" : {
        				"range" : {
          					"age" : { "gte" : 50, "lte" : 20 }
        				}	
      				},
      				"should" : [
        				{ "term" : { "name" : "vishwa" } },
        				{ "term" : { "age" : 25 } }
      				],
      				"minimum_should_match" : 1,
      				"boost" : 1.0
    			}
  			}
		}
	}).then((response)=>{
		res.send(response);
	}).catch((err)=>{
		res.send(err);
		console.log("unexpected error", err);
	})
};

module.exports={
	getall: getall,
	getbyId: getbyId,
	user_post : user_post,
	postbyId : postbyId,
	user_put : user_put,
	deletebyId : deletebyId,
	exact_search : exact_search,
	partial_search :partial_search,
	querystringand : querystringand,
	querystringor : querystringor,
	querydismax : querydismax ,
	queryconstantscrore : queryconstantscrore,
	querybool : querybool,
}