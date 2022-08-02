export default {
    "scalars": [
        1,
        3,
        4
    ],
    "types": {
        "Mutation": {
            "mello": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
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
            "predictionId": [
                3
            ],
            "prognosticatorId": [
                1
            ],
            "username": [
                1
            ],
            "verdict": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ID": {},
        "Boolean": {},
        "Query": {
            "hello": [
                1
            ],
            "prediction": [
                2,
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