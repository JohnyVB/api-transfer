const nodemailer = require('nodemailer');

const sendEmail = async (email = '', token = '') => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORTEMAIL,
        secure: false,
        auth: {
            user: process.env.USEREMAIL,
            pass: process.env.PASSSMTP
        }
    });

    transporter.verify((error, success) => {
        if (error) {
            throw new Error('la conexion al servidor SMTP fallo', error)
        }else{
            console.log('Correo enviado');
        }
    });

    await transporter.sendMail({
        from: `Transferencia y Giros <${process.env.USEREMAIL}>`,
        to: email,
        subject: 'NOTIFICACIÓN: Cambio de contraseña',
        html: `<p>Se ha enviado este correo para cambiar su contraseña ingrese al</p> 
               <p>siguiente link: </p><a href='http://localhost:4200/reset/${token}'>Click aqui</a>
               <p><strong>Si no enviaste este correo por favor omitelo.</strong></p>   
            `
    });
}

module.exports = {
    sendEmail
};