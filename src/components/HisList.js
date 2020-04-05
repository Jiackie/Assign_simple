import React from "react";
import { connect } from "react-redux";
import { deleteNew } from "../redux/actions";

class HisList extends React.Component {
  handleDelete = () => {
    this.props.deleteNew(this.props.his.id);
  }

  render() {
    return (
      <li
        className={`history_record ${this.props.his.amount > 0 ? 'history_record_income' : 'history_record_expense'}`}>
        <button
          className="delete_btn"
          onClick={this.handleDelete}>
          x
        </button>
        <span> {this.props.his.text} </span>
        <span> {parseFloat(this.props.his.amount).toFixed(2)} </span>
      </li>
    );
  }
}


export default connect(
  null,
  { deleteNew }
)(HisList);