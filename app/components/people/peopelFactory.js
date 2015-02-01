angular.module('peopleFactoryModule', []).
    factory('peopleFactory', function(abstractFactory){
	var factory = {};

	var getClassification = function(peopleId){
	    var schoolYear = people[peopleId].schoolYear;
	    if (schoolYear == null || schoolYear == ""){
		return "N/A";
	    }
	    var years = ["Faculty", // 0
			 "Freshman", // 1
			 "Sophomore",  // 2
			 "Junior",  //3
			 "Senior", //4
			 "Graduate", //5
			 "Research Staff", // 6
			 "Admin Staff"]; // 7
	    return years[schoolYear];
	};

	var getDesciplineById = function(desciplineId){
	    return disciplineNames[desciplineId];
	};

	factory.getPeopleById = function(peopleId){
	    var currPeople = people[peopleId];
	    var abstractIds = abstractFactory.getAbstractsByPeople(peopleId);
	    var papers = [];
	    abstractIds.forEach(function(paperId){
		papers.push(abstractFactory.getPaperById(paperId));
	    });
	    return {
		'id' : peopleId,
		'fullName': currPeople.firstname + ' ' + currPeople.lastname,
		'img': currPeople.img,
		'classification': getClassification(peopleId),
		'abstracts': papers, 
		'descipline': getDesciplineById(currPeople.descipline)
	    };
	};
	factory.getClassification = getClassification;
	return factory;
    });
