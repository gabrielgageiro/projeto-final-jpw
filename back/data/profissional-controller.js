var db = require('./db');
var Profissional = db.Mongoose.model('Profissional');

exports.get = function(req, res, next){
    const pagAtual = parseInt(req.query.pag || '1');
    let params = req.query;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;

    let skip = limit * (pagAtual - 1);
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;

    let query;
    if(params){
        query = { 'nome': params.nome };
    }

    Profissional.find(query).skip(skip).limit(limit + 1).sort('nome').select('id nome').exec(
        (err, profissionais) => {
            if(err){
                res.status(400);
                return res.json({sucess: false, msg: 'Ocorreu um erro ao buscar os serviços"'});
            }

            let hasNext = false;
            if(profissionais.length > limit){
                profissionais.pop();
                hasNext = true;
            }

            let pag = {
                atual: pagAtual,
                hasNext: hasNext,
                q: params
            }

            res.json({sucess: true, 'profissionais': profissionais, 'pagina': pag});
        });
}

exports.getById = function (req, res, next){
    let id = req.params.id;
    Profissional.findOne({_id: id}).exec(
        (err, profissional) => {
            if(err){
                res.status(400);
                return res.json({success: false, msg: 'Não foi possível encontrar o serviço!'});
        }
        res.json({success: true, 'profissional': profissional});
    });
}

exports.save = function (req, res){
    if(req.body._id){
        Profissional.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
            (err,newProfissional) =>{
                if(err){
                    let msg = '';
                    for(var erro in err.errors){
                        msg = err.errors[erro].message;
                        break;
                    }
                    res.status(400);
                    return res.json({success:false , msg: msg})
                }
                res.json({success: true, msg: 'Salvo com sucesso!', profissional: newProfissional});
            })
    }else{
        let profissional = new Profissional({
            nome: req.body.nome
        });

        profissional.save(function(err, newProfissional){
            if(err){
                let msg = '';
                for(let erro in err.errors){
                    msg = err.errors[erro].message;
                    break;
                }
                res.status(400);
                return res.json({success: false, msg: msg});
            } else{
                res.json({success: true, msg: 'Salvo com sucesso!', profissional: newProfissional});
            }
        });
    }
}

exports.delete = function (req, res) {
    Profissional.findOneAndDelete({ '_id': req.params.id }, function (err, profissional) {
        if (err) {
            res.status(400);
            return res.json({ success: false, msg: 'Ocorreu um erro ao excluir!' });
        }
        
        res.json({ success: true, msg: 'Excluído com sucesso!' });
    });
};