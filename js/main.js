// 加载游戏数据
document.addEventListener('DOMContentLoaded', function() {
    fetch('/data/games.json')
        .then(response => response.json())
        .then(data => {
            // 渲染最新游戏
            renderGameList(data.pcGame, 'pc-games');
            // 渲染热门游戏
            renderGameList(data.mobileGame, 'mobile-games');
            // 渲染轮播图
            renderSlider(data.slides);
        });
});

// 渲染游戏列表
function renderGameList(games, containerId) {
    console.log(games,containerId)
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = games.map(game => `
        <div class="game-card">
            <a href="detail.html?id=${game.id}" >
                <img src="/img/${game.imgNames[0]}" alt="${game.title}">
                <h3>${game.title}</h3>
                <div class="meta">
                    <span>${game.size}</span>
                    <span>${game.date}</span>
                </div>
            </a>
        </div>
    `).join('');
}

// 渲染轮播图
function renderSlider(slides) {
    const slider = document.querySelector('.slider');
    if (!slider) return;
    
    slider.innerHTML = slides.map(slide => `
        <div class="slide">
            <a href="detail.html?id=${slide.id}">
                <img src="/img/${slide.imgNames[0]}" alt="${slide.title}">
            </a>
        </div>
    `).join('');
    
    // 简单的轮播逻辑
    let currentSlide = 0;
    const slidesElements = document.querySelectorAll('.slide');
    
    function showSlide(n) {
        slidesElements.forEach(slide => slide.style.display = 'none');
        currentSlide = (n + slidesElements.length) % slidesElements.length;
        slidesElements[currentSlide].style.display = 'block';
    }
    
    showSlide(0);
    setInterval(() => showSlide(currentSlide + 1), 5000);
}





// "hotGames": [
    //     {
    //         "id": "game3",
    //         "title": "热门游戏1",
    //         "size": "2.5GB",
    //         "date": "2023-09-15",
    //         "downloads": "1024",
    //         "category": "pc"
    //     },
    //     {
    //         "id": "game4",
    //         "title": "热门游戏2",
    //         "size": "1.8GB",
    //         "date": "2023-09-20",
    //         "downloads": "876",
    //         "category": "emulator"
    //     }
    // ],
    // "slides": [
    //     {
    //         "gameId": "game1",
    //         "image": "slide1.jpg",
    //         "title": "示例游戏1 - 最新发布"
    //     },
    //     {
    //         "gameId": "game3",
    //         "image": "slide2.jpg",
    //         "title": "热门游戏1 - 下载量破千"
    //     }
    // ]