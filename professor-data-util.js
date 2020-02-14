var fs = require('fs');

var originalFile = 'professor_original.json';
var workingFile = "professor.json";


function restoreOriginalData() {
  fs.writeFileSync(workingFile, fs.readFileSync(originalFile));
}

function loadData(fileName) {
  var file = fs.readFileSync(fileName);

  return JSON.parse(file);
}

function saveData(fileName, data) {

  fs.writeFileSync(fileName, JSON.stringify(data));
}

function saveData(data) {

  fs.writeFileSync('professor.json', JSON.stringify(data));
}

var tagObj = {
  "GIVES GOOD FEEDBACK": "GIVES GOOD FEEDBACK",
  "RESPECTED": "RESPECTED",
  "LOTS OF HOMEWORK": "LOTS OF HOMEWORK",
  "ACCESSIBLE OUTSIDE CLASS": "ACCESSIBLE OUTSIDE CLASS",
  "GET READY TO READ": "GET READY TO READ",
  "PARTICIPATION MATTERS": "PARTICIPATION MATTERS",
  "SKIP CLASS? YOU WON'T PASS": "SKIP CLASS? YOU WON'T PASS",
  "INSPIRATIONAL": "INSPIRATIONAL",
  "GRADED BY FEW THINGS": "GRADED BY FEW THINGS",
  "TEST HEAVY": "TEST HEAVY",
  "GROUP PROJECTS": "GROUP PROJECTS",
  "CLEAR GRADING CRITERIA": "CLEAR GRADING CRITERIA",
  "HILARIOUS": "HILARIOUS",
  "BEWARE OF POP QUIZZES": "BEWARE OF POP QUIZZES",
  "AMAZING LECTURES": "AMAZING LECTURES",
  "LECTURE HEAVY": "LECTURE HEAVY",
  "CARING": "CARING",
  "EXTRA CREDIT": "EXTRA CREDIT",
  "SO MANY PAPERS": "SO MANY PAPERS",
  "TOUGH GRADER": "TOUGH GRADER"
}
var gradeObj = {
  4.0: "A+", 4.0: "A", 3.7: "A-", 3.3: "B+", 3.0: "B", 2.7: "B-", 2.3: "C+",
  2.0: "C", 1.7: "C-", 1.3: "D+", 1.0: "D", 0.7: "D-", 0.0: "F"
}

var gradeObj = {
  0.0: "F", 1.0: "D", 2.0: "C", 3.0: "B", 4.0: "A"
}
// /sortProfessorByGPA/para
function sortByGPA(data, GPA) {
  var filteredData = [];
  var round = .999999999;

  filteredData = data.filter(element => {
    if (GPA === 4) {
      round = 0;
    }
    return element.overAllGPA >= GPA && element.overAllGPA <= (GPA + round);
  });

  return filteredData;
}

module.exports = {
  restoreOriginalData: restoreOriginalData,
  loadData: loadData,
  saveData: saveData,
  originalFile: originalFile,
  workingFile: workingFile,
  tagObj: tagObj,
  gradeObj: gradeObj,
  sortByGPA: sortByGPA

}
