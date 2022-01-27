import styled from "styled-components";
import { Card } from "../../antd_components";

export const CenterForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const SignFormContainer = styled(Card)`
  width: ${({ width }) => width};
  border-radius: 5px;
  background-color: #eeeeee;
  margin-bottom: 50px;
`;

export const FormHeader = styled.div`
  margin: ${({ margin }) => margin};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
