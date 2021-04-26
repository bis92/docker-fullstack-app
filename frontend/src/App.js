import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [lists, setLists] = useState([]);
  const [value, setvalue] = useState("");

  useEffect(() => {

    axios.get('/api/values')
      .then(response => {
        console.log('response', response)
        setLists(response.data)
      })

  }, [])

  const changeHandler = (event) => {
    setvalue(event.currentTarget.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();


    axios.post('/api/value', {value: value})
      .then(response => {
        if(response.data.success){
          console.log('response', response);
          setLists([...lists, response.data])
          setvalue("")
        } else {
          alert("값을 DB에 넣는데 실패했습니다ㅠㅠ");
        }
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">

          {lists && lists.map((list, index) => (
            <li key={index}>{list.value}</li>
          ))}

          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              value={value}
              placeholder="입력해주세요..."
              onChange={changeHandler}
            />
            <button type="submit" onClick={submitHandler}>확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
