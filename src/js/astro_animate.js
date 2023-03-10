const rocket = document.getElementById("rocket")

new Vivus('astro', {
    onReady: function (myVivus) {
        // `el` property is the SVG element
        myVivus.el.setAttribute('transform', 'rotate(10deg)');
    }
});