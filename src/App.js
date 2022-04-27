/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useRef } from "react";

import "./app.css";

function App() {
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});
  const [find, setfind] = useState("");
  const currentNumber = useRef("");
  const previousNumber = useRef("");
  const totelNumber = useRef("");
  const openNav = () => {
    document.getElementById("mySidebar").style.width = "350px";
    document.getElementById("main").style.marginLeft = "350px";
  };

  const closeNav = () => {
    RemoveHighlight();
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  };

  //   get all section
  let char = {};
  const hyphen = (e) => {
    //   hyphenated words
    const get = document.querySelectorAll(".sec");
    let pattern = /((?:\w+-)+\w+)/g;
    let results = [];
    for (let i = 0; i < get.length; i++) {
      let result = get[i].innerText.match(pattern);
      if (result != null) {
        results.push(...result);
      }
    }
    // words appeared in para

    let yphen = 0;
    let words = "";
    for (let word of data) {
      char[word] = char[word] + 1 || 1;
    }
    for (let word in char) {
      if (e === word) {
        yphen = char[word];
        words = word;
      }
      console.log(yphen);
    }
    console.log(data);
    setItem(char);
    console.log(item);
    setData(results);
  };

  const withoutHyphens = (e) => {
    let a = data.map((e) => {
      return e.replace("-", " ");
    });
    setData(a);
    //  without hyphenated words
    const get = document.querySelectorAll(".sec");
    let pattern = /((?:\w+ )+\w+)/g;
    let results = [];
    let uniqueChars;

    for (let i = 0; i < get.length; i++) {
      for (let words of data) {
        let result = get[i].innerText.match(words);
        if (result != null) {
          results.push(...result);
        }
      }
      uniqueChars = [...new Set(results)];
    }
    console.log(uniqueChars);
    console.log(results);

    setData(results);
    // words appeared in para

    let yphen = 0;
    let words = "";
    for (let word of data) {
      char[word] = char[word] + 1 || 1;
    }
    for (let word in char) {
      if (e === word) {
        yphen = char[word];
        words = word;
      }
      console.log(yphen);
    }
    console.log(data);
    setItem([char]);
    console.log(item);
    console.log(char);
  };
  // //highlight
  // const handleHighlight = (e) => {
  //   const get = document.querySelectorAll(".sec");
  //   get[0].innerHTML = get[0].innerText.replace(
  //     e.target.innerText,
  //     `<div class="highlight">${e.target.innerText}</div>`
  //   );

  //   console.log(e.target.innerText);
  //   console.log(get[0].innerHTML);
  // };

  const Highlight2 = () => {
    try {
      let Elements = document.querySelectorAll(".highlight");

      let id = 1;
      if (Elements.length > 0) {
        for (let currentElement of Elements) {
          currentElement.id = id;
          currentElement.className = "highlight";
          if (id === 1) {
            currentElement.classList.add("highlight2");
            currentNumber.current = 1;
            previousNumber.current = 1;
          }
          totelNumber.current = id;

          ++id;
        }
        // success(id - 1);
      } else {
        // failed();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RemoveHighlight = () => {
    try {
      let Elements = document.querySelectorAll(".highlight");
      let NoHighliteElements = document.querySelectorAll(".nohighlight");
      if (Elements) {
        for (let currentElement of Elements) {
          let content = currentElement.textContent;
          currentElement.parentNode.replaceChild(
            document.createTextNode(content),
            currentElement
          );
        }
      }
      if (NoHighliteElements) {
        for (let currentElement of NoHighliteElements) {
          let content = currentElement.textContent;
          currentElement.parentNode.replaceChild(
            document.createTextNode(content),
            currentElement
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to highlight
  const Find = (e) => {
    setfind(e.target.innerText);
    console.log(find);
    try {
      let checkType = find;

      RemoveHighlight();
      let Paragraph = document.querySelectorAll(".body");

      let searchRegExp = new RegExp("\\b(" + checkType + ")\\b", "gi");
      // new RegExp("\\b" + checkType + "\\b", "ig");

      for (let element of Paragraph) {
        const result = element.innerHTML.replace(
          searchRegExp,
          function (content) {
            return `<div class="highlight">${content}</div>`;
          }
        );
        element.innerHTML = result;
      }
      Highlight2();
    } catch (error) {
      console.log("error");
    }
  };

  const findone = (event) => {
    try {
      event.preventDefault();

      let currentid = currentNumber.current;
      let previousid = previousNumber.current;
      let overallid = totelNumber.current;

      if (find !== "") {
        let previousDiv = document.getElementById(previousid);

        if (previousDiv !== null) {
          previousDiv.className = "highlight";

          if (currentid < overallid) {
            currentid = currentid + 1;
          } else {
            currentid = 1;
          }
          previousNumber.current = currentid;
          let curentDiv = document.getElementById(currentid);
          curentDiv.classList.add("highlight2");
          currentNumber.current = currentid;
        } else {
          window.alert("no result found");
        }
      } else {
        window.alert("kindly enter find word");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findpreviousone = (event) => {
    try {
      event.preventDefault();

      let currentid = currentNumber.current;
      let previousid = previousNumber.current;
      let overallid = totelNumber.current;

      if (find !== "") {
        let previousDiv = document.getElementById(previousid);
        if (previousDiv !== null) {
          previousDiv.className = "highlight";
          if (currentid === 1) {
            currentid = overallid;
          } else if (currentid <= overallid) {
            currentid = currentid - 1;
          }
          previousNumber.current = currentid;
          let curentDiv = document.getElementById(currentid);
          curentDiv.classList.add("highlight2");
          currentNumber.current = currentid;
        } else {
          window.alert("no result found");
        }
      } else {
        window.alert("kindly enter find word");
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div>
      <div id="mySidebar" className="sidebar">
        <button
          style={{ marginLeft: "10px", backgroundColor: "yellow" }}
          onClick={findpreviousone}
        >
          {" "}
          prev
        </button>
        <button
          style={{
            marginLeft: "10px",
            backgroundColor: "blue",
            color: "white",
          }}
          onClick={findone}
        >
          nxt
        </button>
        <button
          style={{
            marginLeft: "125px",
            backgroundColor: "blue",
            color: "whitesmoke",
            // position: "absolute",
            // top: "12px",
            // right: "55px",
          }}
          onClick={hyphen}
        >
          Refresh
        </button>
        <a className="closebtn" onClick={closeNav}>
          ×
        </a>

        <h2 style={{ marginLeft: "16px" }}>Hyphenated words</h2>

        <table>
          <tr>
            <th> Hyphenated words</th>
            <th> With Hyphens</th>
            <th> Without Hyphens</th>
          </tr>
          {Object.keys(item).length == 0 ? (
            <span>NO</span>
          ) : (
            Object.keys(item).map((e, i) => {
              return (
                <tr>
                  <td onClick={Find}>{e}</td>
                  <td onClick={hyphen} className="high">
                    {item[e]}
                  </td>
                  <td onClick={withoutHyphens} className="high">
                    {item[e] - 1}
                  </td>
                </tr>
              );
            })
          )}
        </table>
      </div>

      <div id="main">
        <button
          className="openbtn"
          onClick={() => {
            // hyphen();
            openNav();
          }}
        >
          {/* ☰ */}
          Hyphenated words
        </button>
        <hr></hr>
        <div
          className="body"
          contentEditable="true"
          suppressContentEditableWarning="true"
          style={{ overflowY: "scroll" }}
        >
          <div className="sec" id="sec1">
            Esse-nostrud eiusmod Esse-nostrud ad nisi et in officia. Ut pariatur
            aliquip esse exercitation velit voluptate commodo enim eu dolore
            voluptate adipisicing anim Lorem. Qui-ex consectetur sit culpa
            commodo dolor. Adipisicing aute labore aliquip nostrud sunt labore
            velit minim.Robin-sharma Non occaecat amet quis ea esse commodo sunt
            et. Amet fugiat velit eiusmod incididunt aliquip adipisicing velit
            ea mollit velit velit qui nostrud sit. Guru-prakash Esse nostrud
          </div>
          <div className="sec" id="sec2">
            Ad eu-tempor ex eu tempor laboris Esse-nostrud tempor magna laboris
            minim ut ipsum enim. Do veniam quis eiusmod Robin-sharma aliqua
            commodo Lorem cupidatat Lorem. Incididunt ea cupidatat eu-tempor
            elit laborum duis ipsum magna dolore. Dolor anim occaecat cupidatat
            exercitation commodo labore occaecat nostrud occaecat ex dolor do ex
            veniam. Enim laboris officia ipsum ea et cillum consequat
            consectetur cillum commodo ut in nulla. Sit pariatur laboris qui
            pariatur duis voluptate consectetur velit excepteur ea minim.Esse
            nostrud
          </div>
          <div className="sec" id="sec3">
            Pariatur culpa aliquip ex anim minim ut do adipisicing nostrud. Ea
            id velit tempor do qui cillum qui. Duis minim excepteur cillum id
            ipsum. Tempor Lorem incididunt nostrud sit voluptate dolor
            consectetur est do do cillum sit fugiat.
          </div>
          <div className="sec" id="sec4">
            Labore in sint commodo cillum esse magna cillum. Ea aliquip cillum
            ullamco eu non incididunt cupidatat pariatur. Nulla tempor excepteur
            mollit velit adipisicing exercitation voluptate aute voluptate. Qui
            adipisicing duis tempor ad ipsum sunt exercitation ut do aliqua
            irure. Consectetur excepteur eu magna esse laborum ut deserunt sunt
            do aliqua veniam.
          </div>
          <div className="sec" id="sec5">
            Duis sit elit in ea id commodo. Qui sunt mollit ut consectetur.
            Lorem duis deserunt incididunt minim dolore. Culpa anim occaecat
            incididunt anim aliquip consectetur consectetur commodo
            exercitation. Excepteur do dolor adipisicing sit ea cupidatat duis
            laboris.
          </div>
          <div className="sec" id="sec6">
            Elit tempor aliquip officia do ipsum esse voluptate exercitation.
            Culpa officia adipisicing reprehenderit irure exercitation id
            consectetur elit deserunt nulla nisi ullamco laborum aute. Laborum
            amet mollit minim pariatur do eiusmod. Id anim est nulla cupidatat
            incididunt officia officia cillum dolor reprehenderit.
          </div>
          <div className="sec" id="sec7">
            Elit tempor aliquip officia do ipsum esse voluptate exercitation.
            Culpa officia adipisicing reprehenderit irure exercitation id
            consectetur elit deserunt nulla nisi ullamco laborum aute. Laborum
            amet mollit minim pariatur do eiusmod. Id anim est nulla cupidatat
            incididunt officia officia cillum dolor reprehenderit.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
