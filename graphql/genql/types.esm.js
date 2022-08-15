export default {
    "scalars": [
        1,
        2,
        3,
        8
    ],
    "types": {
        "Judge": {
            "avatar": [
                1
            ],
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
            "rate": [
                7,
                {
                    "like": [
                        3,
                        "Boolean!"
                    ],
                    "predictionId": [
                        1,
                        "String!"
                    ]
                }
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
        },
        "Rating": {
            "dislikes": [
                8
            ],
            "likes": [
                8
            ],
            "__typename": [
                1
            ]
        },
        "Int": {}
    }
}