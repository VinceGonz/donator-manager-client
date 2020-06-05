import React from "react";

import NewDonatorForm from "../forms/NewDonatorForm";

const NewDonatorModal = ({
  createModalIsOpen,
  closeNewDonatorModal,
  showDonationsList,
  hideExpensesList
}) => {
  return (
    <div class={`modal ${createModalIsOpen ? "is-active" : null}`}>
      <div class="modal-background" onClick={closeNewDonatorModal}></div>
      <div class="modal-content">
        <NewDonatorForm
          closeNewDonatorModal={closeNewDonatorModal}
          createModalIsOpen={createModalIsOpen}
          showDonationsList={showDonationsList}
          hideExpensesList={hideExpensesList}
        />
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        onClick={closeNewDonatorModal}
      ></button>
    </div>
  );
};

export default NewDonatorModal;
