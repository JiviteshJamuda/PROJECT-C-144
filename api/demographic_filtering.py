import pandas as pd
import numpy as np 

df = pd.read_csv('lang_filtered_article.csv') 

q_articles = df.sort_values(['total_events'], ascending=False)
output = q_articles[['url','title', 'text', 'lang', 'total_events']].head(20).values.tolist()
# print(output)