def get_tweets_csv(request):
  import tweepy
  import os
  import random
  from os import getenv
  import pandas as pd
  from io import StringIO
  from datetime import datetime
  from google.cloud import storage
  os.environ["GCLOUD_PROJECT"] = "twittersheet-275317"
  project_id='twittersheet-275317'
  destination_bucket='getting-termites-tweet'

  # Getting the key and secret codes from my environment variables
  consumer_key = getenv("CONSUMER_KEY")
  consumer_secret = getenv("CONSUMER_SECRET")
  access_token = getenv("ACCESS_TOKEN")
  access_secret = getenv("ACCESS_SECRET")

  # Tweepy's process for setting up authorisation
  auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
  auth.set_access_token(access_token, access_secret)
  api = tweepy.API(auth)

  date_until=datetime.today().strftime('%Y-%m-%d')
  coordinates='37.0902,-95.7129,1400mi'
  search_words='termite' or 'termites'
  new_search = search_words + " -filter:retweets"

  tweets = tweepy.Cursor(api.search, 
                              q=new_search,
                              geocode=coordinates,
                              lang="en",
                              until=date_until).items(1000)

  users_locs = [[tweet.id_str, tweet.user.screen_name, tweet.text, tweet.created_at, tweet.user.location
                ,tweet.favorite_count,tweet.retweet_count] for tweet in tweets]
  users_locs

  tweet_text = pd.DataFrame(data=users_locs, 
                      columns=["id", "user", "tweets","date","location","favorites","retweets"])
  print('A total of {} new tweets'.format(tweet_text.shape[0]))
  df=tweet_text.copy()
  url='https://twitter.com/twitter/statuses/'
  df['urls']=df.id.map(lambda x:url+str(x))
  try:                    
    filename=('termites{}.csv'.format(date_until))
    f = StringIO()
    df.to_csv(f, index=False)
    f.seek(0)
    client=storage.Client()
    bucket=client.get_bucket('getting-termites-tweet')
    newblob=bucket.blob(filename)
    newblob.upload_from_string(f.read(), content_type='text/csv')
    print('uploaded storage')
  except:
    print(tweet_text.shape)
  return "Done, check storage"



