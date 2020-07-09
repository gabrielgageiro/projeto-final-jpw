var db = require('./db');
var Servico = db.Mongoose.model('Servico');

exports.get = function(req, res, next){
    const pagAtual = parseInt(req.query.pag || '1');
    
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
        
    let params = req.query;
    let skip = limit * (pagAtual - 1);
    let query = {};

    if(params){
        if(params.nome){
            query = { 'nome': params.nome };
        }
    }

    Servico.find(query).skip(skip).limit(limit + 1).sort('nome').select('id nome').exec(
        (err, servicos) => {
            if(err){
                res.status(400);
                return res.json({sucess: false, msg: 'Ocorreu um erro ao buscar os serviços"'});
            }

            let hasNext = false;
            if(servicos.length > limit){
                servicos.pop();
                hasNext = true;
            }

            let pag = {
                atual: pagAtual,
                hasNext: hasNext,
                q: params
            }

            res.json({sucess: true, 'servicos': servicos, 'pagina': pag});
        });
}

exports.getById = function (req, res, next){
    let id = req.params.id;
    Servico.findOne({_id: id}).exec(
        (err, servico) => {
            if(err){
                res.status(400);
                
            return res.json({success: false, msg: 'Não foi possível encontrar o serviço!'});
        }
        res.json({success: true, 'servico': servico});
    });
}

exports.save = function (req, res){
    if(req.body._id){
        Servico.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
            (err,newServico) =>{
                if(err){
                    let msg = '';
                    for(var erro in err.errors){
                        msg = err.errors[erro].message;
                        break;
                    }
                    res.status(400);
                    
                    return res.json({success:false , msg: msg})
                }
                res.json({success: true, msg: 'Salvo com sucesso!', servico: newServico});
            })
    }else{
        let servico = new Servico({
            nome: req.body.nome,
            descricao: req.body.descricao,
            valor: req.body.valor
        });

        servico.save(function(err, newServico){
            if(err){
                let msg = '';
                for(let erro in err.errors){
                    msg = err.errors[erro].message;
                    break;
                }
                res.status(400);
                
                return res.json({success: false, msg: msg});
            } else{
                res.json({success: true, msg: 'Salvo com sucesso!', servico: newServico});
            }
        });
    }
}

exports.delete = function (req, res) {
    Servico.findOneAndDelete({ '_id': req.params.id }, function (err, servico) {
        if (err) {
            res.status(400);
            
            return res.json({ success: false, msg: 'Ocorreu um erro ao excluir!' });
        }
        
        res.json({ success: true, msg: 'Excluído com sucesso!' });
    });
};