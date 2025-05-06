// stealing and taking right now, that's what good programers do right?
// taking from `https://openprocessing.org/sketch/2213463/#code`
// and also from `https://www.youtube.com/watch?v=VyXxSNcgDtg`
//ill try to comment and explain everything so im learning for real and proving it, or i'll explain what's going on in the `pseudo.md`

let newcolor;

//this. is to call a method within a class (i was confused on that for a while)
class Mold {
    constructor() {
        //starting position of the mold
        this.x = random(width);
        this.y = random(height);
        //radius of the mold
        this.r = 0.5;

        //this is the angle it's headed
        this.direction = random(360);
        //these are for converting from polar to cartesian coordinates (i dont really get this part)
        this.vx = cos(this.direction);
        this.vy = sin(this.direction);
        //setting the rotating angle, this value will be used after deciding what direction to rotate the slime in
        //can be increased for sharper turns
        this.rotAngle = 45;

        //making a sensor (using a vector which is a class that can hold 2 values)
        this.lSensorPos = createVector(0, 0);
        this.rSensorPos = createVector(0, 0);
        this.cSensorPos = createVector(0, 0);
        this.sensorAngle = 45;
        this.sensorDist = 5;

        newcolor = color(random(0, 255), random(0, 255), random(0, 255)); 
    }

    //this method makes it so that the sensor position is based on the angle and distance of the mold position, not just a constant
    update() {
        //moving the mold
        //resetting the this.v- values because the mold will be moving over time
        this.vx = cos(this.direction);
        this.vy = sin(this.direction);

        //setting position
        //previously just `this.- = this.- + this.v-`
        //`+ width % width prevents this value from being negative, also used in the getSensorPos method down at the bottom of the Mold class
        this.x = (this.x + this.vx + width) % width;
        this.y = (this.y + this.vy + height) % height;

        //see getSensorPos() down at the bottom of the Mold class
        this.getSensorPos(this.lSensorPos, this.direction - this.sensorAngle)
        this.getSensorPos(this.rSensorPos, this.direction + this.sensorAngle)
        this.getSensorPos(this.cSensorPos, this.direction)

        //equation for finding index values (how light or dark each pixel is)
        let index, l, r, c;
        index = 4 * (d * floor(this.lSensorPos.y)) * (d * width) + 4 * (d * floor(this.lSensorPos.x));

        //taking the color value inside the pixel and storing it in l(eft) r(ight) and c(enter)
        l = pixels[index];

        //doing the last two steps 2 more times
        index = 4 * (d * floor(this.rSensorPos.y)) * (d * width) + 4 * (d * floor(this.rSensorPos.x));
        r = pixels[index];
        index = 4 * (d * floor(this.cSensorPos.y)) * (d * width) + 4 * (d * floor(this.cSensorPos.x));
        c = pixels[index];

        //thank you console
        print(r, l, c);

        //conditionals to compare which direction the mold should travel
        // if the center is most, then no value change
        if (c > r && c > l) {
            this.direction += 0;
        }   else if (c < l && c < r) {
            //if the left and right are both less than center then pick a random direction

            //random(1) returns a value between 0 & 0.9999999
            //this function creates a 50% chance that the value will be less than 0.5
            //in other words, a 50% chance to turn right
            if (random(1) < 0.5) {
                this.direction += this.rotAngle;
            }   else {
                // this is not in the tutorial but i think i need to add 'else' to get it to turn left on the other half of values
                this.direction += -this.rotAngle;
            }
        }   else if (l > r) {
            //if the left value is higher, turn left (negative this.rotAngle)
            this.direction += -this.rotAngle;
        }   else if (r > l) {
            //and vice versa
            this.direction += this.rotAngle;
        }
    }

    //this is drawing the molds themselves
    //as a METHOD not a FUNCTION because it's specific to the class
    display() {
        //this is the mold dot (colored white)
        //noStroke() because the stroke is bigger than the size of the mold and it shows up black if the stroke is included
        noStroke();
        fill(newcolor);
        //fill(240, 180, 180);
        ellipse(this.x, this.y, this.r*2, this.r*2);

        //large section of stuff commented out because it was used earlier to check that certain steps were working

        // //drawing a line to show where the mold is heading
        // line(this.x, this.y, this.x + this.r*3*this.vx, this.y + this.r*3*this.vy);

        // //visualizing the sensor, and where it's facing
        // fill(255, 0, 0);
        // ellipse(this.lSensorPos.x, this.lSensorPos.y, this.r*2, this.r*2);

        // //two more copies cause two more sensors
        // ellipse(this.rSensorPos.x, this.rSensorPos.y, this.r*2, this.r*2);
        // ellipse(this.cSensorPos.x, this.cSensorPos.y, this.r*2, this.r*2);
    }

    //getting the sensor position was done under the update() method before (check older versions to see)
    //but this allows us to prevent the issue of sensor values that go beyond the canvas boundaries
    //this also simplifies the code up there and makes the equations simpler and easier to break down, better on the eyes, not just formulas anymore
    getSensorPos(sensor, angle) {
        //this is essentially r*cos(angle) which is how you convert from polar coordnates to cartesian (starting to make more sense)
        //which gets us the sensor and allows its position to be controlled by the two variables of dist and angle
        //the two lines below this are what was copied (and slightly edited) from inside the update() function
        //the edits are including the % which will send the mold from one side of the canvas to the other if it hits the border
        //this happens because the remainder of dividing something larger than width by width will return a value of 1 i think? if we're only working in integers (which we are)
        //adding width to the sensor value beofre % guarantees that the sensor value will never go below 0
        sensor.x = (this.x + this.sensorDist*cos(angle) + width) % width;
        sensor.y = (this.y + this.sensorDist*sin(angle) + height) % height;
    }
}