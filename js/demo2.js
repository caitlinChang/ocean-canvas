(function () {
    var width, height, canvas, ctx, basisLine, wavys, wavy;

    class WavyLine {
        constructor(h) {
            this.cplx = 0
            this.cply = basisLine
            this.xAdd = 3
            this.yAdd = 1
        }
        draw() {
            this.cplx += this.xAdd
            if (this.cplx > width) {
                this.xAdd = -this.xAdd
            } else if (this.cplx < 0) {
                this.xAdd = -this.xAdd
            }
            this.cply += this.yAdd
            if (this.cply > (basisLine + 50)) {
                this.yAdd = -this.yAdd
            } else if (this.cply < (basisLine - 50)) {
                this.yAdd = -this.yAdd
            }
            ctx.beginPath()
            ctx.moveTo(0, basisLine)
            ctx.quadraticCurveTo(this.cplx, this.cply, width, basisLine)
            ctx.lineTo(width, height)
            ctx.lineTo(0, height)
            ctx.lineTo(0, basisLine)
            ctx.fillStyle = "rgba(143, 208, 241, " + 1 + ")"
            ctx.fill()
        }
    }

    initCanvasContent()

    function initCanvasContent() {
        width = window.innerWidth
        height = window.innerHeight

        canvas = document.getElementById('canvas-content')
        canvas.width = width
        canvas.height = height
        ctx = canvas.getContext('2d')
        basisLine = height - 100; //基准线

        wavys = []
        let h = 100
        for (let x = 0; x < 1; x++) {
            h += 50
            let w = new WavyLine(h)
            wavys.push(w)
        }

        // wavy = new WavyLine()
        // wavy.draw()

        animate()
    }

    function animate() {
        ctx.clearRect(0, 0, width, height)
        wavys.forEach(item => {
            item.draw()
        })
        // wavy.draw()
        requestAnimationFrame(animate)
    }



})();