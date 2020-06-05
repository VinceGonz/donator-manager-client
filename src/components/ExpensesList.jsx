import React, { useContext, useEffect } from "react";
import { ExpensesContext } from "../context/ExpensesContext";

const ExpensesList = () => {
  const { expensesList, getExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    getExpenses();
    //eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      <table className="table is-bordered is-hoverable is-fullwidth has-text-centered">
        <thead>
          <tr>
            <th>Expense ID</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expensesList.map(expense => {
            return (
              <tr>
                <td>
                  <span class="tag is-primary">
                    <h2 className="title is-5">{expense.expense_id}</h2>
                  </span>
                </td>
                <td>
                  <span class="tag is-warning">
                    <h2 className="title is-5">${expense.amount}</h2>
                  </span>
                </td>
                <td>
                  <span class="tag is-link">
                    <h2 className="title is-6 has-text-white">
                      {expense.description}
                    </h2>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2 class="title is-2">
        Total: $
        {expensesList.map(e => e.amount).reduce((acc, val) => acc + val, 0)}
      </h2>
    </React.Fragment>
  );
};

export default ExpensesList;
