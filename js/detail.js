
document.addEventListener('DOMContentLoaded', function() {
    const params = getQueryParams();
    console.log(params.name); // 输出: John
    let gameId = params.id;
    console.log("gameId",gameId)
    getById(gameId);
});



// 获取当前URL的查询参数
function getQueryParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    // 获取单个参数
    const param1 = urlParams.get('param1');
    console.log('param1:', param1);
    
    // 获取所有参数
    urlParams.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });
    
    // 转换为对象
    const paramsObj = Object.fromEntries(urlParams.entries());
    console.log(paramsObj);
    
    return paramsObj;
}





function getById(gameId){
    fetch('/data/games.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("game-detail");
            if (!container) return;

            let allGame = [];

            data.pcGame.forEach(game => {
                allGame.push(game);
            })

            data.mobileGame.forEach(game => {
                allGame.push(game);
            })

            console.log("allGame",allGame);
            
            let game =  allGame.filter(game => {
                return game.id === gameId;
            })[0];

            console.log("game",game);

            let imgStr = "";
            console.log("game.imgNames",game.imgNames)
            game.imgNames.forEach(imgName => {
                    console.log("imgName",imgName)
                    imgStr += `<img src="/img/${imgName}" alt="游戏截图" width="300" height="300"/><br>`; 
            })

            container.innerHTML = `
            
            
            <div class="game-info" id="game-info">
                <h1 id="game-title">${game.title}</h1>
                
                <span class="meta">
                    <span id="game-size">大小:  ${game.size}</span><br>
                    <span id="game-date">更新:  ${game.date}</span> <br>
                    <span id="game-date">平台:  ${game.category}</span><br>
                </span>
                <div class="download-div">
                    <a href="${game.src}" class="download-btn">立即下载</a>
                </div>
            </div>

            <div class="game-content">
                <h2>游戏介绍</h2>
                <div id="game-description">
                    <p>${game.desc}</p>
                </div>

                <h2>游戏截图</h2>
                <div class="screenshots">
                    "${imgStr}"
                </div>

                
            </div>
            
            `
                
        });
}

// ${
//     console.log("game.imgNames",game.imgNames);
//     game.imgNames.forEach(imgName => {
//     console.log("imgName",imgName)
//     return `
//         <img src="/img/${imgName}" alt="游戏截图"/>`
// })}