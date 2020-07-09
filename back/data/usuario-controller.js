var db = require('./db');
var Usuario = db.Mongoose.model('Usuario');

exports.get = function(req, res, next){
    const pagAtual = parseInt(req.query.pag || '1');
    let params = req.query;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = limit * (pagAtual - 1);

    let query;
    if(params){
        query = { 'nome': params.nome };
    }

    Usuario.find(query).skip(skip).limit(limit + 1).sort('nome').select('id nome').exec(
        (err, usuarios) => {
            if(err){
                res.status(400);
                return res.json({sucess: false, msg: 'Ocorreu um erro ao buscar os serviços"'});
            }

            let hasNext = false;
            if(usuarios.length > limit){
                usuarios.pop();
                hasNext = true;
            }

            let pag = {
                atual: pagAtual,
                hasNext: hasNext,
                q: params
            }

            res.json({sucess: true, 'usuarios': usuarios, 'pagina': pag});
        });
}

exports.getById = function (req, res, next){
    let id = req.params.id;

    Usuario.findOne({_id: id}).exec(
        (err, usuario) => {
            if(err){
                res.status(400);
                
            return res.json({success: false, msg: 'Não foi possível encontrar o serviço!'});
        }
        res.json({success: true, 'usuario': usuario});
    });
}

exports.save = function (req, res){
    if(req.body._id){
        Usuario.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
            (err,newUsuario) =>{
                if(err){
                    let msg = '';
                    for(var erro in err.errors){
                        msg = err.errors[erro].message;
                        break;
                    }
                    res.status(400);
                    
                    return res.json({success:false , msg: msg})
                }
                res.json({success: true, msg: 'Salvo com sucesso!', usuario: newUsuario});
            })
    }else{
        let usuario = new Usuario({
            usuario: req.body.usuario,
            profissional: req.body.profissional,
            ativo: req.body.ativo
        });

        usuario.save(function(err, newUsuario){
            if(err){
                let msg = '';
                for(let erro in err.errors){
                    msg = err.errors[erro].message;
                    break;
                }
                res.status(400);
                
                return res.json({success: false, msg: msg});
            } else{
                res.json({success: true, msg: 'Salvo com sucesso!', usuario: newUsuario});
            }
        });
    }
}

exports.delete = function (req, res) {
    Usuario.findOneAndDelete({ '_id': req.params.id }, function (err, usuario) {
        if (err) {
            res.status(400);
            
            return res.json({ success: false, msg: 'Ocorreu um erro ao excluir!' });
        }
        
        res.json({ success: true, msg: 'Excluído com sucesso!' });
    });
};