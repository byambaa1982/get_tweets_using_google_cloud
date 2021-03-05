import tweepy
import os
from os import getenv
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

def get_follower_ids(target):
    return api.followers_ids(target)

def get_user_objects(target):
  follower_ids=get_follower_ids(target)
  users = api.lookup_users(follower_ids)
  followers_data = [user.screen_name for user in users]
  return followers_data

def get_tweets_by_user(request):
  import tweepy
  import os
  from os import getenv
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
  #------ Get Search word here---
  request_json = request.get_json() 
  request_args = request.args
  target="" 
  keyword = "" 

  if request_json and 'target' and 'keyword' in request_json: 
    target=request_json['target']
    keyword = request_json['keyword']
  elif request_args and 'target' and 'keyword' in request_args: 
    target=request_args['target']
    keyword = request_args['keyword']
  print("{} and {}".format(target,keyword))
  #--------------------------------
  try:
    users_list=get_user_objects(target)
    print("{}".format(len(users_list)))
    data=[]
    for myuser in users_list:
      try:
        tweets=tweepy.Cursor(api.user_timeline, id=myuser, tweet_mode='extended').items()
        data+=[[tweet.full_text, tweet.created_at, tweet.id_str, tweet.user.screen_name, tweet.coordinates, tweet.retweet_count, tweet.favorite_count] 
                      for tweet in tweets if keyword in tweet.full_text]
      except:
        data+=["No tweets found"]

    print('A total of {} new tweets'.format(len(data)))

    return jsonify(data)
  except:
    data=[]
    for myuser in ["OlympusLifeSci"]:
      try:
        tweets=tweepy.Cursor(api.user_timeline, id=myuser, tweet_mode='extended').items()
        data+=[[tweet.full_text, tweet.created_at, tweet.id_str, tweet.user.screen_name, tweet.coordinates, tweet.retweet_count, tweet.favorite_count] 
                      for tweet in tweets if keyword in tweet.full_text]
      except:
        data+=["No tweets found"]

    print('A total of {} new tweets'.format(len(data)))

    return jsonify(data)

