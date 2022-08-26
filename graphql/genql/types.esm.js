export default {
    "scalars": [
        1,
        2,
        3,
        6
    ],
    "types": {
        "Comment": {
            "comment": [
                1
            ],
            "commentId": [
                2
            ],
            "created_at": [
                1
            ],
            "dislikes": [
                3
            ],
            "likes": [
                3
            ],
            "predictionId": [
                2
            ],
            "replyTo": [
                1
            ],
            "user": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "ID": {},
        "Int": {},
        "Judge": {
            "predictionId": [
                1
            ],
            "user": [
                9
            ],
            "verdict": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Mutation": {
            "comment": [
                0,
                {
                    "comment": [
                        1,
                        "String!"
                    ],
                    "predictionId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "rateComment": [
                1,
                {
                    "commentId": [
                        1,
                        "String!"
                    ],
                    "predictionId": [
                        1,
                        "String!"
                    ],
                    "rating": [
                        6,
                        "Boolean!"
                    ]
                }
            ],
            "ratePrediction": [
                1,
                {
                    "predictionId": [
                        1,
                        "String!"
                    ],
                    "rating": [
                        6,
                        "Boolean!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
        "Prediction": {
            "comments": [
                0
            ],
            "conditions": [
                1
            ],
            "created_at": [
                1
            ],
            "dislikes": [
                3
            ],
            "judges": [
                4
            ],
            "likes": [
                3
            ],
            "predictionId": [
                2
            ],
            "user": [
                9
            ],
            "verdict": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "prediction": [
                7,
                {
                    "predictionId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "predictions": [
                7,
                {
                    "userId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "User": {
            "avatar": [
                1
            ],
            "created_at": [
                1
            ],
            "discriminator": [
                1
            ],
            "userId": [
                1
            ],
            "username": [
                1
            ],
            "__typename": [
                1
            ]
        }
    }
}