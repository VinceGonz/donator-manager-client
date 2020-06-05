import React from "react";

import UpdateDonatorForm from "../forms/UpdateDonatorForm";

const UpdateDonatorModal = ({
  updateDonatorModalIsOpen,
  closeUpdateDonatorModal,
  donatorToBeUpdated,
  setDonatorToBeUpdated
}) => {
  return (
    <div class={`modal ${updateDonatorModalIsOpen ? "is-active" : null}`}>
      <div class="modal-background" onClick={closeUpdateDonatorModal}></div>
      <div class="modal-content">
        <UpdateDonatorForm
          closeUpdateDonatorModal={closeUpdateDonatorModal}
          updateDonatorModalIsOpen={updateDonatorModalIsOpen}
          donatorToBeUpdated={donatorToBeUpdated}
          setDonatorToBeUpdated={setDonatorToBeUpdated}
        />
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        onClick={closeUpdateDonatorModal}
      ></button>
    </div>
  );
};

export default UpdateDonatorModal;
