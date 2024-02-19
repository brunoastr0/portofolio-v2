
document.getElementsByClassName("radial-pointer")[0].onmousemove = e => {
    const rect = target.getBoundingClientRect(),
        x = e.clientX = rect.left,
        y = e.clientY = rect.top;
    target.style.setProperty('--mouse-x', `${x}px`)
    target.style.setProperty('--mouse-y', `${y}px`)
    console.log(x, y)
}