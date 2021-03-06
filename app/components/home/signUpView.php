<div class="modal-content">
  <div class="modal-header">
    <h4> SignUp for Fisk Research Symposium App</h4>
  </div>
  <div class="modal-body">
    <form name="signupForm">
      <div class="form-group has-feedback" ng-class="{'has-warning': signupForm.username.$invalid,
	   'has-error': signupForm.lastname.$invalid && signupForm.username.$dirty,
	   'has-success': signupForm.username.$valid}">
	<input type="text" name="username" ng-model="user.username" 
	       class="form-control" placeholder="Username" required>
	<span class="glyphicon glyphicon-warning-sign form-control-feedback" 
	      ng-show="signupForm.username.$pristine" aria-hidden="true"></span>
	<span ng-show="signupForm.username.$invalid && signupForm.username.$dirty" 
	      class="glyphicon glyphicon-remove form-control-feedback"></span>
	<span ng-show="signupForm.username.$valid" 
	      class="glyphicon glyphicon-ok form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback" ng-class="{'has-warning': signupForm.firstname.$invalid,
	   'has-error': signupForm.lastname.$invalid && signupForm.firstname.$dirty,
	   'has-success': signupForm.firstname.$valid}">
	<input type="text" name="firstname" ng-model="user.firstname" 
	       class="form-control" placeholder="First Name" required>
	<span class="glyphicon glyphicon-warning-sign form-control-feedback" 
	      ng-show="signupForm.firstname.$pristine" aria-hidden="true"></span>
	<span ng-show="signupForm.firstname.$invalid && signupForm.firstname.$dirty" 
	      class="glyphicon glyphicon-remove form-control-feedback"></span>
	<span ng-show="signupForm.firstname.$valid" 
	      class="glyphicon glyphicon-ok form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback" ng-class="{'has-warning': signupForm.lastname.$invalid,
	   'has-error': signupForm.lastname.$invalid && signupForm.lastname.$dirty,
	   'has-success': signupForm.lastname.$valid}">
	<input type="text" name="lastname" ng-model="user.lastname" 
	     class="form-control" placeholder="Last Name" required>
      <span class="glyphicon glyphicon-warning-sign form-control-feedback" 
	    ng-show="signupForm.lastname.$pristine" aria-hidden="true"></span>
      <span ng-show="signupForm.lastname.$invalid && signupForm.lastname.$dirty" 
	    class="glyphicon glyphicon-remove form-control-feedback"></span>
      <span ng-show="signupForm.lastname.$valid" 
	    class="glyphicon glyphicon-ok form-control-feedback"></span>
      
      </div>
      <div class="form-group has-feedback" ng-class="{'has-warning': signupForm.classification.$invalid,
	   'has-error': signupForm.classification.$invalid && signupForm.classification.$dirty,
	   'has-success': signupForm.classification.$valid}">
	<select class="form-control" ng-model="user.classification" required>
	  <option selected value=""> Select your classification </option>
	  <option>Freshmen</option>
	  <option>Sophomore</option>
	  <option>Junior</option>
	  <option>Senior</option>
	  <option>Graduate Student</option>
	  <option>Faculty</option>
	</select>
      </div>
      <div class="form-group has-feedback" ng-class="{'has-warning': signupForm.email.$invalid,
	   'has-error': signupForm.email.$invalid && signupForm.email.$dirty,
	   'has-success': signupForm.email.$valid}">
	<input type="email" name="email" ng-model="user.email" 
	       class="form-control" placeholder="Email" required>
	<span class="glyphicon glyphicon-warning-sign form-control-feedback" 
	      ng-show="signupForm.email.$pristine" aria-hidden="true"></span>
	<span ng-show="signupForm.email.$invalid && signupForm.email.$dirty" 
	      class="glyphicon glyphicon-remove form-control-feedback"></span>
	<span ng-show="signupForm.email.$valid" 
	      class="glyphicon glyphicon-ok form-control-feedback"></span>

      </div>
      <div class="form-group has-feedback" ng-class="{'has-warning': signupForm.password.$invalid,
	   'has-error': signupForm.password.$invalid && signupForm.lastname.$dirty,
	   'has-success': signupForm.password.$valid}">
	<input type="password" name="password" ng-model="user.password"
	       class="form-control" placeholder="Password" required>
	<span class="glyphicon glyphicon-warning-sign form-control-feedback" 
	      ng-show="signupForm.password.$pristine" aria-hidden="true"></span>
	<span ng-show="signupForm.password.$invalid && signupForm.password.$dirty" 
	      class="glyphicon glyphicon-remove form-control-feedback"></span>
	<span ng-show="signupForm.password.$valid" 
	      class="glyphicon glyphicon-ok form-control-feedback"></span>
      </div>
    </form>
  </div>
  <div> {{error_message}}</div>
  <div ng-show="signupForm.$invalid" class="alert alert-warning content">
    Fill all the required field before submitting the form.
  </div>
  <div class="modal-footer" style="display: flex">
    <div>
      <button type="button" class="btn btn-default" ng-click="cancel()">Close</button>
    </div>
    <div ng-show="signupForm.$valid" style="margin-left: 10px">
      <button type="button" class="btn btn-primary" ng-click="signup()">Save changes</button>
    </div>
  </div>
</div>
