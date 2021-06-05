import pandas as pd 
import csv

all_articles = []
with open('articles.csv', encoding ="utf8") as f:
    file = csv.reader(f)
    data = list(file)
    all_articles = data[1:]
liked_articles = []
not_liked_articles = []