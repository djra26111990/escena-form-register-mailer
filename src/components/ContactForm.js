import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

const headers = {
  'Content-Type': 'application/json',
}

const ContactForm = () => {
  const [state, setState] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    nombreNino: '',
    apellidoNino: '',
    ciudad: ''
  })

  const [result, setResult] = useState(null)

  const sendEmail = (event) => {
    event.preventDefault()
    axios
      .post('/send', { ...state }, headers)
      .then((response) => {
        setResult(response.data)
        setState({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          nombreNino: '',
          apellidoNino: '',
          ciudad: ''
        })
        console.log(result)
      })
      .catch(() => {
        setResult({
          success: false,
          message: 'Algo salió mal, ¡por favor intenta nuevamente!',
        })
      })
  }

  const onInputChange = (event) => {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <div>
      {result && (
        <p className={`${result.success ? 'success' : 'error'}`}>
          {result.message}
        </p>
      )}
      <form onSubmit={sendEmail}>
        <Form.Group controlId='nombre'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type='text'
            name='nombre'
            value={state.nombre}
            placeholder='Ingrese su Nombre'
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId='apellido'>
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type='text'
            name='apellido'
            value={state.apellido}
            placeholder='Ingrese su Apellido'
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            name='email'
            value={state.email}
            placeholder='Ingrese su email'
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId='telefono'>
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type='text'
            name='telefono'
            value={state.telefono}
            placeholder='Número de teléfono'
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId='nombreNino'>
          <Form.Label>Nombre del niño</Form.Label>
          <Form.Control
            type='text'
            name='nombreNino'
            value={state.nombreNino}
            placeholder='Introduzca nombre de su representado'
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId='apellidoNino'>
          <Form.Label>Apellido del niño</Form.Label>
          <Form.Control
            type='text'
            name='apellidoNino'
            value={state.apellidoNino}
            placeholder='Introduzca Apellido de su representado'
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId='ciudad'>
          <Form.Label>Ciudad</Form.Label>
          <Form.Control 
          as='select' 
          name="ciudad"
          value={state.ciudad}
          onChange={onInputChange}
          >
            <option>--------------</option>
            <option>Guayaquil</option>
            <option>Quito</option>
            <option>Loja</option>
            <option>Milagro</option>
            <option>Sanborondón</option>
          </Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Registrar
        </Button>
      </form>
    </div>
  )
}

export default ContactForm
