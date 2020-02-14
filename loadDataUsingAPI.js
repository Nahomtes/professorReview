var fs = require('fs');
var professorDataUtil = require('./professor-data-util');


// Importing jquery so it could be used in NodeJs(Server Side).
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

const MAX_PAGE_NUMBER = 32;
const MAX_DATA_PER_PAGE = 100;
var fileNameOriginal = 'professor_original.json';
var fileNameWorking = "professor.json";



//loadDataFromSchoolAPI(fileNameWorking,1);
addMoreKeys(fileNameOriginal);
restoreOriginalData();

function restoreOriginalData() {
    fs.writeFileSync('professor.json', fs.readFileSync('professor_original.json'));
}

function loadDataFromSchoolAPI(fileName, pageNumber) {
    let url = "";

    if (pageNumber > MAX_PAGE_NUMBER) {
        return;
    } else {
        url = `https://api.umd.io/v0/professors?page=${pageNumber}&per_page=${MAX_DATA_PER_PAGE}`;
        
         $.when(
            $.get(url, ()=>console.log("ffffffffffffff")),
            console.log("ffffffffffffff")
        ).then(data=>{
            console.log(pageNumber + ": " + data[0].name)
            concatData(fileName, data)
            pageNumber = pageNumber + 1

            loadDataFromSchoolAPI(fileName, pageNumber)

        }).fail(error =>{
            error => console.log("Errorrr: " + error)
        });
    }
    console.log("ddddddddddd")
    
}

console.log("Done");

function addMoreKeys(fileName){
    // {"name":"William Gasarch","semester":["201901","201908","202001"],
    //"courses":["CMSC250H","CMSC452","CMSC456","ENEE456","MATH456","CMSC858R","MATH858R"],
    //"department":["MATH"]}
    var data = professorDataUtil.loadData(fileName);
    console.log(data[1].name)
    data.forEach(element => {
        element["overAllRating"] = -1;
        element["overAllTags"] = {};
        element["review"] = [];        
    });

    professorDataUtil.saveData(fileName, data);
}

function concatData(fileName, data) {
	// poke.json stores the pokemon array under key "pokemon", 
	// so we are recreating the same structure with this object

     var dataFromFile= professorDataUtil.loadData(fileName);

     let oconcatedData = dataFromFile.concat(data);
     professorDataUtil.saveData(fileName, oconcatedData);
}