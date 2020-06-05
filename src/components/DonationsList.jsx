import React, { useContext, useState, useEffect } from "react";
import { DonationsContext } from "../context/DonationsContext";
import { UserContext } from "../context/UserContext";
import UpdateDonatorModal from "./modals/UpdateDonatorModal";
import DeleteDonatorModal from "./modals/DeleteDonatorModal";
import Pagination from "../components/Pagination";

import moment from "moment";

const DonationsList = ({ search }) => {
  const [updateDonatorModalIsOpen, setUpdateDonatorModalIsOpen] = useState(
    false
  );

  const [deleteDonatorModalIsOpen, setDeleteDonatorModalIsOpen] = useState(
    false
  );

  const [donatorToBeUpdated, setDonatorToBeUpdated] = useState({});

  const [donatorToBeDeleted, setDonatorToBeDeleted] = useState("");

  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [donationsPerPage, setDonationsPerPage] = useState(10);

  const [totalDonations, setTotalDonations] = useState(0);

  const { donatorsList, getAllDonators, removeOneDonator } = useContext(
    DonationsContext
  );

  // const [filteredDonationList, setFilteredDonationList] = useState(
  //   donatorsList
  // );

  const {
    userLoggedIn: { is_admin },
  } = useContext(UserContext);

  const filteredDonationList = donatorsList.filter((donation) => {
    return (
      donation.facebook_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  });

  const openUpdateDonatorModal = () => {
    setUpdateDonatorModalIsOpen(true);
  };

  const closeUpdateDonatorModal = () => {
    setUpdateDonatorModalIsOpen(false);
  };

  const openDeleteDonatorModal = () => {
    setDeleteDonatorModalIsOpen(true);
  };

  const closeDeleteDonatorModal = () => {
    setDeleteDonatorModalIsOpen(false);
  };

  useEffect(() => {
    getAllDonators();
    //eslint-disable-next-line
  }, []);

  const indexOfLastDonation = currentPaginationPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = filteredDonationList.slice(
    indexOfFirstDonation,
    indexOfLastDonation
  );
  const array = search ? filteredDonationList : currentDonations;

  // ! TO BE WORKED ON LATER

  // const donations = array.map((donation) => donation.amount);

  // setTotalDonations(
  //   donations.reduce((acc, current) => acc + current),
  //   0
  // );

  return (
    <React.Fragment>
      {donatorsList.length ? (
        <table className="table is-bordered is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Facebook Name</th>
              <th>IGN</th>
              <th>Amount</th>
              <th>Processed By</th>
              <th>Donation Info</th>
              <th>Batch No.</th>
              <th>Date Created</th>
              <th align="center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonationList.length ? (
              array.map((donator) => {
                return (
                  <tr className="logo-font">
                    <td>{donator.donation_id}</td>
                    <td>
                      <span class="tag is-link">
                        <h2 className="title is-6 has-text-white">
                          {donator.facebook_name}
                        </h2>
                      </span>
                    </td>
                    <td>
                      <span class="tag is-primary">
                        <h2 className="title is-6">{donator.ign}</h2>
                      </span>
                    </td>
                    <td>
                      <span class="tag is-warning">
                        <h2 className="title is-5">
                          <span>
                            <i class="fas fa-ruble-sign"></i>{" "}
                          </span>
                          {donator.amount}
                        </h2>
                      </span>
                    </td>
                    <td>
                      <span class="tag is-danger">
                        <h2 className="title is-6 has-text-white">
                          {donator.processed_by}
                        </h2>
                      </span>
                    </td>
                    <td>{donator.donate_info}</td>
                    <td>{donator.batch_no}</td>
                    <td>{moment(donator.created_at).format("MMM Do YYYY")}</td>
                    <td>
                      <div class="field is-grouped">
                        {is_admin ? (
                          <p class="control">
                            <button
                              class="button is-info is-outlined"
                              onClick={() => {
                                setDonatorToBeUpdated(donator);
                                openUpdateDonatorModal();
                              }}
                            >
                              <span class="icon is-small">
                                <i class="fas fa-edit"></i>
                              </span>
                              <span>Update</span>
                            </button>
                          </p>
                        ) : null}

                        <p class="control">
                          <button
                            class="button is-danger is-outlined"
                            onClick={() => {
                              openDeleteDonatorModal();
                              setDonatorToBeDeleted(donator.donation_id);
                              // removeOneDonator(donator.donation_id);
                            }}
                          >
                            <span class="icon is-small">
                              <i class="fas fa-trash-alt"></i>
                            </span>
                            <span>Delete</span>
                          </button>
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9">
                  <div class="notification is-danger has-text-centered">
                    <h2 class="subtitle is-4">
                      Error: Search not found, please try again! ✌✌✌😎😎😎
                    </h2>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <article class="message is-danger has-text-centered">
          <div class="message-header">
            <p>NO DONATIONS FOUND!</p>
          </div>
          <div class="message-body">
            Currently there are no Donations added in the database!
          </div>
        </article>
      )}
      <Pagination
        donationsPerPage={donationsPerPage}
        totalCountDonations={donatorsList.length}
        currentPaginationPage={currentPaginationPage}
        setCurrentPaginationPage={setCurrentPaginationPage}
        indexOfFirstDonation={indexOfFirstDonation}
        indexOfLastDonation={indexOfLastDonation}
      />
      <UpdateDonatorModal
        updateDonatorModalIsOpen={updateDonatorModalIsOpen}
        closeUpdateDonatorModal={closeUpdateDonatorModal}
        donatorToBeUpdated={donatorToBeUpdated}
        setDonatorToBeUpdated={setDonatorToBeUpdated}
      />
      <DeleteDonatorModal
        deleteDonatorModalIsOpen={deleteDonatorModalIsOpen}
        closeDeleteDonatorModal={closeDeleteDonatorModal}
        donatorToBeDeleted={donatorToBeDeleted}
      />
    </React.Fragment>
  );
};

export default DonationsList;
