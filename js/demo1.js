var width, height, canvas, ctx, circles, animateHeader = true;

class Circle {
    constructor() {
        this.pos = {}
        this.init()
    }
    init() {
        this.pos.x = Math.random() * width // 圆心坐标x
        this.pos.y = height + Math.random() * 100 // 圆心坐标y
        this.alpha = 0.1 + Math.random() * 0.1 // 透明度
        this.scale = 0.1 + Math.random() * 0.3// 半径
        this.velocity = 0.5 // 每一帧移动的距离
    }
    draw() {
        if (this.alpha <= 0) {
            this.init()
        }
        this.pos.y -= this.velocity;
        this.alpha -= 0.001
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.scale * 10, 0, 2 * Math.PI, false)
        ctx.fillStyle = "rgba(143, 208, 241, " + this.alpha + ")"
        ctx.fill()
    }
}

initHeader()
addListeners()

function initHeader() {
    width = window.innerWidth //获取视图的宽和高，不包含滚动条，<IE9的浏览器不支持
    height = window.innerHeight

    canvas = document.getElementById('canvas-content') // 获取canvas绘图区域
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d') // 创建canvas 对象

    circles = []; // 创建水蒸气圆圈
    for (let x = 0; x < width * 0.5; x++) {
        let c = new Circle();
        circles.push(c)
    }
    animate()
}
/**
 * 监听网页滑动或者大小改变
 */
function addListeners() {
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize)
}
function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
}

function resize() {
    width = window.innerHeight;
    height = window.innerHeight;
    largeHeader.style.height = height + 'px'
    canvas.width = width;
    canvas.height = height;
}

function animate() {
    if (animateHeader) {
        ctx.clearRect(0, 0, width, height)
        for (let i in circles) {
            circles[i].draw();
        }
    }
    requestAnimationFrame(animate) // 下一次重绘之前更新动画帧所调用的函数
}