
# PROJECT NAME

---

Name: Nahom Tesfatsion

Date: October 27, 2019

Project Topic: Professor Review

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: name           	`Type: String`
- `Field 2`: courses          	`Type: [String]`
- `Field 3`: departments        `Type: [String]`
- `Field 4`: overAllRating     	`Type: Number`
- `Field 5`: overAllGPA     	`Type: Number`
- `Field 6`: overAllTags           	`Type: {String}` 
- `Field 7`: review           	`Type: [{String, Number,Number,[String],String,Number]`

Schema: 
```javascript
{
    name : String,
    courses : [String],
	 departments : [String],
    overAllRating : Number,
    overAllGPA : Number,
    overAllTags : {String:Number}
    reviews : [
                  {
                     course : String, 
                     semester : Number,
                     rating : Number,
                     tags : [String],
                     comment : String,
                     timestamp : Number
                  }
               ],
   
}

```

### 2. Add New Data

HTML form route: `/addReview`

POST endpoint route: `/api/addReview`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/...',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       name : "Nelson Padua-Perez"
       course : "CMSC216",
       department : "CMSC",
       semester : 201908,
       tags : ["HILARIOUS", "RESPECTED", "AMAZING LECTURES"]
       comment : "He is a very engaging teacher and makes sure to get to know people as best as possible in a large class.",
       rating : 5
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getReviews`

### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. 5 Star Rating Professor-> `/fiveStarProfessors`
2. 1 star or less Rating Professor -> `/oneStarProfessors`
3. Search Best Professor By GPA-> `/bestProfessortBYGPA`
4. recently added reviews within one days-> `/recentReviews `
5. search by tags -> `/lowestProfessortBYGPA`



