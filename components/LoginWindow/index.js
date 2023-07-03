import Router from "next/router";
import styled from "styled-components";
import Button from "../elements/Button";
import { InfoBox_Row } from "../elements/InfoBox_Row/InfoBox_Row.styled";

const Form = styled.form`
  z-index: 10;
`;

const Formular = styled.fieldset`
  padding: 10% 5%;
  width: 65%;
  height: 40%;
  position: absolute;
  top: 10%;
  left: 15%;
  background-color: #2b2a33;
  border: #8f8f9d solid 1px;
`;

const FormLegend = styled.legend`
  /* position: relative;
  top: 5px; */
`;

const InputField = styled.input`
  width: 50%;
`;

const LoginButton = styled(Button)`
  margin: 1em 0 1em 0;
  position: relative;
  top: 0;
  left: 60%;
`;

async function handleLoginSubmit(event) {
  event.preventDefault();
  console.log("LoginWindow - Absenden login-Daten");

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const url = "/api/auth/login";
  console.log("## ---> FormData in LoginWindow: ", data);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  //   console.log("JSON: ", json);
  if (json.success) {
    // console.log("LoginWindow: SUCCESS is OKAY!");
    // reloading the page
    Router.reload();
  }
}

export default function LoginWindow() {
  return (
    <Form onSubmit={handleLoginSubmit}>
      <Formular>
        <FormLegend>Partner Login</FormLegend>
        <InfoBox_Row>
          <label htmlFor="company">Reederei:</label>
          <InputField type="text" id="company" name="company" />
        </InfoBox_Row>
        <InfoBox_Row>
          <label htmlFor="name">Mitarbeiter:</label>
          <InputField type="text" id="name" name="name" />
        </InfoBox_Row>
        <InfoBox_Row>
          <label htmlFor="password">Password:</label>
          <InputField type="password" id="password" name="password" />
        </InfoBox_Row>
        <LoginButton type="submit">Anmelden</LoginButton>
      </Formular>
    </Form>
  );
}
