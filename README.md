### Tweet Retrieval API
This API allows you to retrieve tweets based on a keyword and location. The API is built using Flask and tweepy library for accessing the Twitter API.

### Prerequisites
You need to have a Twitter Developer Account and a created Twitter App.
You need to have the following environment variables set in your environment:

```python
CONSUMER_KEY: Consumer Key (API Key) from your Twitter App.
CONSUMER_SECRET: Consumer Secret (API Secret) from your Twitter App.
ACCESS_TOKEN: Access Token from your Twitter App.
ACCESS_SECRET: Access Token Secret from your Twitter App.
```

### Functionality
The API has a single endpoint /get_tweets which takes in a key_word either in the request body as JSON or in the query parameters and returns a JSON array of up to 10 tweets matching the given keyword and location.

The location is hardcoded to 37.0902,-95.7129,1400mi which is the center of the United States and the radius of 1400 miles. The language of the tweets is restricted to English.

Each tweet returned has the following information:

id_str: The unique identifier of the tweet.
screen_name: The username of the person who posted the tweet.
text: The text of the tweet.
created_at: The date and time the tweet was posted.
location: The location of the person who posted the tweet.
favorite_count: The number of times the tweet was liked.
retweet_count: The number of times the tweet was retweeted.
tweet_link: A link to the tweet on Twitter's website.
Example usage
Request Body
bash
Copy code
POST /get_tweets
Content-Type: application/json

{
    "key_word": "example"
}
Query Parameter
bash
Copy code
GET /get_tweets?key_word=example
Response
```python
Copy code
HTTP 200 OK
Content-Type: application/json

[
    [
        "1386139416596843520",
        "example_user",
        "This is an example tweet",
        "2022-10-11 10:10:10",
        "Example Location",
        0,
        0,
        "https://twitter.com/twitter/statuses/1386139416596843520"
    ],
    ...
]
```

### Deployment
This API can be deployed on any platform that supports Flask applications. Some popular options are:

- Heroku
- Google Cloud Platform (App Engine)
- Amazon Web Services (Lambda, EC2)

Appscript code for a Google Sheets included in here is integrated with a Google Cloud Function. The code has several functions that allow you to interact with the Google Cloud Function and retrieve data from it.

clearSheet(): This function clears the contents of a sheet with a specific name. It takes the name of the sheet, the column number, and the starting row as input.

seatch_word(): This function retrieves tweets based on a keyword. It takes the keyword from a cell in a sheet and sends it to the Google Cloud Function in a POST request. The response from the function is returned as a JSON object.

get_followers_data(): This function retrieves the followers of a Twitter user. It takes the username and a keyword as input and sends it to the Google Cloud Function in a POST request. The response from the function is returned as a JSON object.

get_tweets_data(): This function retrieves tweets from a list of Twitter users. It takes the list of usernames and a keyword as input and sends it to the Google Cloud Function in a POST request. The response from the function is returned as a JSON object.

Print(), Print2(), and Print3(): These functions take the response from the functions seatch_word(), get_followers_data(), and get_tweets_data(), respectively, and print the data in a specific sheet in the Google Sheet.

deleteBlankRows(): This function deletes all the empty rows in all the sheets of the Google Sheet.

onOpen(): This function creates a custom menu in the Google Sheet with options to run the functions Print(), Print2(), Print3(), clearSheet(), and removeEmptyRows().

Note: The URLs in the code are specific to the Google Cloud Function and need to be updated if the function's URL changes.
### Conclusion
This API provides a simple and straightforward way to retrieve tweets based on a keyword and location. With just a few modifications, it can be customized to your specific requirements.
