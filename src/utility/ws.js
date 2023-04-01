export function connect() {
    ws.onopen = () => {
        console.log('WebSocket连接成功');
    }
    ws.onerror = (event) => {
        console.log(event);
    }
    ws.onmessage = (event) => {
        console.log('收到消息：', event.data);
    };
    ws.onclose = (event => {
        console.log("close");
    })
}