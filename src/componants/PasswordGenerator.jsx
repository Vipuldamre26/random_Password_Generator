import { useState } from "react";
import "./password.css";
import { FaCopy } from "react-icons/fa";



const PasswordGenerator = () => {
    const [password, changePassword] = useState();
    const [num, changeNum] = useState(8);
    const [uppercase, isUppercase] = useState(false);
    const [lowercase, isLowercase] = useState(false);
    const [number, isNumber] = useState(false);
    const [symbol, isSymbol] = useState(false);

    const arrLowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const arrUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const arrSymbols = `~!@#$%^&*()_+-=[]{}|;:'",<.>/?`;
    const arrNumbers = '0123456789';



    // if user change in the number in the input then we make state to this number by changeNum(num); 
    let numberChanged = () => {
        let numValue = document.querySelector("#inputNum");
        changeNum(numValue.value);
    };


    // after clicking the button to generate password this function will call 
    const generatePassword = () => {

        // first we check if all state is false then we add alert 
        const allFalse = [uppercase, lowercase, number, symbol].every(variable => variable === false);
        if (allFalse) {
            alert('Please select the at least one checkbox');
            return;
        }


        // again we check that the num will be fit in the range if it does not then make alert 
        if (num < 8 || num > 50) {
            alert('Length out of mentioned range');
            return;
        }


        // getRandom() give you a one random letter and based on the number we make password of that length 
        let password = '';
        for (let i = 0; i < num; i++) {
            password += getRandom();
        }

        // updating the password to changePassword state so it will render the dom 
        changePassword(password);

        // return password;
    };



    // getRandom() will give a single letter 
    function getRandom() {

        const arr = [];
        if (uppercase) {
            arr.push(arrUpperCase[Math.floor(Math.random() * arrUpperCase.length)]);
        }

        if (lowercase) {
            arr.push(arrLowerCase[Math.floor(Math.random() * arrLowerCase.length)]);
        }

        if (number) {
            arr.push(arrNumbers[Math.floor(Math.random() * arrNumbers.length)]);
        }

        if (symbol) {
            arr.push(arrSymbols[Math.floor(Math.random() * arrSymbols.length)]);
        }


        // so each if statement add single random element

        // it will return a single random element from arr 
        return arr[Math.floor(Math.random() * arr.length)];
    }


    // copying password 
    const copyPassword = () => {
        var copyText = document.querySelector('.inputText').value;
        try {
            navigator.clipboard.writeText(copyText);
            alert('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }


    return (
        <div className="password">
            <h2>Password Generator</h2>
            <div className="input">
                <input className="inputText" disabled type="text" value={password}></input>
                <div className="copy">
                    <FaCopy onClick={copyPassword} className="icon" />
                </div>
            </div>
            <div className="length">
                <p>Select Password length(**8-50 characters**)</p>
                <input
                    value={num}
                    id="inputNum"
                    onChange={numberChanged}
                    type="number"
                ></input>
            </div>

            <div className="check">
                <div className="item">
                    <input
                        checked={uppercase}
                        onChange={() => !uppercase ? isUppercase(true) : isUppercase(false)}  // or we can pass..... (e) => {isUppercase(e.target.checked)}.... in the onChange
                        id="input1"
                        type="checkbox"
                    ></input>
                    <label for="input1">Include upper case</label>
                </div>

                <div className="item">
                    <input
                        checked={lowercase}
                        onChange={() => !lowercase ? isLowercase(true) : isLowercase(false)}
                        id="input2"
                        type="checkbox"
                    ></input>
                    <label for="input2">Include lower case</label>
                </div>

                <div className="item">
                    <input
                        checked={number}
                        onChange={() => !number ? isNumber(true) : isNumber(false)}
                        id="input3"
                        type="checkbox"
                    ></input>
                    <label for="input3">Include Numbers</label>
                </div>

                <div className="item">
                    <input
                        checked={symbol}
                        onChange={() => !symbol ? isSymbol(true) : isSymbol(false)}
                        id="input4"
                        type="checkbox"
                    ></input>
                    <label for="input4">Include Symbols</label>
                </div>
                <button onClick={generatePassword}>Generate Password</button>
            </div>
        </div>
    );
};

export default PasswordGenerator;



