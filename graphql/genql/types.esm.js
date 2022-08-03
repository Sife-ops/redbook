export default {
    "scalars": [
        1,
        2,
        3,
        6
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
            "rate": [
                8,
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
            "dislikes": [
                6
            ],
            "judges": [
                0
            ],
            "likes": [
                6
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
        "Int": {},
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
                6
            ],
            "likes": [
                6
            ],
            "__typename": [
                1
            ]
        }
    }
}