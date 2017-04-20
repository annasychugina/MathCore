(function () {
    'use strict'

    function ScreenLoader(text) {
        this.loadingUIText = text;
    }

    ScreenLoader.prototype.displayLoadingUI = function () {
        console.log(this.loadingUIText);
    };

    ScreenLoader.prototype.hideLoadingUI = function () {
        console.log("Loaded!");
    };

    /*const ILoadingScreen = BABYLON.ILoadingScreen;

     class ScreenLoader extends ILoadingScreen {
     constructor(text){
     super(text);
     this.loadingUIText = text;
     //.....
     }

     displayLoadingUI(){
     console.log(this.loadingUIText);
     }

     hideLoadingUI(){
     console.log("Done!");
     }

     }*/

    window.ScreenLoader = ScreenLoader;


}
