import React, { useState, useEffect, useContext } from "react";

import { DonationsContext } from "../../context/DonationsContext";
import { UserContext } from "../../context/UserContext";

const UpdateDonatorForm = ({
  closeUpdateDonatorModal,
  donatorToBeUpdated,
  setDonatorToBeUpdated
}) => {
  const {
    facebook_name,
    ign,
    amount,
    batch_no,
    processed_by,
    donate_info
  } = donatorToBeUpdated;

  const { updateDonator } = useContext(DonationsContext);
  const { setFlashMessage, users } = useContext(UserContext);

  return (
    <React.Fragment>
      <div className="box">
        <h2 class="title is-2 has-text-link has-text-centered is-family-monospace">
          Update Donator
        </h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log(donatorToBeUpdated);
          }}
        >
          <label htmlFor="facebookName">
            <strong>Facebook Name</strong>
          </label>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text"
                value={facebook_name}
                onChange={e =>
                  setDonatorToBeUpdated({
                    ...donatorToBeUpdated,
                    facebook_name: e.target.value
                  })
                }
                placeholder="Enter Facebook Name"
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
          <label htmlFor="ign">
            <strong>In Game Name</strong>
          </label>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text "
                value={ign}
                onChange={e =>
                  setDonatorToBeUpdated({
                    ...donatorToBeUpdated,
                    ign: e.target.value
                  })
                }
                placeholder="Enter In Game Name"
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
          <label htmlFor="amount">
            <strong>Amount</strong>
          </label>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="number "
                value={amount}
                onChange={e =>
                  setDonatorToBeUpdated({
                    ...donatorToBeUpdated,
                    amount: e.target.value
                  })
                }
                placeholder="Enter Amount"
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
          <label htmlFor="batchNo">
            <strong>Batch No.</strong>
          </label>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text "
                value={batch_no}
                onChange={e =>
                  setDonatorToBeUpdated({
                    ...donatorToBeUpdated,
                    batch_no: e.target.value
                  })
                }
                placeholder="Enter Batch No."
                required
              />
              <span class="icon is-small is-left">
                <strong>
                  <i class="fas fa-hashtag"></i>
                </strong>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <label htmlFor="processedBy">
            <strong>Processed By</strong>
          </label>
          <div className="field">
            <div class="control has-icons-left">
              <div class="select is-fullwidth is-success">
                <select
                  defaultValue={processed_by}
                  onChange={e =>
                    setDonatorToBeUpdated({
                      ...donatorToBeUpdated,
                      processed_by: e.target.value
                    })
                  }
                >
                  <option value={processed_by} selected>
                    {processed_by}
                  </option>
                  {users.map(user => {
                    if (user.username !== processed_by) {
                      return (
                        <option value={`${user.username}`}>
                          {user.username}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <span class="icon is-left">
                <strong>
                  <i class="fas fa-user-secret"></i>
                </strong>
              </span>
            </div>
          </div>
          <label htmlFor="donate_info">
            <strong>Donation Info</strong>
          </label>
          <div className="field">
            <textarea
              class="textarea is-success"
              placeholder="Enter Donation Info"
              value={donate_info}
              onChange={e =>
                setDonatorToBeUpdated({
                  ...donatorToBeUpdated,
                  donate_info: e.target.value
                })
              }
              required
            ></textarea>
          </div>
          <div class="field is-grouped">
            <p class="control">
              <button
                class="button is-success"
                type="submit"
                onClick={() => {
                  updateDonator(donatorToBeUpdated);
                  closeUpdateDonatorModal();
                  setFlashMessage({
                    type: "success",
                    msg: "Successfully Updated Donator"
                  });

                  setInterval(() => {
                    setFlashMessage({
                      type: "",
                      msg: ""
                    });
                  }, 7000);
                }}
              >
                <span class="icon is-small">
                  <i class="fas fa-save"></i>
                </span>
                <span>Save Changes</span>
              </button>
            </p>

            <p class="control">
              <button
                class="button is-danger"
                onClick={closeUpdateDonatorModal}
              >
                <span class="icon is-small">
                  <i class="fas fa-times-circle"></i>
                </span>
                <span>Cancel</span>
              </button>
            </p>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UpdateDonatorForm;
