const transporter = require('../config')
const Form = require('../models/form.model')
const sendRoute = (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      telefono,
      nombreNino,
      apellidoNino,
      ciudad
    } = req.body

    const newForm = new Form({
      nombre,
      apellido,
      email,
      telefono,
      nombreNino,
      apellidoNino,
      ciudad
    })

    newForm
      .save()
      .then(() => res.json('Formulario enviado!'))
      .catch((err) => res.status(400).json('Error: ' + err))

    const mailOptions = {
      from: 'Escena <contacto@escenaarteyteatro.com>',
      to: email,
      subject: 'BOLETO',
      html: `
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${nombre}</li>
        <li>Email: ${email}</li>
        <li>Teléfono: ${telefono}</li>
        <li>Ciudad: ${ciudad}</li>
      </ul>
      `,
    }

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Algo salió mal, ¡por favor intenta nuevamente!',
        })
      } else {
        res.send({
          success: true,
          message: 'Gracias por registrarte, en breve te llegará un correo con los pasos a seguir',
        })
      }
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Algo salió mal, ¡por favor intenta nuevamente!',
    })
  }
}

module.exports = sendRoute
