import { useState } from 'react';
import './App.css';

function App() {

  // const [data,setData] = useState([]);
  const [ifsc, setIfsc] = useState("SBIN0000813");
 
  async function findDetails() {
    const inputString = document.getElementById("ifsc").value;
    let base_url = "https://ifsc.razorpay.com/";
    fetch(base_url + inputString)
      .then(async (data) => {
        // console.log(data);
        if (data.ok) {
          data = await data.json();
          let x = document.getElementById("myTable").rows;
          for (let i = 0; i < 9; i++) {
            let prop = x[i].cells[0].innerHTML;
            if (data[prop] === "") x[i].cells[1].innerHTML = "Not Available";
            else x[i].cells[1].innerHTML = data[prop];
          }
        } else {
          alert("You entered wrong IFSC code");
        }
      })
      .catch((e) => {
        alert("something went wrong please try again");
      });
  }

    function clearDetails() {
      let x = document.getElementById("myTable").rows;
      // console.log(x);
      for (let i = 0; i < 9; i++) {
        x[i].cells[1].innerHTML = "Please enter new IFSC code";
        //   console.log(prop);
      }
    }




  return (
    <div className="App">
      <h1 id="heading">Welcome to bank details finder website</h1>
      <div id="inputBoxes">
        <input
          type="text"
          name="IFSC"
          value={ifsc}
          onChange={(e) => {
            setIfsc(e.target.value);
          }}
          id="ifsc"
        />
        <button type="button" onClick={findDetails} id="findBtn">
          Find Details
        </button>
      </div>
      <button className="clearBtn" onClick={clearDetails}>
        Clear details
      </button>
      <br />
      <br />
      <br />
      <div>
        <table id="myTable">
          <tbody>
            <tr>
              <td>MICR</td>
              <td>560002057</td>
            </tr>
            <tr>
              <td>BANK</td>
              <td>State Bank of India</td>
            </tr>
            <tr>
              <td>BRANCH</td>
              <td>BANGALORE</td>
            </tr>
            <tr>
              <td>ADDRESS</td>
              <td>POST BAG NO.5310, STATE BANK ROAD, BANGLORE 560001</td>
            </tr>
            <tr>
              <td>CONTACT</td>
              <td>""</td>
            </tr>
            <tr>
              <td>CITY</td>
              <td>BANGALORE</td>
            </tr>
            <tr>
              <td>DISTRICT</td>
              <td>BANGALORE URBAN</td>
            </tr>
            <tr>
              <td>STATE</td>
              <td>KARNATAKA</td>
            </tr>
            <tr>
              <td>BANKCODE</td>
              <td>SBI</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
