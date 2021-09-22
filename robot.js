class Robot {
    constructor(){
        this.isLost = false;
        this.inst = [];
    }
    constructor(id, x, y, orien, inst, isLost){
        this.id = id;
        this.x = x;
        this.y = y;
        this.orien = orien;
        this.inst = inst;
        this.isLost = false;
    }
}