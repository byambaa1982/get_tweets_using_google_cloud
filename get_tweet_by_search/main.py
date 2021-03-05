def get_tweets_csv(request):
  import tweepy
  import os
  from os import getenv
  import pandas as pd
  from datetime import datetime
  from flask import jsonify


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
  #------ Get Search word here---
  request_json = request.get_json() 
  request_args = request.args 
  key_word = "" 

  if request_json and 'key_word' in request_json: 
    key_word = request_json['key_word'] 
  elif request_args and 'key_word' in request_args: 
    key_word = request_args['key_word']
  search_words=key_word
  print(search_words)
  #--------------------------------
  new_search = search_words + " -filter:retweets"
  tweet_link='https://twitter.com/twitter/statuses/'
  tweets = tweepy.Cursor(api.search, 
                              q=new_search,
                              geocode=coordinates,
                              lang="en",
                              until=date_until).items(10)

  users_locs = [[tweet.id_str, tweet.user.screen_name, tweet.text, tweet.created_at, tweet.user.location
                ,tweet.favorite_count,tweet.retweet_count, tweet_link+str(tweet.id_str)] for tweet in tweets]
  data = users_locs

  print('A total of {} new tweets'.format(len(data)))

  return jsonify(data)