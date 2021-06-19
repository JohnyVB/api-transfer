const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORTEMAIL,
    secure: false,
    auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASSSMTP
    }
});

const sendEmail = async (email = '', token = '') => {
    
    transporter.verify((error, success) => {
        if (error) {
            throw new Error('la conexión al servidor SMTP fallo', error)
        }else{
            console.log('Conexión al servidor SMTP exitosa');
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

const sendUid = async (email = '', token = '') => {

    transporter.verify((error, success) => {
        if (error) {
            throw new Error('la conexión al servidor SMTP fallo', error)
        }else{
            console.log('Conexión al servidor SMTP exitosa');
        }
    });

    await transporter.sendMail({
        from: `Transferencia y Giros <${process.env.USEREMAIL}>`,
        to: email,
        subject: 'NOTIFICACIÓN: Regisro en Transferencias y giros',
        html: `<p>Se ha enviado este correo para activar su cuenta en Transferencias y giros, click</p> 
               <p>siguiente link: </p><a href='http://localhost:4200/activation/${token}'>Click aqui</a>
               <p><strong>Si no realizo el registro por favor omitir este correo.</strong></p>   
            `
    });

}

module.exports = {
    sendEmail,
    sendUid
};