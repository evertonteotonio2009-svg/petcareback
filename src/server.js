class Petcare{
    constructor(nome, valor, id) {
        this.nome = nome;
        this.valor = valor;
        this.id = id;
    }
}

const servico = new Petcare("Banho e tosa",70,1);

class PetcareRepository{
    async criar(servico){
        return servico;
    }
}
const servicoRepository = new PetcareRepository();

class PetcareService{
    async cadastrar(dados){
        if(!dados.nome){
            throw new error ("Nome é obrigatório");
        }
        if (dados.valor <=0){
            throw new error ("Valor invalido");
        }
        if (dados.id <=0){
            throw new error ("Id invalido");
        }
        const servico = new Petcare(
            dados.nome,
            dados.valor,
            dados.id
        );
        return ServicoRepository.criar(servico);
        
    }  
}
const servicoService = new PetcareService();

const servicoController = {
    async cadastrarPetcare(req,res){
        try {
            const servico = await servicoService.cadastrar(req.body);
            res.status(201).json(servico)
        } catch (erro) {
            res.status(400).json ({
                erro: erro.message
            })
        }
    }
};

const express = require ("express")
const app = express ();
app.use(express.json());
app.post(
    "/servicos",
    servicoController.cadastrarPetcare
)

app.listen(3001, ()=>{
    console.log("Servidor rodando na porta 3001")
});