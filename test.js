const expect = require('chai').expect;
const dummie = require('./index');

describe("basic functionality", () => {
  let d;

  beforeEach(() => {
    d = dummie();
  });

  it("should not fail on call", () => {
    expect(() => d()).to.not.throw();
    expect(() => d(1,2,3)).to.not.throw();
  });

  it("should not fail on construct", () => {
    expect(() => new d()).to.not.throw();
  });

  it("should not fail on get", () => {
    expect(() => d.p).to.not.throw();
    expect(() => d.f()).to.not.throw();
    expect(() => d.f(1,2,3)).to.not.throw();
    expect(() => d[0]).to.not.throw();
  });

  it("should not fail on set", () => {
    expect(() => d.p = 1).to.not.throw();
    expect(() => d.f = () => {}).to.not.throw();
  });

  it("should not fail on has", () => {
    expect(() => 'p' in d).to.not.throw();
    expect(() => {
      for (const _v in d) {};
    }).to.not.throw();
  });

  it("should not fail on iteration", () => {
    expect(() => {
      for (const _v of d) {};
    }).to.not.throw();
    expect(() => d.map(() => 1)).to.not.throw();
  });

  it("should not fail on delete", () => {
    expect(() => delete d.p).to.not.throw();
    expect(() => delete d[0]).to.not.throw();
  });

  it("should be chainable", () => {
    expect(() => d.a.b().c.d().e).to.not.throw();
    expect(() => delete d[0][1][2]).to.not.throw();
  });
});

describe("common scenarios", () => {
  const document = dummie();
  const window = dummie();
  const XMLHttpRequest = dummie();
  const fetch = dummie();

  it("should not fail on dom operation", () => {
    window.onload = () => "blah";
    window.addEventListener("on input", () => {});

    const el = document.getElementById("id");
    el.innerText = "BOOM";
    el.appendChild(document.createElement("p"));

    function reqListener () {
      console.log(this.responseText);
    }
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener);
    xhr.open("GET", "http://www.example.com");
    xhr.send();

    // https://github.com/mdn/fetch-examples/blob/master/fetch-json/index.html
    let myList = document.querySelector('ul');
    fetch('products.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        for(let i = 0; i < json.products.length; i++) {
          let listItem = document.createElement('li');
          listItem.innerHTML = '<strong>' + json.products[i].Name + '</strong>';
          listItem.innerHTML +=' can be found in ' + json.products[i].Location + '.';
          listItem.innerHTML +=' Cost: <strong>£' + json.products[i].Price + '</strong>';
          myList.appendChild(listItem);
        }
      })
      .catch(function (error) {
        let p = document.createElement('p');
        p.appendChild(
          document.createTextNode('Error: ' + error.message)
        );
        document.body.insertBefore(p, myList);
      });
  });
});
