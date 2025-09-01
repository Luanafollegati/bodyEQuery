// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

// Importar Lista de Array
import dados from "./src/data/dados.js";
const { bruxos, varinhas, pocoes, animais } = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando...");
});

app.get("/bruxos", (req, res) => {
  const { casa, ano, especialidade, nome } = req.query;
  let resultado = bruxos;

  if (casa) {
    resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
  };

  if (ano) {
    resultado = resultado.filter((b) => b.ano == ano);
  };

  if (especialidade) {
    resultado = resultado.filter((b) =>
      b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
  };

  if (nome) {
    resultado = resultado.filter((b) =>
      b.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
});

//Adicionar o bruxo na minha lista
app.post("/bruxos", (req, res) => {
  const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } =
    req.body;

  if (!nome || !casa) {
    return res.status(400).json({
      sucess: false,
      mensage: "Nome e casa são obrigatórios para um bruxo!",
    });
  }

  const novoBruxo = {
    id: bruxos.length + 1,
    nome,
    casa: casa,
    ano: parseInt(ano),
    varinha: varinha,
    mascote,
    patrono,
    especialidade: especialidade || "Ainda não atribuido!",
    vivo: vivo,
  };

bruxos.push(novoBruxo);

res.status(201).json({
    sucess:true,
    message: "Novo bruxo adicionado a Hogwarts!",
    data: novoBruxo,
})
});

app.get("/varinhas", (req, res) => {
    const {material, nucleo} = req.query;
    let resultadoVarinhas = varinhas;

    if (material) {
        resultadoVarinhas = resultadoVarinhas.filter (v => v.material.toLowerCase() === material.toLowerCase());  
      };

      if (nucleo) {
        resultadoVarinhas = resultadoVarinhas.filter (v => v.nucleo.toLowerCase() === nucleo.toLowerCase());
    }
      
      res.status(200).json({
        total: resultadoVarinhas.length,
        data: resultadoVarinhas,
      });
    });

    app.get("/pocoes", (req, res) => {
        const {nome, efeito} = req.query;
        let resultadoPocoes = pocoes;
    
        if (nome) {
            resultadoPocoes = resultadoPocoes.filter (p => p.nome.toLowerCase() === nome.toLowerCase());  
          };
    
          if (efeito) {
            resultadoPocoes = resultadoPocoes.filter (p => p.efeito.toLowerCase() === efeito.toLowerCase());
        }
          
          res.status(200).json({
            total: resultadoPocoes.length,
            data: resultadoPocoes,
          });
        });

        app.get("/animais", (req, res) => {
            const {tipo, nome} = req.query;
            let resultadoAnimais = pocoes;
        
            if (tipo) {
                resultadoAnimais = resultadoAnimais.filter (a => a.tipo.toLowerCase() === tipo.toLowerCase());  
              };
        
              if (nome) {
                resultadoAnimais = resultadoAnimais.filter (a => a.nome.toLowerCase() === nome.toLowerCase());
            }
              
              res.status(200).json({
                total: resultadoAnimais.length,
                data: resultadoAnimais,
              });
            });
    

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
  });