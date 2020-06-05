import React, { useContext, useState, useEffect } from "react";

import { UserContext } from "../../context/UserContext";
import Navbar from "../Navbar";
import FlashMessage from "../FlashMessage";
import NewDonatorModal from "../modals/NewDonatorModal";

import DonationsList from "../DonationsList";
import ExpensesList from "../ExpensesList";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [donationsListIsVisible, setDonationsListIsVisible] = useState(true);
  const [expensesListIsVisible, setExpensesListIsVisible] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const {
    isAuthorized,
    authToken,
    userLoggedin,
    currentUser,
    flashMessage,
    getUsers,
  } = useContext(UserContext);

  useEffect(() => {
    getUsers();
    //eslint-disable-next-line
  }, []);

  const openNewDonatorModal = () => {
    setCreateModalIsOpen(true);
  };

  const closeNewDonatorModal = () => {
    setCreateModalIsOpen(false);
  };

  const showDonationsList = () => setDonationsListIsVisible(true);
  const hideDonationsList = () => setDonationsListIsVisible(false);

  const showExpensesList = () => setExpensesListIsVisible(true);
  const hideExpensesList = () => setExpensesListIsVisible(false);

  return (
    <div className="dashboard">
      <div className="columns">
        <div className="column">
          <Navbar />
        </div>
      </div>

      <div className="container-fluid">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            {flashMessage.msg ? (
              <FlashMessage type={flashMessage.type} msg={flashMessage.msg} />
            ) : null}
            <div className="box">
              <div className="columns">
                <div className="column is-4">
                  <div class="field is-grouped">
                    <p class="control">
                      <button
                        class="button is-primary"
                        onClick={() => {
                          setDonationsListIsVisible(true);
                          setExpensesListIsVisible(false);
                        }}
                      >
                        <span class="icon is-small">
                          <i class="fas fa-list"></i>
                        </span>
                        <span>Donator's List</span>
                      </button>
                    </p>
                    <p class="control">
                      <button
                        class="button is-danger"
                        onClick={() => {
                          setExpensesListIsVisible(true);
                          setDonationsListIsVisible(false);
                        }}
                      >
                        <span class="icon is-small">
                          <i class="fas fa-dollar-sign"></i>
                        </span>
                        <span>Server Expenses</span>
                      </button>
                    </p>
                  </div>
                </div>
                <div className="column is-7 is-offset-1">
                  <div class="field is-grouped">
                    <div class="control has-icons-left has-icons-right">
                      <input
                        class="input is-info"
                        type="email"
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value.substr(0, 20))
                        }
                        placeholder="Search here..."
                      />
                      <span class="icon is-small is-left">
                        <strong>
                          <i class="fas fa-search"></i>
                        </strong>
                      </span>
                    </div>
                    <p class="control">
                      <button
                        class="button is-success"
                        onClick={openNewDonatorModal}
                      >
                        <span class="icon is-small">
                          <i class="fas fa-plus-square"></i>
                        </span>
                        <span>Add Donator</span>
                      </button>
                    </p>
                  </div>
                </div>
                <NewDonatorModal
                  createModalIsOpen={createModalIsOpen}
                  closeNewDonatorModal={closeNewDonatorModal}
                  showDonationsList={showDonationsList}
                  hideExpensesList={hideExpensesList}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="box" style={{ marginBottom: "200px" }}>
              {donationsListIsVisible ? (
                <div>
                  <h2
                    className="title is-2 has-text-centered logo-font"
                    style={{ position: "absolute", top: "250px" }}
                  >
                    Total:{" "}
                    <span>
                      <i class="fas fa-ruble-sign"></i>{" "}
                    </span>
                    {"   "}
                    178,000.00
                  </h2>
                  <h1 className="title is-2 has-text-centered logo-font">
                    RF Asean Gaming Donator's List
                  </h1>
                  <DonationsList search={search} />
                </div>
              ) : null}

              {expensesListIsVisible ? (
                <div>
                  <h1 className="title is-2 has-text-centered logo-font">
                    RF Asean Gaming Expenses List
                  </h1>
                  <ExpensesList />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
