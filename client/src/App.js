/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap'

function App() { 
  const [fetchData, setFetchData] = useState([])
  const [state, setState] = useState({ bookName: '', review: '' });
  const handleChange = e => {
      const { name, value } = e.target;
      setState(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  useEffect(() => {
    axios.get("/api/get")
      .then((response) => {
        setFetchData(response.data)
      })
  }, [])

  const submit = () => {
    axios.post('/api/insert', state)
      .then(() => { alert('success post') })
    console.log(state)
    document.location.reload();
  }

  const del = (id) => {
    if (confirm("Do you want to delete? ")) {
      axios.delete(`/api/delete/${id}`)
      document.location.reload()
    }
  }

  const edit = (id) => {
    axios.put(`/api/update/${id}`, state)
    document.location.reload();
  }

  let card = fetchData.map((val, key) => {
    return (
      <React.Fragment key={key}>
        <Card style={{ width: '18rem' }} className='m-2'>
          <Card.Body>
            <Card.Title>{val.book_name}</Card.Title>
            <Card.Text>
              {val.book_review}
            </Card.Text>
            <input name='reviewUpdate' onChange={handleChange} placeholder='Update Review' ></input>
            <Button className='m-2' onClick={() => edit(val.id)}>Update</Button>
            <Button onClick={() => del(val.id)}>Delete</Button>
          </Card.Body>
        </Card>
      </React.Fragment>
    )
  })

  return (
    <div className='App'>
      <h1>Dockerized Fullstack React Hooks Application</h1>
      <div className='form'>
        <input name='setBookName' placeholder='Enter Book Name' onChange={handleChange} />
        <input name='setReview' placeholder='Enter Review' onChange={handleChange} />
      </div>

      <Button className='my-2' variant="primary" onClick={() => submit()}>Submit</Button> <br /><br/>

      <Container>
        <Row>
          {card}
        </Row>
      </Container>
    </div>
  )
}

export default App;