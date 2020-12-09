var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号，比如：\n node server.js 8888 学会了吗？')
    process.exit()
}

var server = http.createServer(function (request, response) {
    var parseUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parseUrl.pathname
    var query = parseUrl.query
    var method = request.method

    console.log('有个程序猿正在访问,路径（带参数）为：' + pathWithQuery)

    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`我来了，我来了`)
        response.end()
    } else if (path === '/x') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`body{color:red;}`)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write('访问的页面走丢了')
        response.end()
    }
})

server.listen(port)
console.log('监听' + port + '成功 \n 请访问网站：http://localhost:' + port)