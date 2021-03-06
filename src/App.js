import React from 'react';

import Balance from "./components/Balance";
import History from "./components/History";
import AddNew from "./components/AddNew";

export default function App() {
  return (
    <React.Fragment>
      <h2>Expense Tracker</h2>
      <Balance />
      <History />
      <AddNew />
    </React.Fragment>
  );
}
