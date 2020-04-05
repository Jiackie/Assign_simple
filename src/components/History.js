import React from "react";
import { connect } from "react-redux";
import HisList from "./HisList";
import { getHists } from "../redux/selectors";

const History = ({ newhist }) => (
  <div>
    <h3 className="history_title">History</h3>
        <ul>
      {newhist? newhist.map(newhist => {
        return <HisList key={`newhist-${newhist.id}`} his={newhist} />;
      })
      : null
      }
    </ul>
  </div>
);


export default connect(state => ({ newhist : getHists(state) }))(History);
