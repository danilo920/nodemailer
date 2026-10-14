
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const dotenv = require('dotenv').config() ;
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
   res.render("pages/index", { valores: {nome: "",email: "",numero: "",assunto: "", mensagem: ""
       },
        
       erros: []
   });

});

router.post("/", [
   body("nome")
       .trim()
       .notEmpty()
       .withMessage("O nome é obrigatório.")
       .isLength({ min: 3 })
       .withMessage("O nome deve ter pelo menos 3 caracteres."),
   body("email")
       .trim()
       .notEmpty()
       .withMessage("O email é obrigatório.")
       .bail()
       .isEmail()
       .withMessage("Digite um email válido."),
   body("numero")
       .trim()
       .notEmpty()
       .withMessage("O número é obrigatório.")
       .bail()
       .matches(/^\d{11}$/)
       .withMessage("Digite um número com 11 dígitos, incluindo o DDD."),
   body("assunto")
       .trim()
       .notEmpty()
       .withMessage("O assunto é obrigatório."),
   body("mensagem")
       .trim()
       .notEmpty()
       .withMessage("A mensagem é obrigatória.")
       .isLength({ min: 10 })
       .withMessage("A mensagem deve ter pelo menos 10 caracteres.")
], (req, res) => {
   const erros = validationResult(req);
   if (!erros.isEmpty()) {
       return res.status(400).render("pages/index", {
           valores: req.body,
           erros: erros.array()
       });
   }
   res.send("Formulário enviado com sucesso!");

let transporter = nodemailer.createTransport({
    service: 'danilomelodevechi@gmail.com' , 
    auth : {
        user : process.env.EMAIL_USER,
         user : process.env.EMAIL_PASS
    },

    tls : {
        secure : false,
        ignoreTLS : true,
        rejectUnauthorized : false,

    }
})

const mailOptions = {
    to: "",
    subject: "",
    text: "",
    html: ""

};

transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
    } else{
        console.log(info);
        console.log("email enviado com sucesso");
    }
})



});





module.exports = router;