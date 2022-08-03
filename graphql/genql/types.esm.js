export default {
    "scalars": [
        1,
        2,
        3
    ],
    "types": {
        "Judge": {
            "discriminator": [
                1
            ],
            "judgeId": [
                2
            ],
            "predictionId": [
                1
            ],
            "username": [
                1
            ],
            "verdict": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "ID": {},
        "Boolean": {},
        "Mutation": {
            "mello": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Prediction": {
            "avatar": [
                1
            ],
            "conditions": [
                1
            ],
            "created_at": [
                1
            ],
            "discriminator": [
                1
            ],
            "judges": [
                0
            ],
            "predictionId": [
                2
            ],
            "prognosticatorId": [
                1
            ],
            "username": [
                1
            ],
            "verdict": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "hello": [
                1
            ],
            "prediction": [
                5,
                {
                    "predictionId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        }
    }
}