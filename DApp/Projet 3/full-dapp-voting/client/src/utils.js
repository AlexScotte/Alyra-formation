import { WorkflowStatus } from "./globals.js";

export const workflowStatusText = (status) => {
  switch (status) {
    case WorkflowStatus.RegisteringVoters:
      return "Registering voters";
    case WorkflowStatus.ProposalsRegistrationStarted:
      return "Proposals registration started";
    case WorkflowStatus.ProposalsRegistrationEnded:
      return "Proposals registration ended";
    case WorkflowStatus.VotingSessionStarted:
      return "Voting session started";
    case WorkflowStatus.VotingSessionEnded:
      return "Voting session ended";
    case WorkflowStatus.VotesTallied:
      return "Votes tallied";
    default:
      return "";
  }
};

export const errorManager = (error) => {
  console.log("Error:", error);
  const msg = error.toString().split('"')[3].split(":")[1].split("revert ")[1];
  return msg ? msg : "An error has occured";
};

export const addressFormated = (addr) =>
  `${addr.substring(0, 5)}...${addr.substr(addr.length - 5)}`;

export const toastErrorInputInvalide = {
  position: "bottom-left",
  title: "Error.",
  description: `Input invalide`,
  status: "error",
  duration: 5000,
  isClosable: true,
};
