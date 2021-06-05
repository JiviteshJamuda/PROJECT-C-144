from flask import Flask, jsonify, request
import csv
import pandas as pd
from demographic_filtering import output
from content_filtering import get_recommendation, cosine_sim
from storage import all_articles, liked_articles, not_liked_articles

app = Flask(__name__)

@app.route('/get-article')
def get_article():
    article_data = {
        'url'   : all_articles[0][11],
        'title' : all_articles[0][12],
        'text'  : all_articles[0][13],
        'lang'  : all_articles[0][14],
        'total_events' : all_articles[0][15]
    }
    return jsonify({
        'data'   : article_data,
        'status' : 'success'
    }),200

@app.route('/liked-article', methods = ['POST'])
def liked_article():
    article = all_articles[0]
    liked_articles.append(article)
    all_articles.pop(0)
    return jsonify({
        'status' : 'success',
    }),200

@app.route('/not-liked-article', methods = ['POST'])
def not_liked_article():
    article = all_articles[0]
    not_liked_articles.append(article)
    all_articles.pop(0)
    return jsonify({
        'status' : 'success',
    }),200

@app.route('/popular-article')

def popular_article():
    article_data = []
    for article in output:
        d = {
            # 'id'        : article[0],
            # 'index'     : article[1],
            # 'timestamp' : article[2],
            # 'content_id': article[4],
            'url'       : article[0],
            'title'     : article[1],
            'text'      : article[2],
            'lang'      : article[3],
            'total_events' : article[4]
        }
        article_data.append(d)
    return jsonify({
        'data' : article_data,
        'status' : 'success'
    }),200

@app.route('/recommended-article')

def recommended_article():
    all_recommended = []
    for liked_article in liked_articles:
        output = get_recommendation(liked_article[4])

        for data in output:
            all_recommended.append(data)
    
    import itertools
    all_recommended.sort()
    all_recommended = list(all_recommended for all_recommended, _ in itertools.groupby(all_recommended))

    article_data = []
    for data in all_recommended:
        d = {
            'url'       : data[0],
            'title'     : data[1],
            'text'      : data[2],
            'lang'      : data[3],
            'total_events' : data[4]
        }
        article_data.append(d)

    return jsonify({
        'data'   : article_data,
        'status' : 'success'
    }),200

if __name__ == '__main__':
    app.run()