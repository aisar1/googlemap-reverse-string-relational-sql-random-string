var express = require("express");
var app = express();
var mysql = require("mysql");
var path = require("path");
const collect = require('collect.js');
var distance = require('google-distance-matrix');




app.use(express.urlencoded({extended: true})); //for normal req.body
app.use(express.json());						//for json req.body

app.set("view engine", "ejs"); //for views file only
app.set("views", path.join(__dirname, '/views')); //for globally





 var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'aisardb'
});


 var connection2 = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'logindata'
});


app.get("/googlemap",function(req, res){
	
res.render('googlemappg');
		
})

app.post("/getdatalocation",function(req, res){
	
var locationme = req.body.loc;
var destinationme  = req.body.des;


var origins = [locationme];
var destinations = [destinationme];
 distance.key('AIzaSyCZ7efSCtkqpVF_g4B3YXcRvv4wphwiILM');
distance.matrix(origins, destinations, function (err, distances) {
    if (!err)
        console.log(distances);
	var firstone = distances["rows"][0];
	res.render('toalldatagps',{togpspg:distances,togpspg2:firstone});
	//res.send(distances);
})
	
	
})

app.get("/",function(req, res){
	
res.render('homepg');
		
})

app.get("/gotofilterpg",function(req, res){
	
	var a = 'SELECT * FROM userTable WHERE age>20 order by age desc';
	var b = 'select count(age) AS final from userTable where age>20 and state in("selangor")';
	var c = 'select count(age) AS final from userTable where age>20 and state="sabah"';
	//var d = 'SELECT * FROM userTable WHERE age>20 AND state="johor"';
	//var e = 'SELECT * FROM userTable WHERE age>20 AND state="sarawak"';
	
	connection.query(a,function(error, results, fields){
	if (error) throw error;
	var newresult = results;
	console.log(newresult);
	
	res.render('toresultpg',{toresultpgdata:newresult});	
		
})
	
})

app.post("/tosavedata/:id",function(req, res){
	var id = req.params.id;
console.log(id);
})
	
	



app.get("/generaterandom",function(req, res){

	
	const characters ='ACGHIMNPZWXV';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
	

	
    return result;
	
}
	var resultgenerated = generateString(1);
	
	console.log(resultgenerated);
	res.render('generateresultpg',{togeneratepg:resultgenerated});
})


app.get("/goreversedpg",function(req, res){
res.render('reversedpg');
})

app.post("/savedatareverse",function(req, res){
var textform = req.body.textnew;
	
	function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}
 
var newreversedresult = reverseString(textform);
console.log(newreversedresult);
	
	res.render('reverseresultpg',{toreverseresultpg:newreversedresult});
})

app.listen(6000, function(){
	console.log('You are connected with 6000');
});
