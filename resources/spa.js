function handler (event) {
    var request = event.request;
    var uri = request.uri;
    
    if (!uri.match('^.*\.(dart|json|css|js|png|PNG|jpg|JPG|gif|GIF|svg|woff|woff2|ttf|otf|wasm)$')) {
        request.uri = '/index.html';
    }
    

    return request;
}
