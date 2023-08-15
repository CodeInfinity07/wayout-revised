import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const AddPlayer = () => {
  const handleLabel = (e) => {
    const elements = document.getElementsByClassName("form-line");
    for (let i = 0; i <= elements.length - 1; i++) {
      if (elements[i].classList.contains("focused")) {
        elements[i].classList.remove("focused");
      }
    }

    e.target.parentNode.classList.add("focused");
  };

  const addPlayer = async () => {
    const playerData = {
      player_name: document.getElementById("player_name").value,
      matches_played: document.getElementById("matches_played").value,
      won: document.getElementById("won").value,
      lost: document.getElementById("lost").value,
      drawn: document.getElementById("drawn").value,
      no_shows: document.getElementById("no_shows").value,
      average_vote: document.getElementById("average_vote").value,
    };

    try {
      const response = await axios.post("/api/v1/player/add", playerData);
      if (response.data.success) {
        MySwal.fire({
          icon: "success",
          title: "Added",
        });
        document.getElementById("player_name").value = "";
        document.getElementById("matches_played").value = "";
        document.getElementById("won").value = "";
        document.getElementById("lost").value = "";
        document.getElementById("drawn").value = "";
        document.getElementById("no_shows").value = "";
        document.getElementById("average_vote").value = "";
      }
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };
  return (
    <>
      <div className="form-group form-float">
        <div className="form-line" onFocus={handleLabel}>
          <input type="text" id="player_name" className="form-control" />
          <label className="form-label">Player Name</label>
        </div>
      </div>
      <div className="form-group form-float">
        <div className="form-line" onFocus={handleLabel}>
          <input type="text" id="matches_played" className="form-control" />
          <label className="form-label">Matches Played</label>
        </div>
      </div>
      <div className="form-group form-float">
        <div className="form-line" onFocus={handleLabel}>
          <input type="text" id="won" className="form-control" />
          <label className="form-label">Won</label>
        </div>
      </div>
      <div className="form-group form-float">
        <div className="form-line" onFocus={handleLabel}>
          <input type="text" id="lost" className="form-control" />
          <label className="form-label">Lost</label>
        </div>
      </div>
      <div className="form-group form-float">
        <div className="form-line" onFocus={handleLabel}>
          <input type="text" id="drawn" className="form-control" />
          <label className="form-label">Drawn</label>
        </div>
      </div>
      <div className="form-group form-float">
        <div className="form-line" onFocus={handleLabel}>
          <input type="text" id="no_shows" className="form-control" />
          <label className="form-label">No Shows</label>
        </div>
      </div>
      <div className="form-group form-float">
        <div className="form-line" onFocus={handleLabel}>
          <input type="text" id="average_vote" className="form-control" />
          <label className="form-label">Average Vote</label>
        </div>
      </div>
      <input type="checkbox" id="remember_me_2" className="filled-in" />
      <button
        type="button"
        className="btn btn-raised btn-primary m-t-15 waves-effect"
        onClick={addPlayer}
      >
        SAVE
      </button>
    </>
  );
};

export default AddPlayer;
