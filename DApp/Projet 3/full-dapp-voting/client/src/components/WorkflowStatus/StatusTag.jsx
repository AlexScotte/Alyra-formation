import styled from "styled-components";
import { Box } from "@chakra-ui/react";

import { workflowStatusText } from "../../utils.js";

const getColor = (status) =>
  status === "current" ? "teal300" : status === "old" ? "old" : "comming";

const Container = styled(Box)`
  font-weight: 700;
  font-size: 12px;
  border-radius: 4px;
  ${({ theme, status }) => `
    box-shadow: ${status !== "current" ? "none" : theme.shadow};
    padding: ${theme.space.one};
    opacity: ${status !== "current" ? 0.5 : 1};
  `}
`;

const StatusTag = ({ workflowStatus, status }) => {
  return (
    <Container bg={getColor(status)} status={status}>
      {workflowStatusText(workflowStatus)}
    </Container>
  );
};

export default StatusTag;
