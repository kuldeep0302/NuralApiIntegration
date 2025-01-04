import React from "react";
import Button from "@mui/material/Button";
import { Chart } from "react-google-charts";
import "./Dashboardtrails.css";

const Dashboardtrails = () => {
  return (
    <>
      <div className="container-Dashboardtrails">
        <div className="firstname-Dashboardtrails">
          <h3 className="h-Dashboardtrails">Trials</h3>
        </div>

        <div className="Dashboard-Dashboardtrails">
          <div className="databox-Dashboardtrails">
            <div className="boxone-Dashboardtrails">
              <div className="firsttext--Dashboardtrails">Total Trials</div>
              <div className="firsttext--Dashboardtrails">250</div>
            </div>
            <div className="boxone-Dashboardtrails">
              {" "}
              <div className="firsttext--Dashboardtrails">Active trials</div>
              <div className="firsttext--Dashboardtrails">250</div>
            </div>
            <div className="boxone-Dashboardtrails">
              {" "}
              <div className="firsttext--Dashboardtrails">Stopped Trials</div>
              <div className="firsttext--Dashboardtrails">250</div>
            </div>
            <div className="boxone-Dashboardtrails">
              {" "}
              <div className="firsttext--Dashboardtrails">Ending This Week</div>
              <div className="firsttext--Dashboardtrails">250</div>
            </div>
          </div>

          <div className="chart-Dashboardtrails">
            <div>
              {" "}
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["X", "Dogs", "Cats"],
                  [0, 0, 0],
                  [1, 10, 5],
                  [2, 23, 15],
                  [3, 17, 9],
                  [4, 18, 10],
                  [5, 9, 5],
                  // Add your chart data here
                ]}
                options={{
                  hAxis: {
                    title: "Date",
                  },
                  vAxis: {
                    title: "Subscriptions",
                  },
                  colors: ["#a52714", "#097138"],
                }}
                rootProps={{ "data-testid": "1" }}
              />
            </div>

            <div></div>
          </div>
          <div className="table-Dashboardtrails">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Client Name</th>
                  <th>No. of Licenses</th>
                  <th>Trial Start Date</th>
                  <th>Trial End Date</th>
                  <th>Status</th>
                  <th>Extand Trial</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>
                    <img src="photos\Group 361036.png" alt="Description" />
                  </td>
                  <td>
                    {" "}
                    <span className="buttons-Dashboardtrails-span">
                      <Button
                        className="action-button"
                        size="large"
                        component="label"
                        variant="contained"
                        style={{ backgroundColor: "#32499F", color: "white" }}
                      >
                        Extend Trial
                      </Button>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>xxxxx</td>
                  <td>
                    <img src="photos\Group 361036.png" alt="Description" />
                  </td>
                  <td>
                    {" "}
                    <span className="buttons-Dashboardtrails-span">
                      <Button
                        className="action-button"
                        size="large"
                        component="label"
                        variant="contained"
                        style={{ backgroundColor: "#32499F", color: "white" }}
                      >
                        Extend Trial
                      </Button>
                    </span>
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

export default Dashboardtrails;
