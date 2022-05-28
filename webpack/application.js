require("application.css");
require("bootstrap/dist/css/bootstrap.css");
console.log("Hello world!");

var coreJS = require('core-js');
var zoneJS = require('zone.js');
var reflectMetadata = require('reflect-metadata');
var ng = {
  core: require("@angular/core"),
  common: require("@angular/common"),
  compiler: require("@angular/compiler"),
  forms: require("@angular/forms"),
  platformBrowser: require("@angular/platform-browser"),
  platformBrowserDynamic: require("@angular/platform-browser-dynamic"),
  router: require("@angular/router")
};

var AngularTestComponent = ng.core.Component({
  selector: "shine-angular-test",
  template: '\
    <h2 *ngIf="name">Hello {{name}}!</h2> \
    <form> \
      <div class="form-group"> \
        <label for="name">Name</label> \
        <input type="text" id="name" class="form-control" \
          name="name" bindon-ngModel="name"> \
      </div> \
    </form> \
  '
}).Class({
  constructor: function() {
    this.name = null;
  }
});

var AngularTestAppModule = ng.core.NgModule({
  imports: [ ng.platformBrowser.BrowserModule, ng.forms.FormsModule ],
  declarations: [ AngularTestComponent ],
  bootstrap: [ AngularTestComponent ]
}).Class({
  constructor: function() {}
});

document.addEventListener('DOMContentLoaded', function() {
  var shouldBootstrap = document.getElementById("angular-test");
  if (shouldBootstrap) {
    ng.platformBrowserDynamic.
    platformBrowserDynamic().
    bootstrapModule(AngularTestAppModule);
  }
});

// var CustomerSearchComponent = ng.core.Component({
//   selector: "shine-customer-search",
// }).Class({
//   constructor: function() {
//   }
// });

var RESULTS = [
  {
  first_name: "Pat",
  last_name: "Smith",
  username: "psmith",
  email: "pat.smith@somewhere.net",
  created_at: "2016-02-05",
  },
  {
  first_name: "Patrick",
  last_name: "Jones",
  username: "pjpj",
  email: "jones.p@business.net",
  created_at: "2014-03-05",
  },
  {
  first_name: "Patricia",
  last_name: "Benjamin",
  username: "pattyb",
  email: "benjie@aol.info",
  created_at: "2016-01-02",
  },
  {
  first_name: "Patty",
  last_name: "Patrickson",
  username: "ppat",
  email: "pppp@freemail.computer",
  created_at: "2016-02-05",
  },
  {
  first_name: "Jane",
  last_name: "Patrick",
  username: "janesays",
  email: "janep@company.net",
  created_at: "2013-01-05",
  },
];

var CustomerSearchComponent = ng.core.Component({
  selector: "shine-customer-search",
  template: '\
  <header> \
  <h1 class="h2">Customer Search</h1> \
  </header> \
  <section class="search-form"> \
  <form> \
  <div class="input-group input-group-lg"> \
  <label for="keywords" class="sr-only">Keywords></label> \
  <input type="text" id="keywords" name="keywords" \
    placeholder="First Name, Last Name, or Email Address"\
    class="form-control input-lg"\
    bindon-ngModel="keywords">\
  <span class="input-group-btn"> \
  <input type="submit" value="Find Customers"\
    class="btn btn-primary btn-lg"\
    on-click="search()">\
  </span> \
  </div> \
  </form> \
  </section> \
  <section class="search-results"> \
    <header> \
      <h1 class="h3">Results</h1> \
    </header> \
    <ol class="list-group"> \
      <li *ngFor="let customer of customers" \
        class="list-group-item clearfix"> \
        <h3 class="pull-right"> \
          <small class="text-uppercase">Joined</small> \
          {{customer.created_at}} \
        </h3> \
        <h2 class="h3"> \
          {{customer.first_name}} {{customer.last_name}} \
          <small>{{customer.username}}</small> \
        </h2> \
        <h4>{{customer.email}}</h4> \
      </li> \
    </ol> \
  </section> \
  '
}).Class({
  constructor: function() {
    this.customers = null
    this.keywords = ""
  },
  search: function() {
    if (this.keywords == "pat") {
      this.customers = RESULTS
    } else {
      this.customers = []
    }
  }
});

var CustomerSearchAppModule = ng.core.NgModule({
  imports: [ ng.platformBrowser.BrowserModule, ng.forms.FormsModule ],
  declarations: [ CustomerSearchComponent ],
  bootstrap: [ CustomerSearchComponent ]
}).Class({
  constructor: function() {}
});

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById("shine-customer-search")) {
    ng.platformBrowserDynamic.
    platformBrowserDynamic().
    bootstrapModule(CustomerSearchAppModule);
  }
})
