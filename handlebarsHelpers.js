const Handlebars = require('handlebars');
/*
 * Custom theme helpers for Handlebars.js
 */
/************          handlebars helper function      *********/
let themeHelpers = {
    "reverseWord": Handlebars.registerHelper('reverseWord', function (value) {
    var reversedWord = value.split("").reverse().join("");
    return reversedWord;
  }),
    "semesterDisplayer": Handlebars.registerHelper('semesterDisplayer', function (semesterInput) {
        var semester = "" + semesterInput + "";
        var semesterObj = { "08": "Fall", "12": "Winter", "01": "Spring", "05": "Summer" }
        var semesterDis = semesterObj[semester.slice(4, 6)] + " " + semester.slice(0, 4);
      
        return new Handlebars.SafeString(
          "" + semesterDis + ""
        );
      }),
      "tagDisplayer": Handlebars.registerHelper('tagDisplayer', function (tagObj) {
        var html = "";
        for (var tag in tagObj) {
          html += `<span style="padding: 2px; margin-right: 3px; border: solid gray 1px; background-color: gray;"> ${tag}(${tagObj[tag]})</span>`
        }
      
        return new Handlebars.SafeString(
          "" + html + ""
        );
      }),
      "dateDisplayer": Handlebars.registerHelper('dateDisplayer', function (timeStamp) {
  
        let date = new Date(timeStamp);
        date = date.toDateString();
        return date;
      }),
      "selectorDisplayer": Handlebars.registerHelper('selectorDisplayer', function (selectData, options) {
        var html = "";
        //console.log(options.hash.dataAttribs)
        var dataAttribs = JSON.parse(options.hash.dataAttribs);
        //option = {selectData: ,multiple : true, name : , id : "tagList", formName : "addReviewForm"}
        if (dataAttribs.multiple === true) {
            // html += `<select multiple class="form-control" name="${name}" id="tagList" form="addReviewForm">`;
          html += `<select multiple class="form-control" name="${dataAttribs.name}" id="${dataAttribs.id}" form="${dataAttribs.formName}">`;
        } else {
          html += `<select class="form-control" name="${dataAttribs.name}" id="${dataAttribs.id}" form="${dataAttribs.formName}">`;
        }
      
      
        for (let key in selectData) {
          html += `<option value="${key}">${selectData[key]}</option>`
        }
        html += '</select>';
      
        return new Handlebars.SafeString(
          "" + html + ""
        );
      })
};

module.exports = themeHelpers;