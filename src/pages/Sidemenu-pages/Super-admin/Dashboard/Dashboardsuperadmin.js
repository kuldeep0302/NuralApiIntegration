import React from "react";
import "./Dashboardsuperadmin.css";

const Dashboardsuperadmin = () => {
  return (
    <>
      <div className="container-Dashboardsuperadmin">
        <div className="firstname-Dashboardsuperadmin">
          <h3 className="h-Dashboardsuperadmin">Super Admin</h3>
        </div>

        <div className="Dashboard-Dashboardsuperadmin">
          <div className="databox-Dashboardsuperadmin">
            <div className="boxone-Dashboardsuperadmin">
              <div className="firsttext--Dashboardsuperadmin">
                Total Subscription
              </div>
              <div className="firsttext--Dashboardsuperadmin">250</div>
            </div>
            <div className="boxone-Dashboardsuperadmin">
              {" "}
              <div className="firsttext--Dashboardsuperadmin">
                Active Subscription
              </div>
              <div className="firsttext--Dashboardsuperadmin">250</div>
            </div>
            <div className="boxone-Dashboardsuperadmin">
              {" "}
              <div className="firsttext--Dashboardsuperadmin">
                Stopped Subscription
              </div>
              <div className="firsttext--Dashboardsuperadmin">250</div>
            </div>
            <div className="boxone-Dashboardsuperadmin">
              {" "}
              <div className="firsttext--Dashboardsuperadmin">Self Trials</div>
              <div className="firsttext--Dashboardsuperadmin">250</div>
            </div>
          </div>

          <div className="databox-Dashboardsuperadmin">
            <div className="boxone-Dashboardsuperadmin">
              <div className="firsttext--Dashboardsuperadmin">
                Trials Stopped
              </div>
              <div className="firsttext--Dashboardsuperadmin">250</div>
            </div>
            <div className="boxone-Dashboardsuperadmin">
              {" "}
              <div className="firsttext--Dashboardsuperadmin">
                Trials Coversion
              </div>
              <div className="firsttext--Dashboardsuperadmin">250</div>
            </div>

            <div className="boxone-Dashboardsuperadmin">
              {" "}
              <div className="firsttext--Dashboardsuperadmin">
                Trial Subscription
              </div>
              <div className="firsttext--Dashboardsuperadmin">250</div>
            </div>

            <div className="boxone-Dashboardsuperadmin">
              {" "}
              <div className="firsttext--Dashboardsuperadmin">
                Company Setup Trials
              </div>
              <div className="firsttext--Dashboardsuperadmin">
                <div className="valuewithimg-Dashboardsuperadmin">
                  <div className="img-Dashboardsuperadmin">
                    {" "}
                    <img src="photos\client 1.png" alt="Description" />
                  </div>
                  <div>250</div>
                </div>
              </div>
            </div>
          </div>

          <div className="databox-Dashboardsuperadmin">
            <div className="boxone-Dashboardsuperadmin">
              <div className="firsttext--Dashboardsuperadmin">
                MTD Clients Dropped
              </div>
              <div className="firsttext--Dashboardsuperadmin">250</div>
            </div>
            <div className="boxone-Dashboardsuperadmin">
              {" "}
              <div className="firsttext--Dashboardsuperadmin">6 Month Drop</div>
              <div className="firsttext--Dashboardsuperadmin">250</div>
            </div>
            <div className="boxone-Dashboardsuperadmin">
              {" "}
              <div className="firsttext--Dashboardsuperadmin">
                Client churn Rate
              </div>
              <div className="firsttext--Dashboardsuperadmin">
                <div className="valuewithimg-Dashboardsuperadmin">
                  <div className="img-Dashboardsuperadmin">
                    {" "}
                    <img src="photos\client 1.png" alt="Description" />
                  </div>
                  <div>250</div>
                </div>
              </div>
            </div>
            <div className="boxone-Dashboardsuperadmin">
              {" "}
              <div className="firsttext--Dashboardsuperadmin">xxx</div>
              <div className="firsttext--Dashboardsuperadmin">250</div>
            </div>
          </div>

          <div className="chart-Dashboardsuperadmin"></div>
          <div className="table-Dashboardsuperadmin">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Client Name</th>
                  <th>No. of Licenses</th>
                  <th>Subscription Plan</th>
                  <th>Subscribed On</th>
                  <th>Subs End On</th>
                  <th>Payment Due Date</th>
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
                </tr>

                <tr>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardsuperadmin;
