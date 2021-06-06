import pandas as pd

df = pd.read_csv('articles.csv')
df = df[df['lang'] == 'en']

df.to_csv('lang_filtered_article.csv')