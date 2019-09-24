"use strict";
var Premium = Premium || {};

Premium.creative = {
    init: function () {
        switch (document.body.id) {
            case "body_top":
            TweenMax.set('#body_top', { opacity: 1, delay: .2 })
            
            Premium.communicator.init(3);
            
            var videoContainer = document.getElementById("top-video");
            var video = document.getElementById('video-top');
            var top = new TimelineMax();
            
            top
            .addLabel('start')
            // .set('#top-text3-2', { x: '-50%', y: '30px' })
            // .to("#top-text1", .7, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.3')
            // .to("#top-text2", .7, { opacity: 1, y: '0px', rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.5')
            // .to("#top-text3", .7, { y: '0px', rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.9')
            // .to("#top-text3-2", .7, { y: '0px', rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.9')
            // .to("#top-cta-container", .7, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=1.1')
            
            
            document.querySelector("#expand-video-top").addEventListener("click", function () {
                Premium.expand.expand('expanded.html', 'width:100%; height:100%', true);
            });
            
            Premium.communicator.api.receiveMessage(function (e) {
                var obj = JSON.parse(e);
                if (obj.id === "play") {
                    top.play();
                }
            });

            // DESCOMENTA ISSO DPS
            Premium.expand.expand('expanded.html', 'width:100%; height:100%', true);

            
            Premium.video.switchOnScroll(videoContainer, 2);
            video.play();
            
            break;
            case "body-left":
            TweenMax.set('#body-left', { opacity: 1, delay: .2 })
            
            Premium.communicator.init(3);
            
            var container = document.getElementById("container");
            var videoContainerLeft = document.getElementById("left-video");
            var video = document.getElementById('video-left');
            
            document.querySelector("#expand-video-left").addEventListener("click", function () {
                Premium.expand.expand('expanded.html', 'width:58%; height:100%', true);
            });
            
            video.volume = 0;
            Premium.video.switchOnScroll(videoContainerLeft, 2);
            break;
            
            case "body-right":
            TweenMax.set('#body-right', { opacity: 1, delay: .2 });
            
            Premium.communicator.init(3);
            
            var right = new TimelineMax();
            
            setTimeout(function () {
                var message = { from: "right", id: "play" };
                Premium.communicator.api.sendMessage(JSON.stringify(message));
                right.play();
            }, 900);
            
            right
            .addLabel('start')
            // .set('.side-text3-2', { x: '-50%', y: '30px' })
            // .to(".side-text1", .7, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.3')
            // .to(".side-text2", .7, { opacity: 1, y: '0px', rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.5')
            // .to(".side-text3", .7, { y: '0px', rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.9')
            // .to(".side-text3-2", .7, { y: '0px', rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.9')
            // .to(".side-cta-container", .7, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=1.1')
            // .to(".side-logo-container", .7, { opacity: 1, ease: Power2.easeOut }, 'start' + '+=1.5')
            // .to(".side-legal-text-container", .7, { opacity: 1, ease: Power2.easeOut }, 'start' + '+=1.5')
            
            function scrollHandler(pos) {
                if (pos === 'down') {
                    // TweenMax.to(".side-cta-wrap", .7, { opacity: 1, ease: Power2.easeOut })
                }
                
                if (pos === 'up') {
                    // TweenMax.to(".side-cta-wrap", .7, { opacity: 0, ease: Power2.easeOut })
                }
            }
            
            Premium.video.switchOnScroll(undefined, undefined, scrollHandler);
            break;
            
            case "body-back":
            TweenMax.set('#body-back', { opacity: 1, delay: .2 })
            
            break;
        }
        
    }
}
