import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const AlertError = ({ isOpen, errorMessage, onClickAlert }) => {
  return (
    <>
      {isOpen && (
        <Alert
          onClick={onClickAlert}
          style={{ borderRadius: 4, marginTop: 24, cursor: "pointer" }}
          status="error"
        >
          <AlertIcon />
          <AlertTitle>ERROR !</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default AlertError;
