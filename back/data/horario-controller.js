var db = require('./db');
var Horario = db.Mongoose.model('Horario');

exports.get = function(req, res, next){
    const pagAtual = parseInt(req.query.pag || '1');
    let params = req.query;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = limit * (pagAtual - 1);
    
    let query;
    if(params){
        query = { 'nome': params.nome };
    }

    Horario.find(query).skip(skip).limit(limit + 1).sort('nome').select('id nome').exec(
        (err, horarios) => {
            if(err){
                res.status(400);
                
                return res.json({sucess: false, msg: 'Ocorreu um erro ao buscar os serviços"'});
            }

            let hasNext = false;
            if(horarios.length > limit){
                horarios.pop();
                hasNext = true;
            }

            let pag = {
                atual: pagAtual,
                hasNext: hasNext,
                q: params
            }

            res.json({sucess: true, 'horarios': horarios, 'pagina': pag});
        });
}

exports.getById = function (req, res, next){
    let id = req.params.id;
    Horario.findOne({_id: id}).exec(
        (err, horario) => {
            if(err){
                res.status(400);
                
            return res.json({success: false, msg: 'Não foi possível encontrar o serviço!'});
        }
        res.json({success: true, 'horario': horario});
    });
}

exports.save = function (req, res){
    if(req.body._id){
        Horario.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
            (err,newHorario) =>{
                if(err){
                    let msg = '';
                    for(var erro in err.errors){
                        msg = err.errors[erro].message;
                        break;
                    }
                    res.status(400);
                    
                    return res.json({success:false , msg: msg})
                }
                res.json({success: true, msg: 'Salvo com sucesso!', horario: newHorario});
            })
    }else{
        let horario = new Horario({
            dataHora: req.body.dataHora,
            cliente: req.body.cliente,
            servico: req.body.servico,
            profissional: req.body.profissional
        });

        horario.save(function(err, newHorario){
            if(err){
                let msg = '';
                for(let erro in err.errors){
                    msg = err.errors[erro].message;
                    break;
                }
                res.status(400);
                
                return res.json({success: false, msg: msg});
            } else{
                res.json({success: true, msg: 'Salvo com sucesso!', horario: newHorario});
            }
        });
    }
}

exports.delete = function (req, res) {
    Horario.findOneAndDelete({ '_id': req.params.id }, function (err, horario) {
        if (err) {
            res.status(400);
            
            return res.json({ success: false, msg: 'Ocorreu um erro ao excluir!' });
        }
        
        res.json({ success: true, msg: 'Excluído com sucesso!' });
    });
};