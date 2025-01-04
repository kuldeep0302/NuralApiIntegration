import React from "react";
import "./Financialdashboard.css";

const Financialdashboard = () => {
  return (
    <>
      <div className="container-Financialdashboard">
        <div className="firstname-Financialdashboard">
          <h3 className="h-Financialdashboard">Financial Dashboard</h3>
        </div>

        <div className="Dashboard-Financialdashboard">
          <div className="databox-Financialdashboard">
            <div className="boxone-Financialdashboard">
              <div className="firsttext--Financialdashboard">
                Active Clients
              </div>
              <div className="firsttext--Financialdashboard">
                <div className="valuewithimg-Financialdashboard">
                  <div className="img-Financialdashboard">
                    {" "}
                    <img src="photos\client 1.png" alt="Description" />
                  </div>
                  <div>250</div>
                </div>
              </div>
            </div>
            <div className="boxone-Financialdashboard">
              {" "}
              <div className="firsttext--Financialdashboard">MTD Revenue</div>
              <div className="firsttext--Financialdashboard">
                <div className="valuewithimg-Financialdashboard">
                  <div className="img-Financialdashboard">
                    {" "}
                    <img src="photos\client 1.png" alt="Description" />
                  </div>
                  <div>250</div>
                </div>
              </div>
            </div>
            <div className="boxone-Financialdashboard">
              {" "}
              <div className="firsttext--Financialdashboard">M-1 Revenue</div>
              <div className="firsttext--Financialdashboard">
                <div className="valuewithimg-Financialdashboard">
                  <div className="img-Financialdashboard">
                    {" "}
                    <img src="photos\client 1.png" alt="Description" />
                  </div>
                  <div>250</div>
                </div>
              </div>
            </div>
            <div className="boxone-Financialdashboard">
              {" "}
              <div className="firsttext--Financialdashboard">YTD Revenue</div>
              <div className="firsttext--Financialdashboard">
                <div className="valuewithimg-Financialdashboard">
                  <div className="img-Financialdashboard">
                    {" "}
                    <img src="photos\client 1.png" alt="Description" />
                  </div>
                  <div>250</div>
                </div>
              </div>
            </div>
          </div>

          <div className="databox-Financialdashboard">
            <div className="boxone-Financialdashboard">
              <div className="firsttext--Financialdashboard">ARPU</div>
              <div className="firsttext--Financialdashboard">
                <div className="valuewithimg-Financialdashboard">
                  <div className="img-Financialdashboard">
                    {" "}
                    <img src="photos\client 1.png" alt="Description" />
                  </div>
                  <div>250</div>
                </div>
              </div>
            </div>
            <div className="boxone-Financialdashboard">
              {" "}
              <div className="firsttext--Financialdashboard">ARR</div>
              <div className="firsttext--Financialdashboard">
                <div className="valuewithimg-Financialdashboard">
                  <div className="img-Financialdashboard">
                    {" "}
                    <img src="photos\client 1.png" alt="Description" />
                  </div>
                  <div>250</div>
                </div>
              </div>
            </div>
            <div className="boxone-Financialdashboard">
              {" "}
              <div className="firsttext--Financialdashboard">XXXXXXX</div>
              <div className="firsttext--Financialdashboard">
                <div className="valuewithimg-Financialdashboard">
                  <div className="img-Financialdashboard">
                    {" "}
                    <img src="photos\client 1.png" alt="Description" />
                  </div>
                  <div>250</div>
                </div>
              </div>
            </div>
            <div className="boxone-Financialdashboard">
              {" "}
              <div className="firsttext--Financialdashboard">XXXXXX</div>
              <div className="firsttext--Financialdashboard">
                <div className="valuewithimg-Financialdashboard">
                  <div className="img-Financialdashboard">
                    {" "}
                    <img src="photos\client 1.png" alt="Description" />
                  </div>
                  <div>250</div>
                </div>
              </div>
            </div>
          </div>

          <div className="table-Financialdashboard">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Client Name</th>
                  <th>No. of Licenses</th>
                  <th>Subscription Plan</th>
                  <th>Subscribed On</th>
                  <th>Payment Date</th>
                  <th>Payment Done</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>
                    {" "}
                    <img src="photos\info.png" alt="Description" />
                  </td>
                </tr>

                <tr>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>
                    {" "}
                    <img src="photos\info.png" alt="Description" />
                  </td>
                </tr>

                <tr>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>
                    {" "}
                    <img src="photos\info.png" alt="Description" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Financialdashboard;
