var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var professorDataUtil = require('./professor-data-util');
const Handlebars = require('handlebars');
var helpers = require("./handlebarsHelpers");


var app = express();
const PORT = process.env.PORT;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/" }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));


//professorDataUtil.restoreOriginalData();

// Load contents of professor.json into global variable. 
var _DATA = professorDataUtil.loadData(professorDataUtil.workingFile);

//console.log("Data is: " + JSON.stringify(_DATA));





// Home 
app.get('/', function (req, res) {


  res.render('home', {
    data: _DATA
  })
});
app.get('/api/getReviews', function (req, res) {

  res.send(JSON.stringify(_DATA));
});

app.get("/recentReviews", function (req, res) {
  var result = [];
  var timeStamp = 0;
  var date = new Date();
  _DATA.forEach(element => {

    if (element.reviews.length > 0) {



      timeStamp = element.reviews.forEach(elem => {
        timeStamp = elem["timeStamp"];

        let elementDate = new Date(timeStamp);
        if (elementDate.getFullYear() === date.getFullYear() &&
          elementDate.getMonth() === date.getMonth() && elementDate.getUTCDay() === date.getUTCDay()) {
          if (result.includes(element) === false)
            result.push(element);
        }
      })

    }

  });
  res.render('recentReviews', {
    data: result
  });
});
//sortProfessorByGPA
app.get("/sortProfessorByGPASTOP", function (req, res) {
  var filteredData = [];
  var sortByGPA = 2;

  filteredData = _DATA.filter(element => {

    return element.overAllGPA <= sortByGPA;
  });

  res.render('sortProfessorByGPA', {
    data: filteredData,
    gradeObj: professorDataUtil.gradeObj
  })
});

app.get("/sortProfessorByGPA", function (req, res) {
  var filteredData = [];
  var sortByGPA = parseInt(req.query.sortByGPA);

  // If and only if the user provide us with GPA
  if (sortByGPA) {
    filteredData = professorDataUtil.sortByGPA(_DATA, sortByGPA)
  }

  res.render('sortProfessorByGPA', {
    data: filteredData,
    gradeObj: professorDataUtil.gradeObj,
    sortByGPA: sortByGPA
  })
});


app.get("/fiveStarProfessors", function (req, res) {

  var fiveStarProfessors = [];

  fiveStarProfessors = _DATA.filter(element => {
    return element.overAllRating === 5;
  });


  res.render('fiveStarProfessors', {
    data: fiveStarProfessors
  });
});
app.get("/oneStarProfessors", function (req, res) {
  var oneStarProfessors = [];

  oneStarProfessors = _DATA.filter(element => {
    return element.overAllRating <= 1;
  });


  res.render('oneStarProfessors', {
    data: oneStarProfessors
  });
})


app.get("/bestProfessorBYGPA", function (req, res) {
  //var departmentName = req.param.departmentName;
  var reviewObjByDep = [];


  reviewObjByDep = _DATA.filter(element => {
    return element.overAllGPA >= 3.7;
  });

  res.render('bestProfessorBYGPA', {
    data: reviewObjByDep
  });
});



app.get('/addReview', function (req, res) {

  res.render('addReview', {
    tagObj: professorDataUtil.tagObj,
    gradeObj: professorDataUtil.gradeObj
  });
  // res.send( _DATA);
});
// Adding professor
app.post('/addReview', function (req, res) {
  //console.log("/addReview post is called")
  var body = req.body;
  //console.log(body)
  let professorName = body.professorName, departmentName = body.departmentName,
    courseToReview = body.courseToReview, selectedYear = body.selectedYear,
    selectedSemester = body.selectedSemester, ratingValue = parseInt(body.ratingValue),
    selectedTags = body.selectedTags
  // console.log(selectedTags);


  let selectedComment = body.selectedComment, gradeReceived = parseFloat(body.gradeReceived)

  let semester = selectedYear.trim() + "" + selectedSemester.trim();
  let timeStamp = new Date();
  timeStamp = timeStamp.getTime();

  let reviewObj = {
    "course": courseToReview, "semester": parseInt(semester), "rating": ratingValue,
    "tags": selectedTags,
    "comment": selectedComment,
    "gradeReceived": gradeReceived,
    "timeStamp": timeStamp
  };

  //console.log(JSON.stringify(body));
  // console.log("Body is loaded")

  // save the body into your professo
  var flag = false;
  _DATA.forEach(element => {
    // if professor obj already exists
    if (element.name === professorName) {
      flag = true;
      element.semester.push(semester);

      element["courses"].push(courseToReview);
      element.department.push(departmentName);
      selectedTags.forEach(tag => {
        if (element.overAllTags[tag]) {
          element.overAllTags[tag]++;
        } else {
          element.overAllTags[tag] = 1
        }
      });


      if (element.overAllRating === -1) {
        element.overAllRating = ratingValue;
        element.overAllGPA = gradeReceived;
      } else {

        let numberOfReviews = element.reviews.length;
        element.overAllRating = ((element.overAllRating * numberOfReviews) + ratingValue) / (numberOfReviews + 1);
        element.overAllGPA = ((element.overAllGPA * numberOfReviews) + gradeReceived) / (numberOfReviews + 1)
      }

      element.reviews.push(reviewObj);

    }
  });

  var professorObjToBeAdd = {};
  // if not then create one and push it
  if (flag === false) {
    professorObjToBeAdd = {
      "name": professorName,
      "semester": [semester],
      "courses": [courseToReview],
      "department": [departmentName],
      "overAllTags": {},
      "overAllRating": ratingValue,
      "overAllGPA": gradeReceived,
      "reviews": [reviewObj]
    }

    selectedTags.forEach(tag => {
      if (professorObjToBeAdd.overAllTags[tag]) {
        professorObjToBeAdd.overAllTags[tag]++;
      } else {
        professorObjToBeAdd.overAllTags[tag] = 1
      }
    });

    _DATA.push(professorObjToBeAdd);
  }
  // console.log("After submiting a review data is:");
  // console.log(JSON.stringify(_DATA));

  // });
  // //console.log("After submiting a review data is: " + _DATA);
  professorDataUtil.saveData(_DATA);
  // // // Save new blog post
  // // _DATA.push(req.body);
  // // dataUtil.saveData(_DATA);


  res.redirect('/');
});


app.listen(process.env.PORT || 3000, function () {
  console.log(`Listening on port http://localhost:${PORT}'/'`);
});
