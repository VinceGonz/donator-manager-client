import React, { useState, useContext } from "react";

import uuid from "uuid";

import { DonationsContext } from "../../context/DonationsContext";

import { UserContext } from "../../context/UserContext";

const NewDonatorForm = ({
  closeNewDonatorModal,
  createModalIsOpen,
  showDonationsList,
  hideExpensesList
}) => {
  const [facebookName, setFacebookName] = useState("");
  const [IGN, setIGN] = useState("");
  const [donationInfo, setDonationInfo] = useState("");
  const [amount, setAmount] = useState(null);
  const [batchNo, setBatchNo] = useState(null);

  const { addNewDonator } = useContext(DonationsContext);
  const { userLoggedIn, setFlashMessage } = useContext(UserContext);

  const resetFields = () => {
    setFacebookName("");
    setIGN("");
    setDonationInfo("");
    setAmount("");
    setBatchNo("");
  };

  return (
    <React.Fragment>
      <div className="box">
        <h2 class="title is-2 has-text-centered logo-font">New Donator Form</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log({ facebookName, IGN, donationInfo, amount, batchNo });
            addNewDonator({
              donation_id: uuid(),
              facebook_name: facebookName,
              ign: IGN,
              donate_info: donationInfo,
              amount,
              processed_by: userLoggedIn.username,
              batch_no: batchNo,
              user_id: userLoggedIn.user_id
            });
            resetFields();
            closeNewDonatorModal();
            setFlashMessage({
              type: "success",
              msg: "Successfully Created New Donator"
            });
            setInterval(() => {
              setFlashMessage({
                type: "",
                msg: ""
              });
            }, 5000);
            showDonationsList();
            hideExpensesList();
          }}
        >
          <div class="field">
            <label htmlFor="facebookName">
              <strong>Facebook Name</strong>
            </label>
            <p class="control has-icons-left has-icons-right">
              <input
                class="input is-primary"
                type="text"
                placeholder="Enter Facebook Name"
                value={facebookName}
                onChange={e => setFacebookName(e.target.value)}
                required
              />
              <span class="icon is-small is-left">
                <strong>
                  <i class="fas fa-user"></i>
                </strong>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <label htmlFor="ign">
              <strong>In Game Name</strong>
            </label>
            <p class="control has-icons-left has-icons-right">
              <input
                class="input is-primary"
                type="text"
                placeholder="Enter IGN"
                value={IGN}
                onChange={e => setIGN(e.target.value)}
                required
              />
              <span class="icon is-small is-left">
                <strong>
                  <i class="fas fa-gamepad"></i>
                </strong>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>

          <div class="field">
            <label htmlFor="amount">
              <strong>Amount</strong>
            </label>
            <p class="control has-icons-left has-icons-right">
              <input
                class="input is-primary"
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
              />
              <span class="icon is-small is-left">
                <strong>
                  <i class="fas fa-dollar-sign"></i>
                </strong>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <label htmlFor="batchNo">
              <strong>Batch No.</strong>
            </label>
            <p class="control has-icons-left has-icons-right">
              <input
                class="input is-primary"
                type="number"
                placeholder="Enter Amount"
                value={batchNo}
                onChange={e => setBatchNo(e.target.value)}
                required
              />
              <span class="icon is-small is-left">
                <strong>
                  <i class="fas fa-list-alt"></i>
                </strong>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <label htmlFor="donationInfo">
              <strong>Donation Info</strong>
            </label>
            <textarea
              class="textarea is-primary"
              placeholder="Enter Donation Information"
              value={donationInfo}
              onChange={e => setDonationInfo(e.target.value)}
              required
            ></textarea>
          </div>

          <div class="field is-grouped">
            <p class="control">
              <button class="button is-link" type="submit">
                Submit
              </button>
            </p>
            <p class="control">
              <button class="button is-danger" onClick={() => resetFields()}>
                Reset
              </button>
            </p>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NewDonatorForm;
