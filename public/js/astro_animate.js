
var main = document.getElementsByTagName('main')
figs = ['../fig1.svg', '../fig2.svg', '../fig3.svg', '../fig4.svg', '../fig5.svg']
cont = 0
for (let i = 0; i < figs.length; i++) {
    randx = Math.floor(Math.random() * 422)
    randy = Math.floor(Math.random() * 816)
    displayImage(figs[i], 50, 50, randx, randy)
}


function displayImage(src, width, height, top, left) {
    var img = document.createElement('img')
    img.src = src
    img.width = width
    img.height = height
    img.style.position = 'absolute'
    img.style['top'] = top + 'px'
    img.style['left'] = left + 'px'
    main[0].appendChild(img)
    // document.body.appendChild(img)
}