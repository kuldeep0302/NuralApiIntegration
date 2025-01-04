import React from "react";
import "./Dashboard.css";
import { Chart } from "react-google-charts";


const Dashboard = () => {
  return (
    <>
      <div className="firstbox-Dashboard">
        <div className="firstname-dashboard">
          <h3 className="h-dashbord">Dashboard</h3>
        </div>
        <div className="table-dashboard">
          <table class="my-table">
            <tbody>
              <tr>
                <td colspan="2"></td>
                <td colspan="3" className="one">Calls Open Since</td>
                <td colspan="2"></td>
                <td colspan="3" className="one">Calls Pending for Replacement Since</td>
              </tr>
              <tr>
                <th>Brand</th>
                <th>Total Calls</th>
                <th>72 Hr</th>
                <th>3-7 Days</th>
                <th>&#62; 7 Days</th>
                <th>Closed</th>
                <th> Pending for Replacement</th>
                <th>&#62; 15 Days</th>
                <th>15-30 Days</th>
                <th>&#62; 30 Days</th>
              </tr>
              <tr>
                <td>Brand 1</td>
                <td>1000</td>
                <td>655</td>
                <td>656</td>
                <td>899</td>
                <td>234</td>
                <td>656</td>
                <td>345</td>
                <td>566</td>
                <td>768</td>
              </tr>
              <tr>
                <td>Brand 2</td>
                <td>1000</td>
                <td>655</td>
                <td>656</td>
                <td>899</td>
                <td>234</td>
                <td>656</td>
                <td>345</td>
                <td>566</td>
                <td>768</td>
              </tr>
              <tr>
                <td>Brand 3</td>
                <td>1000</td>
                <td>655</td>
                <td>656</td>
                <td>899</td>
                <td>234</td>
                <td>656</td>
                <td>345</td>
                <td>566</td>
                <td>768</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="graph-dashboard">
          <div className="graph1-dashboard">
            <div>
              <Chart
                width={"100%"}
                height={"400px"}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Month", "Motivation Level", "Energy Level"],
                  ["Jan", 1, 0.25],
                  ["Feb", 2, 0.5],
                  ["March", 3, 1],
                  ["April", 4, 2.25],
                  ["May", 5, 2.25],
                  ["June", 6, 3],
                  ["July", 7, 4],
                ]}
                options={{
                  title: "Total Calls Vs Closed Calls (Month Wise) Brand 1",
                  isStacked: true,
                  hAxis: {
                    title: "Month",
                    format: "h:mm a",
                    viewWindow: {
                      min: [7, 30, 0],
                      max: [17, 30, 0],
                    },
                  },
                  vAxis: {
                    title: "Rating (scale of 1-10)",
                  },
                }}
                rootProps={{ "data-testid": "1" }}
              />
            </div>
          </div>

          <div className="graph2-dashboard">
            <div>
              <Chart
                width={"100%"}
                height={"400px"}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Month", "Motivation Level", "Energy Level"],
                  ["Jan", 1, 0.25],
                  ["Feb", 2, 0.5],
                  ["March", 3, 1],
                  ["April", 4, 2.25],
                  ["May", 5, 2.25],
                  ["June", 6, 3],
                  ["July", 7, 4],
                ]}
                options={{
                  title: "Total Calls Vs Closed Calls (Month Wise) Brand 2",
                  isStacked: true,
                  hAxis: {
                    title: "Month",
                    format: "h:mm a",
                    viewWindow: {
                      min: [7, 30, 0],
                      max: [17, 30, 0],
                    },
                  },
                  vAxis: {
                    title: "Rating (scale of 1-10)",
                  },
                }}
                rootProps={{ "data-testid": "1" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
