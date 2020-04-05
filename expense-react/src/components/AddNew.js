import React from "react";
import { connect } from "react-redux";
import { addNew } from "../redux/actions";

// function AddNew (props) {
//   return (
//     <div>
//       pl
//     </div>
//   );
// }

class AddNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: "",
      amount: "",
   };
  }

  handleTextUpdate = value => {
    this.setState({ text: value });
  }

  handleAmountUpdate = value => {
    this.setState({ amount: value });
  }

  handleAddNew = () => {
    this.props.addNew(this.state.text, this.state.amount);
    this.setState({
      text: "",
      amount: "" 
    });
  }

  render() {
    return (
      <div>
        <h3 className="space-line">Add new transaction</h3>

        <label>Text</label>
        <input
          type="text"
          placeholder="  Enter text..."
          className="transaction_input"
          value={this.state.text}
          onChange={(e) => this.handleTextUpdate(e.target.value)}
        />
        <label>Amount <br/> (negative-expense, positive-income)</label>
        <input
          type="number"
          placeholder="  Enter amount..."
          className="transaction_input"
          value={this.state.amount}
          onChange={(e) => this.handleAmountUpdate(e.target.value)}
        />
        <button
          className="btn"
          onClick={this.handleAddNew}>
          Add transaction
        </button>

      </div>
    )
  }
}

export default connect(
  null,
  { addNew }
)(AddNew);
