import React, { useContext } from "react";

import { DonationsContext } from "../../context/DonationsContext";
import { UserContext } from "../../context/UserContext";

const DeleteDonatorModal = ({
  deleteDonatorModalIsOpen,
  closeDeleteDonatorModal,
  donatorToBeDeleted
}) => {
  const { removeOneDonator } = useContext(DonationsContext);
  const { setFlashMessage, userLoggedIn } = useContext(UserContext);

  return (
    <div class={`modal ${deleteDonatorModalIsOpen ? "is-active" : null}`}>
      <div class="modal-background" onClick={closeDeleteDonatorModal}></div>
      <div class="modal-content">
        <div className="box">
          <h4 class="title is-4 has-text-centered">
            Are you sure you want to delete?
          </h4>
          <div class="buttons is-centered">
            <button
              class="button is-success is-medium is-fullwidth"
              onClick={() => {
                removeOneDonator(donatorToBeDeleted, userLoggedIn);
                closeDeleteDonatorModal();
                setFlashMessage({
                  type: "success",
                  msg: "Successfully Deleted Donator"
                });
                setInterval(() => {
                  setFlashMessage({
                    type: "",
                    msg: ""
                  });
                }, 5000);
              }}
            >
              <span class="icon is-small">
                <i class="fas fa-trash-alt"></i>
              </span>
              <span>Yes</span>
            </button>
            <button
              class="button is-danger is-medium is-fullwidth"
              onClick={closeDeleteDonatorModal}
            >
              <span class="icon is-small">
                <i class="fas fa-times-circle"></i>
              </span>
              <span>No</span>
            </button>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        onClick={closeDeleteDonatorModal}
      ></button>
    </div>
  );
};

export default DeleteDonatorModal;
