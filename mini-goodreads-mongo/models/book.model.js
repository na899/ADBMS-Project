const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        authors: [
            {
                type: String,
                required: true,
            }
        ],
        rating: {
            type: Number,
            default: 0
        },
        coverPhoto: {
            type: String,
            default:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkQeaUoawZR3nca9VClt8XQO38BxMqdRVOsfgzjYaLgzbJxjh"
        },
        description: {
            type: String,
            required: true
        },
        publishDate: {
            type: String,
            required: true
        },
        publisher: {
            type: String
        },
        genres: [
            {
                type: String
            }
        ],
        reviews: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Review"
            }
        ],
        pages: {
            type: Number,
            required: true
        },
        isbn: {
            type: String,
            required: true
          }
    }
)

module.exports = mongoose.model('Book', bookSchema);
    