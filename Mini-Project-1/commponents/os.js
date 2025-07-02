const os = require('os');

function osInfo() {
    const uptimeSec = os.uptime();
    const hours = Math.floor(uptimeSec / 3600);
    const minutes = Math.floor((uptimeSec % 3600) / 60);
    const seconds = uptimeSec % 60;


var result = `
  <h2>Uptime: ${hours}h ${minutes}m ${Math.floor(seconds)}s</h2>
    <h2>Hostname: ${os.hostname()}</h2>
    <h2>Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB</h2>
    <h2>Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB</h2>
    <h2>OS Version: ${os.release()}</h2>
`;

    return result;
}

module.exports = osInfo;

// function osInfo(){
// }

// os.hostname()
// os.totalmem()
// os.uptime()
// os.version()