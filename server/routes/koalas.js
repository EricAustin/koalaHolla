var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.post('/', function (req, res) {
	console.log('koala post was hit!');

	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {

			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {

			client.query('INSERT INTO koalaholla(name, age, gender, ready_for_transfer, notes) VALUES($1,$2,$3,$4,$5);', [req.body.name, req.body.age, req.body.gender, req.body.transfer, req.body.notes], function (errorMakingQuery, result) {
				done();
				if (errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.sendStatus(201);
				}
			});
		}
	});
});


router.put('/:id', function(req, res){
	var koalaId = req.params.id;
	console.log('');
	pool.connect(function(errorConnectingToDatabase, client, done){
		if(errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			client.query('UPDATE koalaholla SET ready_for_transfer=$1 WHERE id=$2', //why doesn't this work? UPDATE koalaholla SET ready_for_transfer="Y" WHERE id=$1
							['Y', koalaId], 
							function(errorMakingQuery, result) {
				done();
				if(errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			});
		}
	});
});

router.delete('/:id', function(req, res){
	var koalaId = req.params.id; 
	console.log('');
	pool.connect(function(errorConnectingToDatabase, client, done){
		if(errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			client.query('DELETE FROM koalaholla WHERE id=$1', 
							[koalaId], 
							function(errorMakingQuery, result) {
				done();
				if(errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			});
		}
	});
});

router.get('/', function (req, res) {
	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			client.query('SELECT * FROM koalaholla;', function (errorMakingQuery, result) {
				done();
				if (errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.send(result.rows);
				}
			});
		}
	});
});

module.exports = router;