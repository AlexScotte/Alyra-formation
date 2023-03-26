import styled from "styled-components";
import { Heading } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import StatusTag from "./StatusTag";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    margin: ${({ theme }) => theme.space.three} 0;
  }
`;

const List = styled.ul`
  width: max-content;
  list-style: none;

  ${({ theme }) => `
    padding-right: ${theme.space.five};
    border-right: 1px solid ${theme.colors.borderGrey};

    > li {
      position: relative;
      margin-bottom: ${theme.space.one};
      &:last-child {
        margin-bottom: 0;
      }
    }
  `}

  .check-circle {
    position: absolute;
    top: -6px;
    right: -10px;
    z-index: 1;
  }
`;

const WorkflowStatus = ({ currentStatus }) => {
  const workflows = [0, 1, 2, 3, 4, 5];

  const getStatusLabel = (currentStatus, workflowStatus) =>
    currentStatus === workflowStatus
      ? "current"
      : workflowStatus >= currentStatus
      ? "comming"
      : "old";

  return (
    <Container>
      <Heading as="h2" size="xl">
        ⬇️ Work flow steps
      </Heading>
      <List>
        {workflows.map((workflow, index) => (
          <li key={index}>
            <StatusTag
              workflowStatus={workflow}
              status={getStatusLabel(currentStatus, workflow)}
            />
            {getStatusLabel(currentStatus, workflow) === "old" && (
              <CheckCircleIcon
                className="check-circle"
                w={6}
                h={6}
                color="#57b47e"
              />
            )}
          </li>
        ))}
      </List>
    </Container>
  );
};

export default WorkflowStatus;
