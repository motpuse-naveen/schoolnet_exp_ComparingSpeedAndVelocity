/*document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false);*/

function hammerIt(elm, p_maxScale) {

    let hammertime = new Hammer.Manager(elm, {
        prevent_default: true,
        touchAction: "pan-x pan-y"
    });
    let pan = new Hammer.Pan();
    //let rotate = new Hammer.Rotate();
    let pinch = new Hammer.Pinch();

    hammertime.add([pan, pinch]);
    hammertime.get('pinch').set({ enable: true });
    //mc.get('rotate').set({ enable: true });

    let adjustDeltaX = 0;
    let adjustDeltaY = 0;
    let adjustScale = 1;
    //let adjustRotation = 0;

    let currentDeltaX = null;
    let currentDeltaY = null;
    let currentScale = null;
    //let currentRotation = null;

    hammertime.on("panstart pinchstart", function (e) {
        //adjustRotation -= e.rotation;
    });

    hammertime.on("panmove pinchmove", function (e) {
        //currentRotation = adjustRotation + e.rotation;
        
        currentScale = adjustScale * e.scale;
        
        currentDeltaX = adjustDeltaX + (e.deltaX / currentScale);
        currentDeltaY = adjustDeltaY + (e.deltaY / currentScale);

        let transforms = ['scale(' + currentScale + ')'];
        transforms.push('translate(' + currentDeltaX + 'px,' + currentDeltaY + 'px)');
        //transforms.push('rotate(' + Math.round(currentRotation) + 'deg)');
        elm.style.transform = transforms.join(' ');
    });

    hammertime.on("panend pinchend", function (e) {
        adjustScale = currentScale;
        //adjustRotation = currentRotation;
        adjustDeltaX = currentDeltaX;
        adjustDeltaY = currentDeltaY;
    });
}
