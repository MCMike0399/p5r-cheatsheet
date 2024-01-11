import requests
from bs4 import BeautifulSoup
import json

# URL de la página que contiene la guía de negociación
url = 'https://joyceychen.com/persona5-negotiation/royal'

# Realizar la solicitud HTTP para obtener el contenido de la página
response = requests.get(url)

# Analizar el contenido HTML con Beautiful Soup
soup = BeautifulSoup(response.text, 'html.parser')

# Encontrar todas las tablas que contienen las guías de negociación
tables = soup.find_all('table', class_='table-responsive-sm')

# Inicializar una lista para almacenar los datos
data = []

print("Iniciando Web Scrapping de Negotiation...")
# Iterar sobre cada tabla y extraer la información
for table in tables:
    # Crear un diccionario para almacenar la información de cada tabla
    table_data = {
        'question': '',
        'answers': []
    }
    # Obtener la pregunta de la cabecera de la tabla
    question = table.find('th').text.strip()
    table_data['question'] = question
    
    # Obtener las respuestas y los resultados
    rows = table.find_all('tr')[2:]  # Las primeras dos filas contienen la pregunta y los encabezados
    for row in rows:
        # Inicializar un diccionario para los resultados de la respuesta
        answer_data = {
            'answer': '',
            'gloomy': '',
            'irritable': '',
            'timid': '',
            'upbeat': ''
        }
        # Obtener la respuesta
        answer_data['answer'] = row.find('td').text.strip()
        # Obtener los resultados para cada personalidad
        results = row.find_all('td', class_='result')
        answer_data['gloomy'] = results[0].text.strip()
        answer_data['irritable'] = results[1].text.strip()
        answer_data['timid'] = results[2].text.strip()
        answer_data['upbeat'] = results[3].text.strip()
        
        # Añadir los datos de la respuesta al diccionario de la tabla
        table_data['answers'].append(answer_data)
    
    # Añadir el diccionario de la tabla a la lista de datos
    data.append(table_data)

# Convertir la lista de datos a JSON
json_data = json.dumps(data, ensure_ascii=False, indent=2)

# Escribir el JSON en un archivo
with open('data.json', 'w', encoding='utf-8') as file:
    file.write(json_data)
    print("JSON creado correctamente :)")

