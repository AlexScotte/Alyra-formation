import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue, setText }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputText, setInputText] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };



  const handleTextChange = e => {
    setInputText(e.target.value);
  };

  const readGreet = async () => {
    const value = await contract.methods.greet().call({ from: accounts[0] });
    setText(value);
  };

  const setGreet = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputText === "") {
      alert("Please enter a value to write.");
      return;
    }
    await contract.methods.setGreet(inputText).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <button onClick={read}>
        read()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

      <button onClick={readGreet}>
        readGreet()
      </button>

      <div onClick={setGreet} className="input-btn">
        set greet(<input
          type="text"
          placeholder="string"
          value={inputText}
          onChange={handleTextChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
