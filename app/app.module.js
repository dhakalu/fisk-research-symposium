var rSApp = angular.module('rSApp', [
    'ngRoute',
    'rSAppRoutes',
    'homePageModule',
    'homeDirectives',
    'abstractModule',
    'abstractControllers',
    'abstractDirectives',
    'peopleModule'
]) 
    .factory('abstractFactory', function(){
	var factory = {};
	// Returns the full name of the people
	var getFullName = function(peopleId){
	    var currPeople = people[peopleId];
	    return currPeople.firstname + ' ' + currPeople.lastname;
	};
	// returns the year of the person with the given id
	factory.getSchoolYear = function(personId){
	    var schoolYear = people[personId].schoolYear;
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
	var getDepartmentName = function(disciplineId){
	var deptId = disciplineNames[disciplineId].deptId;
	var dept = "";
	    if (deptId != null && deptId != ""){
		dept = "Department of " + deptNames[deptId] + ", ";
	    }
	    return dept;
	};
	factory.getAffiliationsDetails = function(paperId){
	    var pAff = papersWithAffiliations[paperId]; 
	    var id, symbol, disciplineId, unilabId;
	    var returnObj = [];
	    for(var i=0; i<pAff.length; i++){
		sam = {};
		id = pAff[i]; 
		symbol = affiliations[id].symbol;
		if (symbol != "0"){
		    sam.symbol = symbol;
		}
		disciplineId = affiliations[id].discipline;
		if (disciplineId == "wellness"){
		    sam.school = "Fisk-Meharry Wellness & Healthcare Project; ";
		} else if (disciplineId == "bad"){
		    aff = getDepartmentName(disciplineId);
		    unilabId = affiliations[id].university;
		    aff += unilabNames[unilabId];
		    sam.school = aff;
		}else{ 
		    var aff = disciplineNames[disciplineId].name + ', ';
		    aff += getDepartmentName(disciplineId);
		    unilabId = affiliations[id].university;
		    aff += unilabNames[unilabId];
		    sam.school = aff;
		}
		returnObj.push(sam);
	    } 
	    return returnObj;
	};
	// returns the authors of the given abstract
	factory.getAuthors = function(abstractId){
	    console.log(abstractId);
	    var allAuthors = [];
	    papersWithAuthors[abstractId].forEach(function(item){
		item.name = getFullName(item.personId);
		allAuthors.push(item);
	    });
	    return allAuthors;
	};

        // returns all the abstracts related to the given people
	factory.getAbstractsByPeople = function(peopleId){
	    var abstracts = [];
	    presenters.forEach(function(item){
		console.log(item);
		if( item.presenterId == peopleId){
		    abstracts.push(item.paperId);
		}
	    });
	    return abstracts;
	};

	factory.getPaperById = function(paperId){
	    var currPaper= papers[paperId];
	    return {
		'id': paperId,
		'title': currPaper.title,
		'presenter': people[currPaper.presenter],
		'authors': factory.getAuthors(paperId)
	    };
	};

	return factory;
    }).filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]).filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
    
