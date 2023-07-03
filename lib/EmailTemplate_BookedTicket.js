import styled from "styled-components";
import ReactDOM from "react-dom";

export function getEmailText(ticket, ticketId, SITE_HOST) {
  return `
      Hallo ${ticket.firstName}
      You have successfully booked tickets of ${ticket.tripName}
      
        Please keep this QR code safe and confidential. <br />
        Show it to a member of staff of your booked shipping company before you
        go on board.
      
      You can make changes to your purchased ticket via this link:
      ${SITE_HOST}/ticket/${ticket.company}/${ticketId}
    `;
}

export default function EmailTemplate_BookedTicket(
  ticket,
  ticketId,
  codeURL,
  SITE_HOST
) {
  return `
      <h1>Hallo ${ticket.firstName}</h1>
      <p>You have successfully booked tickets of ${ticket.tripName}</p>
      <p>
        Please keep this QR code safe and confidential. <br />
        Show it to a member of staff of your booked shipping company before you
        go on board.
      </p>
      <img src="${codeURL}" />
      <p>You can make changes to your purchased ticket via this link:</p>
      <a href="${SITE_HOST}/ticket/${ticket.company}/${ticketId}">
        ${SITE_HOST}/ticket/${ticket.company}/${ticketId}
      </a>
    `;

  // return "Email text";
}
