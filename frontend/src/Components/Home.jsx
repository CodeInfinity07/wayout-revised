import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddPlayer from "./AddPlayer";
const MySwal = withReactContent(Swal);

const Home = () => {
  const [showInsert, setShowInsert] = useState(true);
  const [showDisplay, setShowDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const display = async () => {
    setShowDisplay(false);
    setIsLoading(true);
    if (showInsert) {
      setShowInsert(false);
    }
    const response = await axios.get("/api/v1/player/show");
    if (response.data.success) {
      setPlayers(response.data.players);
      setIsLoading(false);
      setShowDisplay(true);
    }
  };
  const addInformation = () => {
    if (showDisplay) {
      setShowDisplay(false);
      setShowInsert(true);
    } else {
      setShowInsert(true);
    }
  };
  const calculateLevel = async (id) => {
    const response = await axios.get(`/api/v1/player/calculateData/${id}`);
    if (response.data.success) {
      MySwal.fire({
        title: 'Calculated!',
        text: "Level = " + response.data.level,
      });
    }
  };
  return (
    <>
      <div className="overlay" />
      <nav className="navbar">
        <div className="col-12">
          <div className="navbar-header">
            <a href="javascript:void(0);" className="bars" />
            <a className="navbar-brand" href="index.html">
              Wayout
            </a>
          </div>
        </div>
      </nav>
      {/* Left Sidebar */}
      <aside id="leftsidebar" className="sidebar">
        <div className="menu">
          <ul className="list">
            <li className="header">MAIN NAVIGATION</li>
            <li className="btn_navigation" onClick={addInformation}>
              Add Player Info
            </li>
            <li className="btn_navigation" onClick={display}>Show Player Info</li>
          </ul>
        </div>
        {/* #Menu */}
      </aside>
      <section className="content home">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card" style={{ marginTop: "50px" }}>
                <div className="body">
                  {showInsert ? (
                    <AddPlayer />
                  ) : null}
                  {isLoading ? (
                    <div className="preloader">
                      <div className="spinner-layer">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {showDisplay ? (
                    <div className="body table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>NAME</th>
                            <th>Matches Played</th>
                            <th>Won</th>
                            <th>Lost</th>
                            <th>Drawn</th>
                            <th>No Shows</th>
                            <th>Average</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {players.map((player, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{player.player_name}</td>
                                <td>{player.matches_played}</td>
                                <td>{player.won}</td>
                                <td>{player.lost}</td>
                                <td>{player.drawn}</td>
                                <td>{player.no_shows}</td>
                                <td>{player.average_vote}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      calculateLevel(player._id);
                                    }}
                                  >
                                    Calculate
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
