const http = require('http'); // подключили модуль, http - обьект, доступны его методы, свойства
const url = require('url'); // подключили модуль
const fs = require('fs'); // подключили модуль

http.createServer(function(request,response){   //функция будет вызываться каждый раз, когда сервер будет получать запрос

    /** switch favicon request off */
    if (request.url === '/favicon.ico') {  //если есть в запросе /favicon.ico
        response.writeHead(200, {'Content-Type': 'image/x-icon'} ); //формируем ответ
        response.end(); // отправим обратно и прерывай работу
        //console.log('favicon requested');
        return;
    }

    console.log(request.headers);

    response.writeHead(200); // для всех остальных ответов от сервера формируем статус 200

    let urlParsed = url.parse(request.url, true); // парсим url весь
    console.log(urlParsed);

    if (urlParsed.pathname === '/') {
        fs.readFile('./index.html', function(error, data){
            if(error){
                response.statusCode = 404;
                response.end("Resourse not found!");
            }
            else {
                response.end(data);
            }
        });
    } else if (urlParsed.pathname === '/server' && urlParsed.query) {
        response.end( JSON.stringify(urlParsed.query));
    } else {
        response.statusCode = 404; // Not Found
        response.end("Page not found");
    }

}).listen(8080); // начинает работать сервер, создает сервер, для запуска сервера вызываем метод listen
console.log("Server1 has started.");
//








