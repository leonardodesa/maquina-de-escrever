"use strict";
var Premium = Premium || {};

Premium.creative = {
    init: function () {
        /* START OF CUSTOM JS */
        // var videoEl = document.getElementById('video');
        // var videoWrap = document.getElementById('video-wrap');

        // videoEl.volume = 0;
        // videoWrap.style.display = 'block';
        // videoWrap.style.opacity = 0;
        // Premium.video.sync(videoEl, undefined, Premium.video.SyncType_Get);

        // setTimeout(function () {
        //     PremiumJpControls.resizeAll();
        //     videoWrap.style.display = 'flex';
        //     videoWrap.style.opacity = 1;
        // }, 1000);

        // Premium.jpxApi.addSheet('#JPX_expandable iframe{width: 100% !important;}');

        var hammer1 = new Spritesheet();
        var hammer2 = new Spritesheet();
        var hammer3 = new Spritesheet();
        var containerTypewriteTexts = document.getElementById('container-typewrite-texts');
        var getPositionArrayTextsFromDate = 0;
        var elementReceiveKeyEvent = window.top;
        var objPropertiesSheet;
        var paragraphTextElement;
        var textActiveSentences;
        var keys = {};
        var space = ' ';
        var timeAnimationInMiliseconds = 200;
        var firstInteractionUser = false;
        var isLoop = true;

        var arrayTextsString = [
            'Once Upon a Time in Hollywood;In Theaters July 26',
            'Once Upon a Time in Hollywood;In Theaters July 27',
            'Once Upon a Time in Hollywood;In Theaters July 28'
        ];

        var textActive = {
            textWithSpace: arrayTextsString[getPositionArrayTextsFromDate].replace(/[\s||;]+/g, ' '),
            textNoSpace: arrayTextsString[getPositionArrayTextsFromDate].replace(/[\s||;]+/g, ''),
            sentences: arrayTextsString[getPositionArrayTextsFromDate].split(';')
        }

        var containerTextsProperties = {
            element: document.getElementById('container-texts'),
            percentCenterSheet: 0.73
        };

        var containerTypeWrite = {
            element: document.getElementById('typewrite'),
            percentCenterSheet: 0.222
        };

        var textsProperties = {
            element: document.getElementById("texts")
        };

        var paragraphTextsProperties = {
            elements: [document.querySelector(".paragraph")]
        };

        var conts = {
            contTxtWithSpace: 0,
            contRowTextActive: 0
        }

        function checkIfChangeRowPositionSentences() {
            if (conts.contTxtWithSpace >= textActive.sentences[conts.contRowTextActive].length) {
                return true;
            } else {
                return false;
            }
        }

        function createDivParagraphAndAddInDomAndUpdateArrayTexts() {
            var textContainer = textsProperties.element;
            var arrayAllParagraphs = paragraphTextsProperties.elements;

            var espaco = createElementDiv('div', 'espaco');
            var paragraph = createElementDiv('div', 'paragraph');

            addElementInDom(textContainer, espaco);
            addElementInDom(textContainer, paragraph);

            addElementInArray(arrayAllParagraphs, paragraph);
        }

        function addElementInDom(textContainer, element) {
            appendChildDivInTheDom(textContainer, element);
        }

        function createElementDiv(divToCreate, nameClassElement) {
            var div = document.createElement(divToCreate);
            div.className = nameClassElement;
            return div;
        }

        function appendChildDivInTheDom(divDad, divSon) {
            divDad.appendChild(divSon);
        }

        function addElementInArray(arrayAllParagraphs, paragraph) {
            arrayAllParagraphs.push(paragraph);
        }

        function returnObjectUpdateValuesSheet() {
            var objs = [];

            var objPropertiesSheet = {
                translateX: containerTextsProperties.element.offsetWidth * containerTextsProperties.percentCenterSheet - paragraphTextsProperties.elements[conts.contRowTextActive].offsetWidth,
                translateY: conts.contRowTextActive >= 1 ? paragraphTextsProperties.elements[conts.contRowTextActive].offsetHeight * (paragraphTextsProperties.elements.length - 1) : 0,
                height: containerTypewriteTexts.offsetHeight + paragraphTextsProperties.elements[conts.contRowTextActive].offsetHeight * (paragraphTextsProperties.elements.length - 1)
            }

            var objPropertiesTypewrite = {
                translateX: containerTypeWrite.element.offsetWidth * containerTypeWrite.percentCenterSheet - paragraphTextsProperties.elements[conts.contRowTextActive].offsetWidth
            }

            objs.push(objPropertiesSheet);
            objs.push(objPropertiesTypewrite);

            return objs;
        }

        function animationTypewrite(objPropertiesSheet, typeofVariable) {
            if (typeofVariable == 'object') {
                TweenMax.to(containerTextsProperties.element, .15, {
                    x: objPropertiesSheet.translateX,
                    y: - objPropertiesSheet.translateY,
                    height: objPropertiesSheet.height,
                    ease: Power2.easeInOut
                });
            } else {
                TweenMax.to(containerTextsProperties.element, .15, {
                    x: objPropertiesSheet[0].translateX,
                    y: - objPropertiesSheet[0].translateY,
                    height: objPropertiesSheet[0].height,
                    ease: Power2.easeInOut
                });
                TweenMax.to(containerTypeWrite.element, .15, {
                    x: objPropertiesSheet[1].translateX,
                    ease: Power2.easeInOut
                });
            }
        }

        function setContainerTextLeftTo0() {
            TweenMax.set(containerTextsProperties.element, { left: 0 });
        }

        function typeWriterHandler() {

            setContainerTextLeftTo0();

            if (checkIfChangeRowPositionSentences()) {
                increaseContRowPositionSentences();

                if (textActive.sentences[conts.contRowTextActive]) {
                    createDivParagraphAndAddInDomAndUpdateArrayTexts();

                    resetContTxtWithSpace();

                    updateSentencesAndParagraph();

                    paragraphTextElement.innerHTML += returnCharToAddInParagraph(textActiveSentences);
                }

            } else {
                var charTextActiveSentences = returnCharInSentence();

                if (returnBooleanCheckSpaceInString(charTextActiveSentences)) {

                    increaseContWithSpace();

                    paragraphTextElement.innerHTML += ' ' + returnCharToAddInParagraph(textActiveSentences);

                } else {
                    updateSentencesAndParagraph();

                    paragraphTextElement.innerHTML += returnCharToAddInParagraph(textActiveSentences);
                }
            }

            if (textActive.sentences[conts.contRowTextActive]) {
                objPropertiesSheet = returnObjectUpdateValuesSheet();
                animationTypewrite(objPropertiesSheet);

                increaseContWithSpace();
            }
        }

        function updateSentencesAndParagraph() {
            paragraphTextElement = paragraphTextsProperties.elements[conts.contRowTextActive];
            textActiveSentences = textActive.sentences[conts.contRowTextActive];
        }

        function generatorRandomNumber(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        function returnCharToAddInParagraph(sentence) {
            var charSentence = sentence.charAt(conts.contTxtWithSpace);
            return charSentence;
        }

        function increaseContRowPositionSentences() {
            conts.contRowTextActive++;
        }

        function increaseContWithSpace() {
            conts.contTxtWithSpace++;
        }

        function resetContTxtWithSpace() {
            conts.contTxtWithSpace = 0;
        }

        function returnBooleanCheckSpaceInString(char) {
            if (char === space) {
                return true;
            } else {
                return false;
            }
        }

        function returnCharInSentence() {
            if (textActive.sentences[conts.contRowTextActive])
                return textActive.sentences[conts.contRowTextActive].charAt(conts.contTxtWithSpace);
        }

        function removeWhiteSpaceInSentencesStartAndEndString(objectTextActive) {
            if (typeof objectTextActive == 'string') {
                objectTextActive.trim();
            } else {
                for (var i in objectTextActive) {
                    var text = objectTextActive[i];

                    if (text.charAt(0) == space || text.charAt(text.length - 1) == space) {
                        text = text.trim();
                        objectTextActive[i] = text;
                    }
                }
            }
        }

        function keyDownHandler(e) {
            TweenMax.to('#type-something', .6, { opacity: 0, ease: Power1.easeIn });

            if (textActive.sentences[conts.contRowTextActive]) {
                keys[e.keyCode] = true;
            }
        }

        function keyUpHandler(e) {
            if (textActive.sentences[conts.contRowTextActive]) {

                delete keys[e.keyCode];

                animationElements();

                elementReceiveKeyEvent.removeEventListener('keyup', keyUpHandler);

                setTimeout(function () {
                    elementReceiveKeyEvent.addEventListener('keyup', keyUpHandler);
                }, timeAnimationInMiliseconds);

                for (var i in keys) {
                    resetObjectKeys();
                }
            }
        }

        function animationElements() {
            animationHammer();
            typeWriterHandler();
        }

        function resetObjectKeys() {
            keys = {};
        }

        function resizeElements() {
            if (firstInteractionUser) {
                var obj = returnObjectUpdateValuesSheet();
                animationTypewrite(obj);
            } else {
                startSheetCenterPosition();
            }
        }

        function animationHammer() {
            var randomNumber = generatorRandomNumber(1, 3);

            if (randomNumber == 1)
                hammer1.startAnimation();
            else if (randomNumber == 2)
                hammer2.startAnimation();
            else
                hammer3.startAnimation();
        }

        function startSheetCenterPosition() {

            var objPropertiesSheet = {
                translateX: - containerTextsProperties.element.offsetWidth / 2.298,
                translateY: 0,
                height: containerTypewriteTexts.offsetHeight
            }

            animationTypewrite(objPropertiesSheet, 'object');
        }

        function createSpriteSheetHammers() {

            hammer1.setOptions(
                {
                    divNameIdDadToAddSequenceImages: 'base-typewrite',
                    numberMaxSequenceImages: 8,
                    idDivSequenceImages: 'hammer-1',
                    classListFirstImage: 'pos-r',
                    classListRemainderImages: 'pos-a',
                    nameSequenceImagesExport: 'hammer-1',
                    extensionImagesSequenceImages: 'png',
                    pathPasteAddSequenceImages: 'assets/hammer-1',
                    speedAnimation: 40
                }
            );

            hammer2.setOptions(
                {
                    divNameIdDadToAddSequenceImages: 'base-typewrite',
                    numberMaxSequenceImages: 7,
                    idDivSequenceImages: 'hammer-2',
                    classListFirstImage: 'pos-r',
                    classListRemainderImages: 'pos-a',
                    nameSequenceImagesExport: 'hammer-2',
                    extensionImagesSequenceImages: 'png',
                    pathPasteAddSequenceImages: 'assets/hammer-2',
                    speedAnimation: 40
                }
            );

            hammer3.setOptions(
                {
                    divNameIdDadToAddSequenceImages: 'base-typewrite',
                    numberMaxSequenceImages: 8,
                    idDivSequenceImages: 'hammer-3',
                    classListFirstImage: 'pos-r',
                    classListRemainderImages: 'pos-a',
                    nameSequenceImagesExport: 'hammer-3',
                    extensionImagesSequenceImages: 'png',
                    pathPasteAddSequenceImages: 'assets/hammer-3',
                    speedAnimation: 40
                }
            );

            hammer1.createSequenceImagesDomSpriteSheet(hammer1.divNameIdDadToAddSequenceImages,
                hammer1.idDivSequenceImages,
                'hammer',
                hammer1.numberMaxSequenceImages);

            hammer2.createSequenceImagesDomSpriteSheet(hammer2.divNameIdDadToAddSequenceImages,
                hammer2.idDivSequenceImages,
                'hammer',
                hammer2.numberMaxSequenceImages);

            hammer3.createSequenceImagesDomSpriteSheet(hammer3.divNameIdDadToAddSequenceImages,
                hammer3.idDivSequenceImages,
                'hammer',
                hammer3.numberMaxSequenceImages);
        }

        function start() {
            createSpriteSheetHammers();

            startSheetCenterPosition();

            removeWhiteSpaceInSentencesStartAndEndString(textActive.sentences);

            window.top.addEventListener('resize', resizeElements);

            setTimeout(function () {
                loop();
            }, 1000);
        }

        function loop() {
            if (isLoop) {
                setTimeout(function () {
                    firstInteractionUser = true;
                    update();
                    requestAnimationFrame(loop);
                }, timeAnimationInMiliseconds);
            }
        }

        function update() {

            animationElements();

            setTimeout(function () {
                isLoop = false;

                elementReceiveKeyEvent.addEventListener('keydown', keyDownHandler);
                elementReceiveKeyEvent.addEventListener('keyup', keyUpHandler);

                TweenMax.to('#type-something', 1, { opacity: .6, delay: .3, ease: Power1.easeOut });
            }, 2500);
        }

        start();
    }
}