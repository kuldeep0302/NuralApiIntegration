import React from "react";
import "./Subscriptions.css";

const Subscriptions = () => {
  return (
    <>
      <div className="container-Subscriptions">
        <div className="firstname-Subscriptions">
          <h3 className="h-Subscriptions">Subscriptions</h3>
        </div>

        <div className="Dashboard-Subscriptions">
          <div className="databox-Subscriptions">
            <div className="boxone-Subscriptions">
              {" "}
              <div className="firsttext--Subscriptions">Total Clients</div>
              <div className="firsttext--Subscriptions">
                <div className="valuewithimg-Subscriptions">
                  <div className="img-Subscriptions">
                    {" "}
                    <img src="photos\client 1.png" alt="Description" />
                  </div>
                  <div>250</div>
                </div>
              </div>
            </div>
            <div className="boxone-Subscriptions">
              {" "}
              <div className="firsttext--Subscriptions">Stopped Clients</div>
              <div className="firsttext--Subscriptions">250</div>
            </div>
            <div className="boxone-Subscriptions">
              {" "}
              <div className="firsttext--Subscriptions">Self Trials</div>
              <div className="firsttext--Subscriptions">250</div>
            </div>
          </div>

          <div className="chart-Subscriptions"></div>
          <div className="table-Subscriptions">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Client Name</th>
                  <th>Subscription Plan</th>
                  <th>Subscribed On</th>
                  <th>No. of Licenses</th>
                  <th>Payment Due Date</th>
                  <th>Status</th>
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
                  <td>
                    <img src="photos\Group 361036.png" alt="Description" />
                  </td>
                  <td>
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
                  <td>
                    <img src="photos\Group 361036.png" alt="Description" />
                  </td>
                  <td>
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

export default Subscriptions;
