import { useState } from "react";
import {
  Input,
  InputLeftAddon,
  InputGroup,
  Button,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { AlertError } from "../../Utils";
import { errorManager } from "../../../utils.js";

const VotingSessionStarted = ({ context }) => {
  const { user, contract } = context;
  const toast = useToast();
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      proposalId: "",
    },

    onSubmit: async (values) => {
      const unknownPropToast = {
        position: "bottom-left",
        title: "Propsal error.",
        description: "The proposal does not exist !",
        status: "error",
        duration: 5000,
        isClosable: true,
      };

      if (!isValidProposal(values.proposalId)) {
        toast(unknownPropToast);
        setIsOpenAlert(true);
        return;
      }

      // Get the proposal informations from the proposal id and display them
      try {
        await contract.methods
          .getOneProposal(values.proposalId)
          .call({ from: user.address });
      } catch (error) {
        toast(unknownPropToast);
        setIsOpenAlert(true);
        return;
      }

      try {
        // Set vote
        await contract.methods
          .setVote(values.proposalId)
          .send({ from: user.address });

        window.location.reload(false);

        toast({
          position: "bottom-left",
          title: "Voted !",
          description: "Successfully voted !",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          position: "bottom-left",
          title: "Voting call error.",
          description: `${errorManager(error)}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsOpenAlert(true);
      }
    },
  });

  const onChange = (e) => {
    formik.handleChange(e);
  };

  const isValidProposal = (id) => {
    // Check if the value entered by the user is a number and if it's not the default proposal at index 0
    var isNumber = /^\d+$|^$/.test(id);
    var isGenesisProp = id === "0";
    const isValid = isNumber && !isGenesisProp;
    return isValid;
  };

  return (
    <>
      {user.isOwner && !user.isVoter ? (
        <VStack align="start" spacing="24px">
          <Heading as="h3" size="lg">
            ⏳ Voters are voting...
          </Heading>
        </VStack>
      ) : (
        <>
          {user.isVoter ? (
            <form onSubmit={formik.handleSubmit}>
              <VStack align="start" spacing="24px">
                <InputGroup size="lg">
                  <InputLeftAddon children="id" />
                  <Input
                    errorBorderColor="red.300"
                    id="proposalId"
                    placeholder="Proposal ID"
                    value={formik.values.proposalId}
                    onChange={onChange}
                  />
                </InputGroup>

                <Button
                  size="lg"
                  colorScheme="teal"
                  type="submit"
                  rightIcon={<CheckIcon />}
                >
                  Vote
                </Button>
              </VStack>
              <AlertError
                isOpen={isOpenAlert}
                errorMessage="Empty value or bad id"
                onClickAlert={() => {
                  setIsOpenAlert(false);
                }}
              />
            </form>
          ) : (
            <Heading as="h3" size="lg">
              ❌ Sorry, but you are not registered.
            </Heading>
          )}
        </>
      )}
    </>
  );
};

export default VotingSessionStarted;
