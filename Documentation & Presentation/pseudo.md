#What the fuck how do I do this
###list of steps
1. get audio input from a stereo microphone
2. convert sample rate to lower processing load (probably skip this honestly)
3. make a shape
4. map audio amplitude of one input to x coordinates
5. map the other input to y coordinates
6. style time
7. variable frequency bands mapped to different points on the color wheel
8. mouse interactive displacement
9. affecting the shape that is oscillating (including bloom type effects)
10. trail (do i need a feedback loop for this?)

###uhhhh i think im looking in the right places for this information
looking at `p5.sound` to start? just focusing on getting audio input from at least the mic on my laptop. if i can get mono then i can get stereo (at least i hope so)

particularly `p5.AudioIn` is seeming like a good starting place

okay update: did not get a ton of help from `p5.AudioIn` but i am now using this website `https://medium.spatialpixel.com/sounds-bd05429aba38` and it's expaining the first parts of getting audio into the browser pretty well

###proof of concept
okay so i think the goal now is just to make something that reacts to audio that's generated from oscillators, not brought in through a mic input

i'll use `https://www.ryojiikeda.com/project/cyclo/` as a conceptual reference. Berklee has the first volume of the book that's associated with this work and i've checked it out a couple times to get a sense of some basic oscilloscope art, and I think the simple examples in the book will be a good starting place, simple frequency ratios and simple shapes

the way that cyclo.id stuff works is just like regular lissajous stuff. left channel controls x axis, right channel controls y. something sits in the middle and serves as a way of visualizing both amplitudes and checking phase differences

this is the main concept i use when i do visual sets through touchdesigner, it's an easy way to make the set related to the music that's playing, i just bring a stereo mic and have the visuals reacting directly

i figure i should work with a concept i'm already used to if i'm gonna figure this shit out before the deadline. im already struggling with the p5.js stuff enough, i dont need any other conceptual challenges or room for error

