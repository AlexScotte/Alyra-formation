import { useState } from "react";
import { useFormik } from "formik";
import { AddIcon } from "@chakra-ui/icons";
import { Input, Button, Heading, useToast } from "@chakra-ui/react";

import { toastErrorInputInvalide } from "../../../utils.js";
import { AlertError } from "../../Utils";

const ProposalRegistrationStart = ({ context }) => {
  const toast = useToast();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const { user, contract } = context;

  const formik = useFormik({
    initialValues: {
      proposal: "",
    },
    onSubmit: async (values) => {
      if (!values.proposal) {
        setIsOpenAlert(true);

        toast(toastErrorInputInvalide);
        return;
      }

      try {
        await contract.methods
          .addProposal(values.proposal)
          .send({ from: user.address });

        toast({
          position: "bottom-left",
          title: "Proposal added.",
          description: `Proposal: ${values.proposal}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        formik.setFieldValue("proposal", "");
      } catch (err) {
        console.log("err", err);
      }
    },
  });

  const onChange = (e) => {
    setIsOpenAlert(false);
    formik.handleChange(e);
  };

  return (
    <>
      {user.isVoter ? (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Heading as="h4" size="md" style={{ marginBottom: 4 }}>
              Enter your proposal
            </Heading>
            <Input
              size="lg"
              id="proposal"
              placeholder="My proposal"
              value={formik.values.proposal}
              onChange={onChange}
            />
            <Button
              style={{ marginTop: 24 }}
              size="lg"
              colorScheme="teal"
              type="submit"
              rightIcon={<AddIcon />}
            >
              Add propsal
            </Button>
          </form>
          <AlertError
            isOpen={isOpenAlert}
            errorMessage="Empty value or value is not an address"
            onClickAlert={() => {
              setIsOpenAlert(false);
            }}
          />
        </>
      ) : (
        <Heading as="h3" size="lg">
          ❌ Sorry, but you are not registered.
        </Heading>
      )}
    </>
  );
};

export default ProposalRegistrationStart;
