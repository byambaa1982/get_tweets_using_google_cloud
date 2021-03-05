def get_followers_data(request):
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
  #---- get followers id-----------
  try: 
    followers_ids=api.followers_ids(search_words)
    users = api.lookup_users(followers_ids[0:5])
    for user in users:
      print("{}, {}".format(user.id, user.name))
    followers_data = [[user.id, user.name, user.screen_name, user.created_at, user.location
                ,user.description,user.followers_count,user.friends_count, user.favourites_count, user.statuses_count] for user in users]
    print(search_words)
    return jsonify(followers_data)
  except: 
    print("Sorry we cannot find the usname: {} ".format(search_words))
    followers_data=[["Sorry we cannot find the usname: {} ".format(search_words)]]
    return jsonify(followers_data)

