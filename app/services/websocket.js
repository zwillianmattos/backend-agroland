var io = null;

module.exports = {
    connect: function (server) {
        io = require('socket.io')(server, {
            cors: {
                methods: ["GET", "POST"],
                allowedHeaders: ["my-custom-header"],
                credentials: true
            }
        });
        this.initListeners();
    },
    emit: function (event, values) {
        if (io) {
            io.of('/').emit(event, values);
        }
    },
    initListeners(server) {
        // Configuração do protocolo WSS
        let clientes = [];
        let threads = io
            .of('/')
            .on('connection', socket => {
                let user = socket.handshake.query.usuario;
                console.log('[Usuario conectado]:', user, `${socket.id}`);

                //Caso tenha vindo o código do usuário, e ainda não se encontra no array, adiciona
                if (user != 'false' && typeof clientes.find(cli => cli.id == user && cli.socketId == socket.id) === 'undefined') {
                    clientes.push({
                        id: user,
                        socketId: socket.id
                    });
                }

                socket.on('joinRoom', dados => {
                    if (dados.sala !== 'undefined') {
                        console.log(`Usuario ${user} se juntou à sala: ${dados.sala}`);
                        socket.join(dados.sala); // conecta o cliente na sala  desejada
                    }
                });

                //Remove o usuário do array de clientes ao desconectar
                socket.on('disconnect', () => {
                    for (let i = 0; i < clientes.length; i++) {
                        if (clientes[i].socketId === socket.id) {
                            clientes.splice(i, 1);
                        }
                    }
                    console.log("[Usuario desconectado]: ", user, socket.id)
                });
            })
    },
};