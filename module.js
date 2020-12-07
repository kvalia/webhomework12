const bodyParser = require('body-parser');
const express = require('express');
const exp = express();
// Connect to mongo client
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://kunal:webprogramming@homework.b7edt.mongodb.net/companies-db?retryWrites=true&w=majority";
client = new MongoClient(url,{ useUnifiedTopology: true });


exp.use(bodyParser.urlencoded({ extended: true })); 

// Handle post request when information is submitted
exp.post('/app', async (req, res) => {
	var data = [];
  // Get info from request
	await get_ct(req.body.choice, req.body.val).then(info => {
		info.forEach(company => {
			data.push({
				"company": company.company,
				"ticker": company.ticker
			});
		})
	})
  // Show resultss
	console.log(data);
//  	res.send(data);
	res.send("Form was successfully received");
});

// Function to get information based on choice and data inputted
async function get_ct(choice, name) {
  try {
    // Connect to the database and get collection
    await client.connect();
    var dbo = client.db("companies-db");
    var coll = dbo.collection("companies");
    var query = {};
    query[choice] = name;
    await coll.find(query, { _id: 0 }).toArray()
    .then(items => {
      promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(items);
        });
      });
    })
    .catch(err => console.log(err))
    return promise;
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.close();
  }
}

var port = process.env.PORT || 3000;

exp.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
