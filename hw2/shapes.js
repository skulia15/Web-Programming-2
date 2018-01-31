/**
 * Define the shapes
 */


// Shape 
function Shape(position) {
    this.position = position;
    drawio.undoneShapes = [];
}

Shape.prototype.render = function (color, lineWidth) {};

Shape.prototype.move = function (shape, offset) {
    console.log('move');
    console.log(shape.position);
    console.log('offset');
    console.log(offset);
    

    //console.log(shape);
    //console.log(pos);


    shape.position.x = offset.x;
    shape.position.y = offset.y;
    // console.log(shape.position.x);
    // console.log(shape.position.y);
};

Shape.prototype.resize = function () { };

/*
 Rectangle
*/
function Rectangle(position, width, height) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
}

// Assign the prototypes
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function (color, fill, lineWidth) {
    // Render a Rectangle
    // Call render in superclass

    drawio.ctx.fillStyle = color;
    drawio.ctx.lineWidth = lineWidth;
    drawio.ctx.strokeStyle = color;
    drawio.ctx.beginPath();
    if (fill) {
        drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    else{
        drawio.ctx.rect(this.position.x, this.position.y, this.width, this.height);
    }
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Rectangle.prototype.resize = function (x, y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
};

Rectangle.prototype.move = function (shape, offset) {
    //console.log(shape);
    //console.log(pos);
    //console.log(this);
    Object.getPrototypeOf(Rectangle.prototype).move(shape, offset);

};


/*
 Circle
*/
function Circle(position, radius) {
    Shape.call(this, position);
    this.radius = radius;
}

// Assign the prototypes
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function (color, fill, lineWidth) {
    // Render a Rectangle
    drawio.ctx.fillStyle = color;
    drawio.ctx.strokeStyle = color;
    drawio.ctx.lineWidth = lineWidth;

    drawio.ctx.beginPath();
    drawio.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    if (fill) {
        drawio.ctx.fill();
    }
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Circle.prototype.resize = function (radius) {
    if (radius - this.position.x > 0) {
        this.radius = radius - this.position.x;
    }
    else {
        this.radius = -(radius - this.position.x);
    }
};

/*
 Line
*/
function Line(position, start, end) {
    Shape.call(this, position);
    this.start = start;
    this.end = end;
}

// Assign the prototypes
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function (color, fill, lineWidth) {
    drawio.ctx.fillStyle = color;
    drawio.ctx.lineWidth = lineWidth;
    // Render a Line
    drawio.ctx.strokeStyle = color;
    drawio.ctx.beginPath();
    drawio.ctx.moveTo(this.position.x + this.start, this.position.y + this.end);
    drawio.ctx.lineTo(this.position.x, this.position.y, 10);
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Line.prototype.resize = function (x, y) {
    this.start = x - this.position.x;
    this.end = y - this.position.y;
};

/*
 Text
*/
function Text(position, text, font, color) {
    Shape.call(this, position);
    this.text = text;
    this.font = font;
    drawio.ctx.font = font;
    console.log(drawio.ctx.font);
}

// Assign the prototypes
Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Text.prototype.render = function (color, lineWidth) {
    if(this.text.length){
        drawio.ctx.fillStyle = color;
        drawio.ctx.strokeStyle = color;
        drawio.ctx.lineWidth = lineWidth;
        // Render Text
        drawio.ctx.beginPath();
        drawio.ctx.font = this.font;
        
            if(fill){
                drawio.ctx.fillText(this.text, this.position.x, this.position.y);
            }
            else{
                drawio.ctx.strokeText(this.text, this.position.x, this.position.y);
            }
            drawio.ctx.closePath();
        }
        //console.log(drawio.shapes);
        //console.log(this.text.text);
        
};

Text.prototype.resize = function (x, y) {
    this.start = x - this.position.x;
    this.end = y - this.position.y;
};

/*
 Pen
*/
function Pen(position) {
    Shape.call(this, position);
}

// Assign the prototypes
Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;

Pen.prototype.render = function () {
    // Render a Rectangle
    drawio.ctx.beginPath();
    drawio.ctx.lineTo(this.position.x, this.position.y);
    drawio.ctx.stroke();
};

Pen.prototype.resize = function (radius) {
    drawio.ctx.lineTo(this.position.x, this.position.y);
};