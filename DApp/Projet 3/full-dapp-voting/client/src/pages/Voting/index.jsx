import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";

import useEth from "../../contexts/EthContext/useEth";

import WorkflowStatus from "../../components/WorkflowStatus/WorkflowStatus";
import FormsContainer from "../../components/FormsContainer";
import Metrics from "../../components/Metrics";
import Profile from "../../components/Profile";

const Voting = () => {
  const { state } = useEth();
  const [workflowStatus, setWorkflowStatus] = useState(0);

  useEffect(() => {
    if (!state.contract) {
      return;
    }

    const getWorkflowStatus = async () => {
      const value = await state.contract.methods.workflowStatus().call();
      setWorkflowStatus(parseInt(value));
    };

    getWorkflowStatus();
  }, [state]);

  useEffect(() => {
    if (!state.contract) {
      return;
    }

    const listenWorkflowStatusChange = async () => {
      await state.contract.events
        .WorkflowStatusChange({ fromBlock: "earliest" })
        .on("data", (event) => {
          setWorkflowStatus(parseInt(event.returnValues.newStatus));
        })
        .on("error", (err) => console.log(err));
    };

    listenWorkflowStatusChange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <Profile user={state.user} contract={state.contract} />
      <Flex justify="space-between" style={{ marginTop: 32 }}>
        <WorkflowStatus currentStatus={workflowStatus} />
        <FormsContainer currentStatus={workflowStatus} />
      </Flex>
      <Metrics contract={state.contract} user={state.user} />
    </>
  );
};

export default Voting;
