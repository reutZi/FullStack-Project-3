class FXMLHttpRequest {
    constructor() {
        this.readyState = 0;
        this.status = null;
        this.response = null;
        this.onload = null;
        this.data = {};
    }

    open(method, url) {
        this.data = {
            method,
            url
        };
    }

    send(object = "") {
        let net = new network();
        const data = this.data;
        net.sendToServer(JSON.stringify({ data, object }), this.onload);
    }

    abort() {
        // Implement the logic to abort the request
    }

    setRequestHeader(header, value) {
        // Implement the logic to set a request header
    }
}