class Controls{
    constructor(type){
        this.forword = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        switch(type) {
            case "KEYS" :
                this.#addKeyboardListeners();
                break;
            case "DUMMY" :
                this.forward = true;
                break;
        }
        

    }

    #addKeyboardListeners(){
        document.onkeydown = (event)=>{
            switch(event.key){
                case "ArrowUp" :
                    this.forword = true;
                    break;
                case "ArrowLeft" :
                    this.left = true;
                    break;
                case "ArrowRight" :
                    this.right = true;
                    break;
                case "ArrowDown" :
                    this.reverse = true;
                    break;
            }
        }

        document.onkeyup = (event)=>{
            switch(event.key){
                case "ArrowUp" :
                    this.forword = false;
                    break;
                case "ArrowLeft" :
                    this.left = false;
                    break;
                case "ArrowRight" :
                    this.right = false;
                    break;
                case "ArrowDown" :
                    this.reverse = false;
                    break;
            }
        }
    }
}