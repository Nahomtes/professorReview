/*var sortByGPAForm = document.getElementById("sortByGPAForm");

sortByGPAForm.addEventListener("submit", function(){

    alert("I am here index-fontEnd");
    var selectGPA = document.getElementById("sortByGPAId");

    var GPA = selectGPA.options[selectGPA.selectedIndex].value;

    GPA = parseInt(selectGPA);


    var html = fetch(`http://localhost:3000/sortProfessorByGPA?sortByGPA=${GPA}`);

    document.writeln(html);

}); */