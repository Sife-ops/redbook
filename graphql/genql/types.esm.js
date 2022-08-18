export default {
    "scalars": [
        1,
        2,
        4
    ],
    "types": {
        "Comment": {
            "avatar": [
                1
            ],
            "comment": [
                1
            ],
            "commentId": [
                2
            ],
            "commenterId": [
                1
            ],
            "created_at": [
                1
            ],
            "discriminator": [
                1
            ],
            "predictionId": [
                2
            ],
            "ratings": [
                8
            ],
            "replyTo": [
                1
            ],
            "username": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "ID": {},
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
                4
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
        "Mutation": {
            "mello": [
                1
            ],
            "rate": [
                8,
                {
                    "like": [
                        4,
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
            "comments": [
                0
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
                3
            ],
            "predictionId": [
                2
            ],
            "prognosticatorId": [
                1
            ],
            "ratings": [
                8
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
        "Query": {
            "hello": [
                1
            ],
            "prediction": [
                6,
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
            "avatar": [
                1
            ],
            "commentId": [
                2
            ],
            "criticId": [
                1
            ],
            "discriminator": [
                1
            ],
            "like": [
                4
            ],
            "predictionId": [
                2
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