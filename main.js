const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width*0.9);
const N = 500;
const cars = generateCars(N);
let bestCar = cars[0];

// if(localStorage.getItem("bestBrain")) {
    for(let i=0; i<cars.length; i++) {
        cars[i].brain = {
            "levels": [
                {
                    "inputs": [
                        0.44644346805085633,
                        0,
                        0,
                        0,
                        0
                    ],
                    "outputs": [
                        0,
                        1,
                        1,
                        0,
                        0,
                        0
                    ],
                    "biases": [
                        0.6374787124591221,
                        -0.176434173149993,
                        -0.32290078853454895,
                        0.5641806050797857,
                        -0.08590819350313561,
                        0.3154893120165321
                    ],
                    "weights": [
                        [
                            -0.18743758212781678,
                            0.3116017506963768,
                            -0.1778681457383432,
                            0.30497610440946926,
                            -0.21381180787586548,
                            -0.17116976471404238
                        ],
                        [
                            -0.17600495461095597,
                            -0.05753657207385848,
                            0.5110805959261482,
                            -0.36287705366517503,
                            0.25440285104945226,
                            -0.20652055864871843
                        ],
                        [
                            0.0780671366885515,
                            -0.3923566644144941,
                            -0.24164224194425574,
                            0.08126458785234374,
                            -0.09605620958195489,
                            -0.010385826747754859
                        ],
                        [
                            -0.4583114334561049,
                            -0.35197502331036323,
                            0.3322511212471567,
                            -0.4620101432138096,
                            -0.6014695829193853,
                            0.41321614236423704
                        ],
                        [
                            0.3757378696842021,
                            -0.3648073450623052,
                            0.17143054221360166,
                            0.16409932317229967,
                            0.03737899716455213,
                            0.19941479923174285
                        ]
                    ]
                },
                {
                    "inputs": [
                        0,
                        1,
                        1,
                        0,
                        0,
                        0
                    ],
                    "outputs": [
                        1,
                        1,
                        1,
                        0
                    ],
                    "biases": [
                        -0.4409693740450886,
                        -0.16668169554310586,
                        0.7326495506681452,
                        0.8791111185408402
                    ],
                    "weights": [
                        [
                            0.25248216497481835,
                            0.272600997734034,
                            0.38764551034158606,
                            0.16602900837385592
                        ],
                        [
                            0.3119777632877032,
                            -0.21133343689136655,
                            0.32610672366762194,
                            0.19524931354583105
                        ],
                        [
                            0.06454752673456003,
                            0.15801914751208784,
                            0.42552088783567577,
                            -0.056963173005188064
                        ],
                        [
                            -0.18709411169050652,
                            0.29085138849904824,
                            -0.22423909864196467,
                            0.04583640752209858
                        ],
                        [
                            -0.3441213730997692,
                            -0.24923254424821573,
                            0.2099443253063219,
                            0.09051267853495533
                        ],
                        [
                            -0.06741501642623123,
                            -0.08845182730426697,
                            -0.09233568016533415,
                            0.15299083151978166
                        ]
                    ]
                }
            ]
        }
        // JSON.parse(
        //     localStorage.getItem("bestBrain"));
        if(i!=0) {
            NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
    }
    
// }

const traffic = [
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2)
];


animate();

function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N) {
    const cars = [];
    for(let i=0; i<=N; i++) {
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){
    for(let i=0; i<traffic.length; i++) {
        traffic[i].update(road.borders,[]);
    }
    for(let i=0; i<cars.length; i++) {
        cars[i].update(road.borders,traffic);
    }

    bestCar = cars.find(c=>c.y==Math.min(...cars.map(c=>c.y)));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);

    for(let i=0; i<traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    };

    carCtx.globalAlpha = 0.2;
    for(let i=0; i<cars.length; i++) {
        cars[i].draw(carCtx, "blue");
    }
    
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue", true);
    carCtx.restore();

    networkCtx.lineDashOffset = -time/50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain)
    requestAnimationFrame(animate);
}