###new list of steps
1. set up 2 oscillators that can represent the simple relationships presented in the cyclo.id book (making something familiar in an unfamiliar environment)
2. get a circle or something to sit in the middle of the screen and react to the amplitude  like a lissajous visualization
3. THEN figure out how to get a stereo input to interact with the webpage (OR a workaround i use when im not able to get a stereo image for live sets is just having 1 copy of the mono track in each ear and delaying one of them, and having the amount of delay attached to random noise or a slow LFO, so they're always a little out of phase and you can see some cool phase relationships)
4. effects? styling? i'm gonna worry about this part later. i like the ideas i had above about simple effects im familiar with but if it doesn't function at all then who cares if it's got pretty colors

###check in
i have the oscillators going and changing frequencies according to one of the specifications in the Ikeda book, and i have a circle in the middle of the canvas, but im now realizing that ill need to convert the phase of the sine wave to a pixel value i think, or at least a fraction value, i'll deal with it next time

#Big check in
#i have no fucking idea what i'm doing

i'm now realizing that analyzing the phase of the oscillator, like generating the sample rate and getting those constant readings of the phase of the sound is something i have no idea how to do

like maybe im not using the right terminology to try to figure this out but i can only find functions in the p5 documentation that let you declare what the phase of an oscillator should be, not reading it the other way around

maybe i'm just missing something but franky im tired and just want to do something else

#new plan
i think my best move is to dumb it down a lot and rely on some code that someone else wrote that i know is out there

some of the fun tip of the iceberg shit for generative art is:
1. pysarum or slime mold algorhythms
2. curl noise
3. strange attractors / anything else that has to do with chaos theory
4. fractals

I've tried out some ideas with each of these in touchdesigner but never got much out of it because that 3d processing is pretty intense if youre mainly relying on the GUI. plus the concepts are really well researched and experimented with so there's not much room for improvement, just personal taste and stying

however, i think my best option might be to just make something that switches between these *relatively* simple algorythms. not that theyre simple to generate on your own, but i know there are resources out there to execute all of these with p5

the like "creative work" that comes after would be styling and getting these things to blend together or like bleed into each other in some way

but my main concern is just getting these things on a webpage and making some kind of functionality to switch between them. getting them to be minorly audio rective or just styled well is like a best case scenario right now

***looking back on this i probably just should have had some python shit in a touchdesigner patch for this final project, cause that would have been really useful to me after this class and i wouldn't be diving head first into something ive never really used before, but whatever, im in too deep now, and i dont know shit about python***

#mold first
i think the mold will be the most fun to do and i feel like i can imagine this one having simple little audio reactive qualities, like the speed of mold movement or color/brightness of the partiles

this is also forcing me to look up what a bunch of shit means *yes i am following a youtube tutorial but im checking the documentation and pausing and looking something up like every five seconds so honestly i feel like this is chill and i hope you agree*

okay now i've done the first part and gotten a little ellipse mold thing with sensors in front of it to show where it's looking, now for how the mold makes its decisions... im gonna be taking notes here, for reference and for proof of understanding

when dealing with pixel density we have to account for the computer itself

to find a number of pixels you'd have to multiply 4 * d * width * d * height 
where 4 = rgba, d = pixel density(depends on the coputer)

if we want to figure out where a pixel is we have to view it as a one dimentional array (index value), not the 2 dimentional xy coordinate system,, index = y * width + x in theory

in practice we would need to get the pixel density `pixelDensity()` and multiply that by all of the values, and multiply the x and y values by 4 to account for rgba values, essentially we skip every 4 values

#fuck me goddamn it
###bug time
i followed everything and it was working up until a certain point but then i hit a certain step and it's not working any more

i started having issues when i put `noStroke()` in, and that was also right around when the thing started looking how it's supposed to

i haven't noticed it freezing before but after that step now it freezes after a certain amount of time, depending on the slimes

if there are like 5 then it goes for a couple seconds and then freezes, but if there's 10 it freezes really quickly, and if there's a lot (like a couple thousand) you can't even see anything happening, which makes me think it's freezing right away instead of not working at all

very confused, im gonna try going back to where i was in the tutorial and checking out what exactly happened at that step but like, im honestly not sure how to go about fixing this one if that doesn't work

###update
okay uh

this shit is not working but i think its stopping right when one of the molds senses another mold? like right before a mold comes into contact with the trail of another, it freaks the fuck out

###okay got it, im chill now
i called my friends dad who was an early html developer and he just got me to look at the console (which i hadn't done and wasnt sure how to do in the setup im using)

things are moving and not freezing but now they wont change angle based on the different values of the pixels in front of them?

im not sure if it's because the pixel values arent being processed or because my `if()` statement in the `update()` function has an issue in it

i went back to a previous step of making sure the pixel values are being processed by calling `print(l, r, c)` and refreshing the page with only 2 molds until they cross paths

i tried it with 4000 and it was really really hard to tell what was going on - especially because once one of the molds leaves the canvas it starts displaying `undefined` values instead of 0

but i was able to see one crossing through the other's trail and getting values in each of the three positions (l, r, c) so maybe it's something to do with the `if()` statement? time to investigate

Found! i was using variable called "direction" but the tutorial was using a variable called "heading" for the same purpose, i must have spaced out and forgotten to switch when i was first writing this

cool! theyre spawning in and following each other, now for last steps like creating the bounds of the canvas, and fine tuning

okay done with the tutorial part, there was a % function that was a little confusing at first but i think i get it now, interesting that having something by % by something 1 larger than itself will (in practice if you're using integers) basically reset your counter to 1 (if youre using ++ on a value or it's just increasing in general)

now to fine tune and to see if i can add some control

i think i remember you saying at the beginning of the semester to never ever use a youtube tutorial but honestly i think this did really help me, it was interesting to see someone's workflow

taking a multi-step process like this from start to finish took some setting up and testing specific elements before going back and making things more specific and eventually streamlining to solve issues, seeing that process happen 

gonna start collecting a list of the things i can let the user change on the fly, in case i make it there
1. sensor distance (how big the mold forms end up becoming)
2. speed of mold movement? (not sure how to do that yet)
3. rgb?

okay trying to make sliders now for sensor distance and then rgb, im like, not sure how to do it? having two .js files is throwing me for a loop, im not sure which one to put it in because like, maybe i should set it up in the `setup()` and `draw()` functions of sketch.js, but then like how do i call the variables in physarum.js?

this is something i can google probably

im unfortunately finding out this is not something i can just google

having a functional slider and having it go from one .js file to another is really fucking me up honestly

###little crisis over
im working on this a little too late to be trying to tackle entirely new stuff to me, this is due tomorrow and i just need to show up with something, unfortunately it will be this

i wanted to make it at least a little bit interactive so i made the molds change to a random color every time you load the page up

BUT even that took me a while to figure out

i tried to have the variable `newcolor` somewhere inside the class itself, first in the method `display()` but that didn't work, it seemed to change the color of every mold like all the time, it was intense to look at 

i figured that having it below the `update()` method is what was causing that, so i tried putting it up above in the `constructor` method

still didn't work, sometimes variations of what i was trying would produce the same result as before, sometimes i would just get a white screen

THEN i finally started putting the variable outside of the class, which still didn't work most of the time... im still getting used to what you declare when and where and what needs to be inside of a function or class and what doesn't

but basically i started with having all of the info for the `newcolor` variable outside of the `Mold` class and every time i tried that it went whitescreen (the result that i was running on the local server). i eventually moved enough elements of it(everything) into the right place in the class (specifying what color it was before the `update` method so it only happens once per refresh, then referencing the variable in the argument of `fill()` which happens to be in the function `display()` which happens to come after update).

i still dont fully get why the `newcolor = color(random(0, 255), random(0, 255), random(0, 255));` that exists in the `constructor()` needs to be inside of the class itself, but i think i'll just have to figure that out later

there's at least some kind of interaction you can have with it, and its fun to look at, my job is done. its time to make this presentation and go to sleep