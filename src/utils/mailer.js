const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail', // o 'hotmail', etc.
    auth: {
        user: config.email.user,
        pass: config.email.password
    }
});

async function sendWelcomeEmail(to, password) {
    const mailOptions = {
        from: '"Tu App" <tu-email@gmail.com>',
        to,
        subject: 'Bienvenido/a a nuestra plataforma',
        html: `
      <h2>¡Bienvenido!</h2>
      <p>Tu cuenta ha sido creada exitosamente.</p>
      <p><strong>Email:</strong> ${to}</p>
      <p><strong>Contraseña:</strong> ${password}</p>
      <p style="color:red;">Por favor, cambia tu contraseña después de iniciar sesión.</p>
    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        return info;
    } catch (error) {
        console.error('Error al enviar correo:', error);
        throw error;
    }
}

module.exports = { sendWelcomeEmail };