import requests
from bs4 import BeautifulSoup

target_url = 'https://www.google.com/search?q=english&hl=en&lr=lang_en'
r = requests.get(target_url)
soup = BeautifulSoup(r.content, 'html.parser')



titles = [i.string for i in soup.select('.vvjwJb')]
urls = [''.join(i.string.split(' ')).replace('›', '/') for i in soup.select('.UPmit')]


print(titles)
print(urls)