<?php
// Sinec this page runs only once we have to drop all the tables at first to not allowing duplicates
include_once('db_connection.php');
R::nuke();

// Create the user table with the following data
$user1 = R::dispense('user');
$user1->firstname = 'Upendra';
$user1->middlenaem = '';
$user1->lastname = 'Dhakal';
$user1->username = 'dhakalu';
$user1->email = 'dhakal.upenn@gmail.com';
$user1->password = md5('dhakalu');
$user1->classification = 'Freshman';
$user1->discipline = 14;
$user1->department = 5;
$user1->institution = 1;
$user1->profilepic = 'default_propic.jpg';
$id = R::store($user1);

// Create the abstract table with the following 

$search = R::dispense('search');
$search->title = 'Upendra Dhakal';
$search->keywords = 'Upendra, Dhakal, dhakalu, dhakal.upenn@gmail.com, Computer Science, Freshman';
$search->link = 'http://facebook.com/iamupen';
$id = R::store($search);


// create abstract table
$abstract = R::dispense('abstract');
$abstract->title = 'This is the sample title';
$abstract->advisor = $user1;
$abstract->body = 'This is the long body of the abstract tthat hgsjhaf agfjhdsgfjhgdsjhg';
$abstract->presenter = $user1;
$abstract->external_menotor = 'Richard Haugland';
$abstract_id = R::store($abstract);

//authors table
$author1 = R::dispense('author');
$author1->username = 'Upendra Dhakal';
$author1->abstract_id = $abstract;
$author1->presenter = false;
$author1->order = 1;
R::store($author1);


////////////////////////////////////////////////////
//                                               //
//               department table               //
//                                             //
////////////////////////////////////////////////

$dept1 = R::dispense('department');
$dept1->title = 'Arts & Languages';
$dept1->dpt_id = 'al';
$dept2 = R::dispense('department');
$dept2->title = 'Business Administration';
$dept2->dpt_id = 'bad';
$dept3 = R::dispense('department');
$dept3->title = 'Behavorial Science & Education';
$dept3->dpt_id = 'bse';
$dept4 = R::dispense('department');
$dept4->title = 'History and Political Science';
$dept4->dpt_id = 'hps';
$dept5 = R::dispense('department');
$dept5->title = 'Life & Physical Sciences';
$dept5->dpt_id = 'lps';
$dept6 = R::dispense('department');
$dept6->title = 'Mathematics & Computer Science';
$dept6->dpt_id = 'mcs';
$dept7 = R::dispense('department');
$dept7->title = 'Wellness & Healthcare';
$dept7->dpt_id = 'wellness';
R::store($dept1);R::store($dept2);R::store($dept3);R::store($dept4);R::store($dept5);R::store($dept6); R::store($dept7);

////////////////////////////////////////////////////
//                                               //
//             Institutions table               //
//                                             //
////////////////////////////////////////////////
$inst1 = R::dispense('institution');
$inst1->name = "*Not Listed";
$inst1->address="None";
R::store($inst1);
 
R::exec("insert into institution(name, address) values
	     ('Fisk University', 'Nashville, TN 37208'),
	     ('Meharry Medical College', 'Nashville, TN 37208'),
	     ('Tennessee State University', 'Nashville, TN 37209'),
	     ('IUPUI', ' Indianapolis IN 46202'),
	     ('Vanderbilt University', 'Nashville, TN 37235'),
	     ('North Carolina State University', 'Raleigh, NC 27695'),
	     ('Case Western Reserve University', 'Cleveland, OH 44106 ')
	     ");



//////////////////////////////////////////////
//            DESCIPLINES                  //
////////////////////////////////////////////
$desci = R::dispense('discipline');
$desci->did = 'art';
$desci->name = 'Art';
R::store($desci);
R::exec("insert into discipline(did, name) values
	     ('art', 'Art'),
	     ('eng', 'English'),
	     ('mfl', 'Modern Foreign Lang.'),
	     ('mus', 'Music'),
	     ('psy', 'Psychology'),
	     ('soc', 'Sociology'),
	     ('ted', 'Teacher Ed.'),
	     ('his', 'History'),
	     ('psc', 'Political Science'),
	     ('bad', 'Business Administration'),
	     ('bio', 'Biology'),
	     ('che', 'Chemistry'),
	     ('phy', 'Physics'),
	     ('cs', 'Computer Science'),
	     ('math', 'Mathematics'),
	     ('wellness', 'Wellness & Healthcare'),
	     ('bioChem', 'Biochemistry and Cancer Biology'),
	     ('hema', 'Hematology and Oncology'),
	     ('imsp', 'Interdisciplinary Materials Science Program'),
	     ('me', 'Mechanical Engineering'),
	     ('bme', 'Biomedical Engineering'),
	     ('fiskBridge', 'Fisk-Vanderbilt Masters-PhD Bridge Program'),
	     
	     ('astroPhy', 'Physics and Astronomy'),
	     ('macroMolecular', 'Macromolecular Science and Engineering')
");

$abstracts = R::findAll('abstract');
print_r($abstracts);

?>
