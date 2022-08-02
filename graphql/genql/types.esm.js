export default {
    "scalars": [
        1,
        2,
        3
    ],
    "types": {
        "Judge": {
            "judgeId": [
                1
            ],
            "predictionId": [
                2
            ],
            "verdict": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "String": {},
        "Boolean": {},
        "Mutation": {
            "mello": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Prediction": {
            "avatar": [
                2
            ],
            "conditions": [
                2
            ],
            "created_at": [
                2
            ],
            "discriminator": [
                2
            ],
            "judges": [
                0
            ],
            "predictionId": [
                1
            ],
            "prognosticatorId": [
                2
            ],
            "username": [
                2
            ],
            "verdict": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "Query": {
            "hello": [
                2
            ],
            "prediction": [
                5,
                {
                    "predictionId": [
                        2,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        }
    }
}