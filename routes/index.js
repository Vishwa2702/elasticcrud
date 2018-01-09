var myexpress = require('express');
var  myroutes= require('./route.js');
var router =myexpress.Router();

router.get('/user',myroutes.getall);
router.get('/user/:pid',myroutes.getbyId);
router.post('/user',myroutes.user_post);
router.post('/user/:pid',myroutes.postbyId);
router.put('/user/:pid',myroutes.user_put);
router.delete('/user/:pid',myroutes.deletebyId);
router.get('/usernameexact/:pname',myroutes.exact_search);
router.get('/usernamepartial/:pname',myroutes.partial_search);
router.get('/and',myroutes.querystringand);
router.get('/or',myroutes.querystringor);
router.get('/dismax', myroutes.querydismax);
router.get('/constantscore',myroutes.queryconstantscrore);
router.get('/bool',myroutes.querybool);

module.exports =router;