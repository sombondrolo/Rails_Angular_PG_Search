var proxyquire = require("proxyquire");
var CustomerSearchComponent = proxyquire(
  "../../webpack/CustomerSearchComponent",
  {
    "./CustomerSearchComponent.html": {
      "@noCallThru": "true"
    }
  }
);
var td = require("testdouble");
var component = null;

describe("CustomerSearchComponent", function() {
  beforeEach(function() {
    component = new CustomerSearchComponent();
  });

  describe("initial state", function() {
    it("sets customers to null", function() {
      expect(component.customers).toBe(null);
    });
    it("sets keywords to the empty string",function() {
      expect(component.keywords).toBe("");
    });
  })

  describe("search", function() {
    var mockHttp = null;
    beforeEach(function() {
      mockHttp = td.object(["get"]);
      component = new CustomerSearchComponent(mockHttp);
    });

    describe("A search for 'pa', less than three characters", function() {
      // it("sets the keywords to be 'pa'");
      // it("does not make an HTTP call");
      it("sets the keywords to be 'pa'", function() {
        component.search("pa");
        expect(component.keywords).toBe("pa");
      });
      it("does not make an HTTP call", function() {
        component.search("pa");
        td.verify(mockHttp.get(), { times: 0 });
      });
    });

    describe("A search for 'pat', three or more characters", function() {
      var mockHttp = null;
      var customers = [
        {
          id: 1,
          created_at: (new Date()).toString(),
          first_name: "Pat",
          last_name: "Jones",
          username: "pj",
          email: "pjones@somewhere.net"
        },
        {
          id: 2,
          created_at: (new Date()).toString(),
          first_name: "Pat",
          last_name: "Jones",
          username: "pj",
          email: "pjones@somewhere.net"
        },
      ]
      beforeEach(function() {
        var response = td.object(["json"]);
        td.when(response.json()).thenReturn({ customers: customers });

        var observable = td.object(["subscribe"]);
        td.when(observable.subscribe(
          td.callback(response),
          td.matchers.isA(Function))).thenReturn();

        mockHttp = td.object(["get"]);
        td.when(mockHttp.get("/customers.json?keywords=pat")).thenReturn(observable);
        component = new CustomerSearchComponent(mockHttp);
      });

      describe("A successful search", function() {
        it("sets the keywords to be 'pat'",function() {
          component.search("pat");
          expect(component.keywords).toBe("pat");
        });
        it("sets the customers to the results of the HTTP call", function() {
          component.search("pat");
          expect(component.customers).toBe(customers);
        });
      });

      describe("A search that fails on the back-end", function() {
        it("sets the keywords to be 'pat'");
        it("leaves customers as null");
        it("alerts the user with the response message");
      })
    })
  })
})
