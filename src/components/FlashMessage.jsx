import React from "react";

const FlashMessage = ({ type, msg }) => {
  return (
    <div
      class={`notification is-${type} has-text-centered logo-font has-text-black-bis is-size-5`}
    >
      <span class="icon is-medium">
        <i class="fas fa-check"></i>
      </span>
      <strong>{msg}</strong>
    </div>
  );
};

export default FlashMessage;
