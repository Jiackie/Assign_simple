import React from "react";
import { connect } from "react-redux";
import { getHists } from "../redux/selectors";

export const Balance = ({ newhist }) => (
  <div>
    <h4 className="no-margin">
      YOUR BALANCE
    </h4>
    <h1 className="no-margin">
      {'$ ' + (newhist.map(item => parseFloat(item.amount)).reduce((acc, cur) => acc + cur, 0)).toFixed(2)}
    </h1>
    <div className="inc_exp">
      <div className="income">
        <h4 className="no-margin">INCOME</h4>
        <p className="income_value">
          {'$ ' +(newhist
            .map(item =>parseFloat(item.amount))
            .filter(amount => amount > 0)
            .reduce((acc, cur) => acc + cur, 0)).toFixed(2)}
        </p>
      </div>
      <div>
        <h4 className="no-margin">EXPENSE</h4>
        <p className="expense_value">
          {'$ ' + (newhist
            .map(item => parseFloat(item.amount))
            .filter(amount => amount < 0)
            .reduce((acc, cur) => acc + cur, 0)).toFixed(2)}
        </p>
      </div>
    </div>
  </div>
);

export default connect(state => ({ newhist : getHists(state) }))(Balance);