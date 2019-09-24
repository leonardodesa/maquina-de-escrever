function Spritesheet() {
    this.divNameIdDadToAddSequenceImages = '';
    this.numberMaxSequenceImages = 0;
    this.idDivSequenceImages = 'spritesheet';
    this.classListFirstImage = 'pos-r';
    this.arrayElementsSequenceImages = [];
    this.classListRemainderImages = 'pos-a';
    this.nameSequenceImagesExport = 'spritesheet';
    this.extensionImagesSequenceImages = 'png';
    this.pathPasteAddSequenceImages = 'assets/sprite';
    this.speedAnimation = 25;
    this.contVisibleSequenceImages = 0;
    this.isAnimation = false;
    this.numberImageShow = 0;
}

Spritesheet.prototype.setOptions = function (object) {
    this.divNameIdDadToAddSequenceImages = object.divNameIdDadToAddSequenceImages;
    this.numberMaxSequenceImages = object.numberMaxSequenceImages;
    this.idDivSequenceImages = object.idDivSequenceImages;
    this.classListFirstImage = object.classListFirstImage;
    this.classListRemainderImages = object.classListRemainderImages;
    this.nameSequenceImagesExport = object.nameSequenceImagesExport;
    this.extensionImagesSequenceImages = object.extensionImagesSequenceImages;
    this.pathPasteAddSequenceImages = object.pathPasteAddSequenceImages;
    this.speedAnimation = object.speedAnimation;
};

Spritesheet.prototype.startAnimation = function () {
    this.isAnimation = true;
    this.contVisibleSequenceImages = this.numberImageShow;
    this.animation();
}

Spritesheet.prototype.pauseAnimation = function () {
    this.isAnimation = false;
}

Spritesheet.prototype.animation = function () {
    if (this.isAnimation) {
        var thisAnimation = this;
        if (this.contVisibleSequenceImages < this.numberMaxSequenceImages) {

            this.setAllImagesToVisibleHidden();

            this.setImageToVisible(this.contVisibleSequenceImages);

            this.contVisibleSequenceImages++;

            setTimeout(function () {
                thisAnimation.animation();
            }, this.speedAnimation);
        }
    }
};

Spritesheet.prototype.setImageToVisible = function (positionArrayImages) {
    if (this.arrayElementsSequenceImages.length != 0)
        this.arrayElementsSequenceImages[positionArrayImages].style.visibility = 'visible';
}

Spritesheet.prototype.createSequenceImagesDomSpriteSheet = function (divDadToAddSequenceImages, idSpriteSheet, nameClassSpriteSheet, numberMaxSequenceImages) {

    var divDadToAddSequenceImage = document.getElementById(divDadToAddSequenceImages);
    var createDivDadSequenceImages = this.getCreateElement('div', idSpriteSheet, nameClassSpriteSheet);

    this.appendChildDivInDom(divDadToAddSequenceImage, createDivDadSequenceImages);

    for (var i = 0; i < numberMaxSequenceImages; i++) {
        var createTagImageToSequenceImages;
        var classListImages;

        if (i != 0) {
            classListImages = this.classListRemainderImages;
        } else {
            classListImages = this.classListFirstImage;
        }

        createTagImageToSequenceImages = this.getCreateElement('img', this.idDivSequenceImages + '-' + i,
            classListImages + ' ' + this.idDivSequenceImages);

        createTagImageToSequenceImages.src = this.pathPasteAddSequenceImages + '/' + this.nameSequenceImagesExport + '-' + i + '.' + this.extensionImagesSequenceImages;

        this.arrayElementsSequenceImages.push(createTagImageToSequenceImages);
        this.appendChildDivInDom(createDivDadSequenceImages, createTagImageToSequenceImages);
    }
};

Spritesheet.prototype.setAllImagesToVisibleHidden = function () {
    if (this.arrayElementsSequenceImages.length != 0)
        for (var i = 0; i < this.numberMaxSequenceImages; i++)
            this.arrayElementsSequenceImages[i].style.visibility = 'hidden';
}

Spritesheet.prototype.getCreateElement = function (nameDivToCreate, id, classList) {
    var div = document.createElement(nameDivToCreate);
    div.id = id;
    div.className = classList;
    return div;
}

Spritesheet.prototype.appendChildDivInDom = function (divDad, divSon) {
    divDad.appendChild(divSon);
}

Spritesheet.prototype.showImageSpriteSheetStart = function (numberImageShow) {
    this.numberImageShow = numberImageShow;
    if (this.arrayElementsSequenceImages.length != 0)
        this.arrayElementsSequenceImages[this.numberImageShow].style.visibility = 'visible';
}

Spritesheet.prototype.resetSpriteSheet = function() {
    this.showImageSpriteSheetStart(0);
    this.pauseAnimation();
    this.setAllImagesToVisibleHidden();
}
