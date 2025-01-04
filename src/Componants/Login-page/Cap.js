import React from "react";
import "./Cap.css";
import { Link } from "react-router-dom";

const Cap = () => {
  return (
    <div className="container-Cap">
      <div className="form-Cappagemain">
        <div className="formfirst-Cappage">
          <form className="form-nural-service">
            <h3 className="l-y-a">Forget Password</h3>
            <div className="form-group">
              <label className="text-lable" htmlFor="Email">
                Email
              </label>
              <input
                className="text-input"
                type="email"
                id="Email"
                name="Email"
                required=""
              />
              <label className="text-lable" htmlFor="Password">
                Password
              </label>
              <input
                className="text-input"
                type="Password"
                id="Password"
                name="Password"
                required=""
              />
              <label className="text-lable" htmlFor="Re-Enter Password">
                Re-Enter Password
              </label>
              <input
                className="text-input"
                type="Reenter-Password"
                id="Reenter-Password"
                name="Reenter-Password"
                required=""
              />
            </div>
            <button type="submit" className="button">
              Create Account
            </button>
            <Link to="/Loginpage">
              <button className="button">Login</button>
            </Link>
          </form>
        </div>
        <div className="side-image-Cap">
          <div className="n-service-Cap">
            <h1 className="custom-h2">Nural Service Lite </h1>
          </div>
          <div>
            {" "}
            <img src="Photos/Login-img.png" className="side-image-first" alt="" />
          </div>
          <div>
            {" "}
            <img src="Photos/PoweredByNural.png" className="powerdby-cap" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cap;
